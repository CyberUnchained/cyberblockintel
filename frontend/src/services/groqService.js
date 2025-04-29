import axios from 'axios';

const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/v1/chat/completions';

const groqClient = axios.create({
  baseURL: GROQ_API_URL,
  headers: {
    'Authorization': `Bearer ${GROQ_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

const generateSystemPrompt = (threatData) => {
  const expandedData = threatData.expandedData;
  return `You are an AI cybersecurity expert analyzing the following threat:

THREAT DETAILS:
Title: ${threatData.title}
Severity: ${threatData.severity}
Description: ${threatData.description}
Confidence: ${threatData.confidence}%

TECHNICAL DETAILS:
Attack Vector: ${expandedData.attackVector}
Target Systems: ${expandedData.targetSystems}
Affected Regions: ${expandedData.affectedRegions}
Malware Family: ${expandedData.malwareFamily}
Encryption Method: ${expandedData.encryptionMethod}
Command & Control Servers: ${expandedData.commandAndControl.join(', ')}

INDICATORS:
${expandedData.indicators.map(i => '- ' + i).join('\n')}

CURRENT RECOMMENDATIONS:
${expandedData.recommendations.map(r => '- ' + r).join('\n')}

TIMELINE:
First Seen: ${expandedData.timeline.firstSeen}
Last Seen: ${expandedData.timeline.lastSeen}
Update Frequency: ${expandedData.timeline.updateFrequency}

Your role is to act as a cybersecurity expert and threat analyst. Provide detailed, technical responses about this threat.
When answering questions:
1. Be specific and technical in your explanations
2. Reference the actual threat data provided above
3. Provide actionable recommendations when relevant
4. Cite specific indicators and timeline information when applicable
5. Explain technical terms when they're first introduced

Format your responses using markdown for better readability.`;
};

export const chatWithGroq = async (threatData, userMessage, chatHistory = []) => {
  try {
    const messages = [
      {
        role: 'system',
        content: generateSystemPrompt(threatData)
      },
      ...chatHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];

    console.log('Sending request to Groq API...');
    const response = await groqClient.post('', {
      model: 'mixtral-8x7b-32768',
      messages,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 0.9,
      stream: false
    });

    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error('Invalid response format from Groq API');
    }

    return {
      reply: response.data.choices[0].message.content,
      success: true
    };
  } catch (error) {
    console.error('Error in Groq API call:', error);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
    
    return {
      reply: 'An error occurred while processing your request. Please try again or contact support if the issue persists.',
      success: false,
      error: error.message
    };
  }
}; 