import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib
import os

os.makedirs('model', exist_ok=True)
df = pd.read_csv('../data/sample_students.csv')
features = ['attendance_percent','avg_marks_last_term','extra_curricular_hours_per_week','behavior_warnings','previous_failures','homework_submission_rate']
for f in features:
    if f not in df.columns:
        df[f] = 0
X = df[features].fillna(0)
if 'final_label' in df.columns:
    y = df['final_label']
else:
    y = (df['avg_marks_last_term']<40).astype(int)
model = LogisticRegression(max_iter=500)
model.fit(X, y)
joblib.dump({'model': model, 'features': features}, 'model/model.joblib')
print('model saved')
