from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.datbase_routes import router as health_check_router

app = FastAPI()
# CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_check_router, prefix="/api", tags=["Health Check"])
