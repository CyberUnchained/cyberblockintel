import groq
from app.core.config import settings

class ThreatAnalyzer:
    def __init__(self):
        self.client = groq.Groq(api_key=settings.GROQ_API_KEY)

    def analyze_threat(self, threat_json: dict) -> str:
        """
        Generate a comprehensive threat analysis report using Groq's LLM
        """
        try:
            # Create the system and user messages
            system_message = """You are a senior cybersecurity analyst specializing in threat assessment 
            and report generation. Your expertise lies in analyzing cyber threats, identifying attack patterns, 
            and providing actionable recommendations. Generate detailed, technical, yet actionable reports.
            
            Format your response in Markdown with clear sections and bullet points where appropriate."""

            # Create a detailed prompt that includes all the threat information
            threat_details = f"""
            Title: {threat_json['title']}
            Description: {threat_json['description']}
            Severity: {threat_json['severity']}
            Confidence: {threat_json['confidence']}%
            Hash: {threat_json['hash']}
            
            Attack Details:
            - Vector: {threat_json['expandedData']['attackVector']}
            - Target Systems: {threat_json['expandedData']['targetSystems']}
            - Affected Regions: {threat_json['expandedData']['affectedRegions']}
            - Malware Family: {threat_json['expandedData']['malwareFamily']}
            
            Technical Details:
            - Encryption Method: {threat_json['expandedData']['encryptionMethod']}
            - C2 Servers: {', '.join(threat_json['expandedData']['commandAndControl'])}
            
            Indicators:
            {chr(10).join('- ' + indicator for indicator in threat_json['expandedData']['indicators'])}
            
            Current Recommendations:
            {chr(10).join('- ' + rec for rec in threat_json['expandedData']['recommendations'])}
            
            Timeline:
            - First Seen: {threat_json['expandedData']['timeline']['firstSeen']}
            - Last Seen: {threat_json['expandedData']['timeline']['lastSeen']}
            - Update Frequency: {threat_json['expandedData']['timeline']['updateFrequency']}
            """

            user_message = f"""Analyze this threat data and generate a comprehensive report:
            {threat_details}
            
            Please provide a detailed analysis that includes:
            1. Executive Summary - Brief overview of the threat and its potential impact
            2. Technical Analysis
               - Attack vector analysis
               - Malware capabilities and behavior
               - Infrastructure details (C2, encryption)
               - Potential impact on target systems
            3. Threat Actor Assessment
               - Sophistication level
               - Potential attribution
               - Campaign objectives
            4. Enhanced Recommendations
               - Immediate actions
               - Short-term mitigations
               - Long-term security improvements
            5. Future Outlook
               - Potential evolution of the threat
               - Similar threats to watch for
               
            Format the output in Markdown for better readability.
            Be specific and technical but ensure recommendations are actionable."""

            # Call Groq API synchronously
            completion = self.client.chat.completions.create(
                model="llama-3.3-70b-versatile",
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
            return f"Error generating analysis: {str(e)}" 