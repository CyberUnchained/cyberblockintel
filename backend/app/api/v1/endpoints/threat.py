from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List
from app.schemas.threat import ThreatInput, ThreatResponse, ThreatList
from app.services.ai.threat_analyzer import ThreatAnalyzer
from app.services.threat_service import ThreatService

router = APIRouter()
analyzer = ThreatAnalyzer()
threat_service = ThreatService()

@router.post("/analyze", response_model=ThreatResponse)
def analyze_threat(input: ThreatInput):
    """
    Analyze a threat and generate a comprehensive report
    """
    try:
        summary = analyzer.analyze_threat(input.dict())
        return ThreatResponse(
            threat_json=input,
            summary=summary
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload")
async def upload_threat(file: UploadFile = File(...)):
    """
    Upload a new threat report
    """
    try:
        content = await file.read()
        threat_data = threat_service.process_upload(content)
        return {"message": "Threat uploaded successfully", "data": threat_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("", response_model=List[ThreatInput])
async def get_threats():
    """
    Get all threats
    """
    try:
        threats = threat_service.get_all_threats()
        return threats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{threat_id}", response_model=ThreatInput)
async def get_threat(threat_id: str):
    """
    Get a specific threat by ID
    """
    try:
        threat = threat_service.get_threat_by_id(threat_id)
        if not threat:
            raise HTTPException(status_code=404, detail="Threat not found")
        return threat
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status/{report_id}")
async def get_upload_status(report_id: str):
    """
    Get the status of an uploaded threat report
    """
    try:
        status = threat_service.get_upload_status(report_id)
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 