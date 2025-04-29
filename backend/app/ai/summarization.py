import os
from dotenv import load_dotenv
import groq
from pathlib import Path

# Load environment variables from the correct path
env_path = Path(__file__).parents[2] / '.env'
load_dotenv(env_path)

# Get API key with error handling
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY environment variable is not set. Please check your .env file.")

# Initialize Groq client
client = groq.Groq(api_key=api_key)

async def summarize_threat(threat_json: dict) -> str:
    """
    Generate a comprehensive threat analysis report using Groq's LLM
    """
    try:
        # Create the system and user messages
        system_message = """You are a senior cybersecurity analyst specializing in threat assessment 
        and report generation. Your expertise lies in analyzing cyber threats, identifying attack patterns, 
        and providing actionable recommendations. Generate detailed, technical, yet actionable reports."""

        user_message = f"""Analyze this threat data and generate a comprehensive report:
        {threat_json}
        
        The report must include:
        1. Organization Attack Details - Analyze severity, confidence, and attack vectors
        2. Threat Analysis - Evaluate malware, encryption methods, and C2 infrastructure
        3. Key Findings - List and explain significant indicators of compromise
        4. Resolution Steps - Provide actionable recommendations
        5. Conclusion - Summarize threat severity and urgency level
        
        Format the output in Markdown for better readability.
        Be specific and technical but ensure recommendations are actionable."""

        # Call Groq API
        completion = await client.chat.acreate(
            model="llama2-70b-4096",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=4000
        )

        # Extract and return the generated summary
        return completion.choices[0].message.content

    except Exception as e:
        return f"Error generating summary: {str(e)}" 