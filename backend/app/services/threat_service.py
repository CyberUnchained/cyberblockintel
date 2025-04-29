import json
from typing import List, Optional
from datetime import datetime
import uuid
from app.schemas.threat import ThreatInput

class ThreatService:
    def __init__(self):
        # In a real application, this would be a database
        self._threats = {}
        self._upload_statuses = {}

    def process_upload(self, content: bytes) -> dict:
        """
        Process an uploaded threat report
        """
        try:
            # Parse the JSON content
            threat_data = json.loads(content)
            
            # Generate a unique ID for the threat if not provided
            if 'id' not in threat_data:
                threat_data['id'] = f'threat-{uuid.uuid4()}'
            
            # Add timestamp if not provided
            if 'timestamp' not in threat_data:
                threat_data['timestamp'] = datetime.utcnow().isoformat()
            
            # Validate the data using the Pydantic model
            threat = ThreatInput(**threat_data)
            
            # Store the threat
            self._threats[threat.id] = threat.dict()
            
            # Create an upload status
            status_id = str(uuid.uuid4())
            self._upload_statuses[status_id] = {
                'id': status_id,
                'threat_id': threat.id,
                'status': 'processed',
                'timestamp': datetime.utcnow().isoformat()
            }
            
            return self._threats[threat.id]
        except json.JSONDecodeError:
            raise ValueError("Invalid JSON format")
        except Exception as e:
            raise Exception(f"Error processing upload: {str(e)}")

    def get_all_threats(self) -> List[dict]:
        """
        Get all threats
        """
        return list(self._threats.values())

    def get_threat_by_id(self, threat_id: str) -> Optional[dict]:
        """
        Get a specific threat by ID
        """
        return self._threats.get(threat_id)

    def get_upload_status(self, report_id: str) -> Optional[dict]:
        """
        Get the status of an uploaded threat report
        """
        return self._upload_statuses.get(report_id) 