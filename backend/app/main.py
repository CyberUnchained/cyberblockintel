from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import threat, ai_chat

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    threat.router,
    prefix=f"{settings.API_V1_STR}/threats",
    tags=["threats"]
)

app.include_router(ai_chat.router, prefix=f"{settings.API_V1_STR}/ai", tags=["ai"])

@app.get("/")
async def root():
    """
    Health check endpoint
    """
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION
    } 