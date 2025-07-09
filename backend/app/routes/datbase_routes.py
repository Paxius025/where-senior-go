from app.services.database_services import get_connection
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/health")
def health_check():
    try:
        conn = get_connection()
        conn.close()
        return {"status": "healthy"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
