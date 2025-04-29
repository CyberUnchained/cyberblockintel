from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel
import httpx
import json
from ....core.config import settings

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    threat_data: dict

class ChatResponse(BaseModel):
    response: str
    error: Optional[str] = None

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    try:
        # Log the incoming request for debugging
        print("Received chat request with threat data:", json.dumps(request.threat_data, indent=2))
        print("Messages:", json.dumps([msg.dict() for msg in request.messages], indent=2))

        # Prepare the system message with threat context
        system_message = f"""You are an AI cybersecurity expert analyzing the following threat:

THREAT DETAILS:
Title: {request.threat_data.get('title', 'N/A')}
Severity: {request.threat_data.get('severity', 'N/A')}
Description: {request.threat_data.get('description', 'N/A')}
Confidence: {request.threat_data.get('confidence', 'N/A')}

TECHNICAL DETAILS:
Attack Vector: {request.threat_data.get('expandedData', {}).get('attackVector', 'N/A')}
Target Systems: {request.threat_data.get('expandedData', {}).get('targetSystems', 'N/A')}
Affected Regions: {request.threat_data.get('expandedData', {}).get('affectedRegions', 'N/A')}
Malware Family: {request.threat_data.get('expandedData', {}).get('malwareFamily', 'N/A')}

Your role is to act as a cybersecurity expert and provide detailed, technical responses about this threat.
Base your responses on the provided threat data and your cybersecurity expertise.
Format your responses using markdown for better readability.
Always provide specific details from the threat data when answering."""

        # Prepare messages for Groq API
        messages = [
            {"role": "system", "content": system_message},
            *[{"role": msg.role, "content": msg.content} for msg in request.messages]
        ]

        print("Sending request to Groq API...")
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.groq.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "mixtral-8x7b-32768",
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 4096,
                    "top_p": 0.9
                },
                timeout=30.0
            )
            
            print("Groq API Response Status:", response.status_code)
            print("Groq API Response:", response.text)

            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Groq API error: {response.text}"
                )

            result = response.json()
            if not result.get("choices") or not result["choices"][0].get("message"):
                raise HTTPException(
                    status_code=500,
                    detail="Invalid response format from Groq API"
                )

            ai_response = result["choices"][0]["message"]["content"]
            print("AI Response:", ai_response)

            return ChatResponse(
                response=ai_response
            )

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request to AI service timed out")
    except httpx.RequestError as e:
        print("Error communicating with Groq API:", str(e))
        raise HTTPException(status_code=500, detail=f"Error communicating with AI service: {str(e)}")
    except Exception as e:
        print("Unexpected error:", str(e))
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}") 