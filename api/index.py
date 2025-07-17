import sys
import os

# Add the backend directory to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend')
sys.path.insert(0, backend_path)

try:
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from app.core.config import settings
    from app.routers import chat
except ImportError as e:
    # Fallback for import issues
    print(f"Import error: {e}")
    from fastapi import FastAPI
    app = FastAPI()
    
    @app.get("/")
    def fallback():
        return {"error": "Import failed", "message": str(e)}
    
    # Export app
    def handler(request):
        return app
else:
    app = FastAPI(title="Patient Informatics AI Assistant")

    # Configure CORS for Vercel
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allow all origins for now
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers with proper prefix
    app.include_router(chat.router, prefix="/api/v1")

    @app.get("/")
    def root():
        return {"message": "Patient Informatics AI Assistant API"}

    @app.get("/api")
    def api_root():
        return {"message": "API is running on Vercel!", "status": "success"}

# Vercel handler
app = app