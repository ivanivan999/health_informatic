import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import chat

app = FastAPI(title=settings.PROJECT_NAME)

# Configure CORS for Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://*.vercel.app",
        "https://your-domain.com",  # Add your custom domain
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Patient Informatics AI Assistant API"}

@app.get("/api")
def api_root():
    return {"message": "API is running on Vercel!"}

# Export for Vercel
handler = app