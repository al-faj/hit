Student Performance Prediction System - Haldia Institute of Technology

1. Setup backend locally
1.1 Open terminal and run:
python -m venv .venv
source .venv/bin/activate
cd backend
pip install -r requirements.txt
python train.py
uvicorn app.main:app --reload --port 8000

2. Setup frontend locally
cd frontend
npm install
create a file .env.local with:
NEXT_PUBLIC_API_BASE=http://localhost:8000
NEXT_PUBLIC_COLLEGE_NAME=Haldia Institute of Technology
npm run dev

3. Deploy backend to Render
push backend to GitHub
create new Web Service on Render
connect repo and set start command:
uvicorn app.main:app --host 0.0.0.0 --port $PORT
set environment variables as needed

4. Deploy frontend to Vercel
push frontend to GitHub
import project to Vercel
set environment variables in Vercel:
NEXT_PUBLIC_API_BASE=https://your-backend-url
NEXT_PUBLIC_COLLEGE_NAME=Haldia Institute of Technology

5. Use the web UI
open the frontend URL
go to Manual Prediction to enter student data and see risk score
go to Upload CSV to upload dataset and get batch predictions
