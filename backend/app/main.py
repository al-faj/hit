from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import io
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials=True
)

model_path = os.path.join(os.path.dirname(__file__), '..', '..', 'model', 'model.joblib')
if os.path.exists(model_path):
    mm = joblib.load(model_path)
    model = mm['model']
    features = mm['features']
else:
    model = None
    features = []

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.post('/api/predict')
async def predict(payload: dict):
    student = payload.get('student', payload)
    row = {}
    for f in features:
        row[f] = float(student.get(f, 0))
    if model is None:
        att = row.get('attendance_percent',100)
        marks = row.get('avg_marks_last_term',100)
        risk = max(0.0, min(1.0, 1.0 - (0.6*(att/100.0) + 0.4*(marks/100.0))))
    else:
        import numpy as np
        X = [[row[f] for f in features]]
        p = model.predict_proba(X)[0][1]
        risk = float(p)
    label = 'at_risk' if risk>=0.5 else 'safe'
    return {'student_id': student.get('student_id','unknown'), 'risk_score': round(risk,3), 'risk_label': label, 'top_features': []}

@app.post('/api/batch_predict')
async def batch_predict(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    def score_row(r):
        att = r.get('attendance_percent',100)
        marks = r.get('avg_marks_last_term',100)
        return max(0.0, min(1.0, 1.0 - (0.6*(att/100.0) + 0.4*(marks/100.0))))
    df['risk_score'] = df.apply(score_row, axis=1)
    df['risk_label'] = df['risk_score'].apply(lambda x: 'at_risk' if x>=0.5 else 'safe')
    return {'rows': df.to_dict(orient='records')}

