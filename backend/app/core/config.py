from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "BlockIntelAI"
    VERSION: str = "1.0.0"
    
    # Groq API Configuration
    GROQ_API_KEY: str = "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"
    
    # API Configuration
    BACKEND_URL: str = "http://localhost:8000"
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 