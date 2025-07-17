from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Patient Informatics AI Assistant")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Patient Informatics AI Assistant API", "status": "working"}

@app.get("/api")
def api_root():
    return {"message": "API is running on Vercel!", "status": "success"}

@app.get("/api/test")
def test_endpoint():
    return {"test": "success", "deployed": "vercel", "fastapi": "working"}

# Simple chat endpoint for testing
@app.post("/api/v1/chat/send")
def chat_test(message_data: dict):
    return {
        "message": f"Echo: {message_data.get('message', 'No message')}",
        "status": "success",
        "type": "text"
    }