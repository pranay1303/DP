from fastapi import FastAPI, UploadFile, File, HTTPException
from cnnmodel.cnn import CNNModel
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# -------- Import Gemini AI helper --------
from cnnmodel.gemini import ask_gemini

app = FastAPI(title="Medical Plant API")
mp = CNNModel()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Store the last predicted plant
last_predicted_plant = ""

@app.get("/")
async def home_page():
    return {"message": "Welcome to the Medical Plant API"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    global last_predicted_plant

    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        label, score = mp.predict(file_path)

        last_predicted_plant = label
        
        os.remove(file_path)

        return {
            "label": label,
            "confidence_score": float(score),
            "message": "Prediction successful"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Chatbot Route
class ChatRequest(BaseModel):
    question: str

@app.post("/chat/")
async def chat_with_gemini(chat_request: ChatRequest):
    try:
        if not last_predicted_plant:
            raise HTTPException(status_code=400, detail="No plant has been predicted yet.")
        
        # Call function from gemini.py
        answer = ask_gemini(last_predicted_plant, chat_request.question)

        return {
            "answer": answer
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
