from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

class Timeline(BaseModel):
    firstSeen: str
    lastSeen: str
    updateFrequency: str

class ExpandedData(BaseModel):
    attackVector: str
    targetSystems: str
    affectedRegions: str  # Changed from List[str] to str as frontend uses comma-separated string
    malwareFamily: str
    encryptionMethod: str
    commandAndControl: List[str]
    indicators: List[str]
    recommendations: List[str]
    timeline: Timeline

class ThreatInput(BaseModel):
    id: str
    title: str
    description: str
    severity: str
    timestamp: str
    hash: str
    verified: bool
    confidence: int
    expandedData: ExpandedData

class ThreatResponse(BaseModel):
    threat_json: ThreatInput
    summary: str

class ThreatList(BaseModel):
    """
    Schema for a list of threats with pagination metadata
    """
    items: List[ThreatInput]
    total: int
    page: int = 1
    per_page: int = 10
    total_pages: int = 1 