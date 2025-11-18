FROM python:3.11-slim

RUN apt-get update && apt-get install -y curl build-essential \
 && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
 && apt-get install -y nodejs

WORKDIR /app
COPY . /app

WORKDIR /app/frontend
RUN npm ci
RUN npm run build

WORKDIR /app/backend
RUN pip install -r requirements.txt
RUN python train.py || true

RUN npm install -g serve

EXPOSE 3000

CMD ["sh", "-c", "uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 & serve -s frontend/.next -l 3000"]
