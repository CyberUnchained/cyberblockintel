import axios from 'axios';

const GROK_API_KEY = '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';
const GROK_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const grokClient = axios.create({
  baseURL: GROK_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GROK_API_KEY}`
  }
});

export const sendChatMessage = async (threatData, messages) => {
  try {
    console.log('Received threat data:', JSON.stringify(threatData, null, 2));
    console.log('Received messages:', JSON.stringify(messages, null, 2));

    // Safely extract threat data with fallbacks
    const {
      title = 'Unknown Threat',
      type = 'Unknown',
      severity = 'Unknown',
      description = 'No description available',
      confidence = 0,
      verified = false,
      attackVector = 'Unknown',
      targetSystems = 'Not specified',
      affectedRegions = 'Global',
      malwareFamily = 'Unknown',
      encryptionMethod = 'Not specified',
      commandAndControl = [],
      indicators = [],
      recommendations = [],
      timestamp = new Date().toISOString(),
      timeline = {}
    } = threatData || {};

    // Format the threat data as context
    const threatContext = `
Analyzing Cyber Threat:
Title: ${title}
Type: ${type}
Severity: ${severity}
Description: ${description}
Confidence: ${confidence}%
Status: ${verified ? 'Verified' : 'Unverified'}

Technical Details:
- Attack Vector: ${attackVector}
- Target Systems: ${targetSystems}
- Affected Regions: ${affectedRegions}
- Malware Family: ${malwareFamily}
- Encryption Method: ${encryptionMethod}
- Command & Control Servers: ${commandAndControl.length > 0 ? commandAndControl.join(', ') : 'None detected'}

Indicators:
${indicators.length > 0 ? indicators.map(indicator => `- ${indicator}`).join('\n') : '- No indicators available'}

Recommendations:
${recommendations.length > 0 ? recommendations.map(rec => `- ${rec}`).join('\n') : '- No recommendations available'}

Timeline:
- First Seen: ${timeline.firstSeen || timestamp}
- Last Seen: ${timeline.lastSeen || timestamp}
- Update Frequency: ${timeline.updateFrequency || 'As needed'}
`;

    // Prepare messages for Groq API
    const formattedMessages = [
      { 
        role: 'system', 
        content: 'You are a cybersecurity threat analysis AI assistant. Your role is to help analyze and explain cyber threats, provide technical insights, and recommend mitigation strategies. Be precise, technical, and security-focused in your responses.' 
      },
      { role: 'system', content: threatContext },
      ...messages.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    const requestBody = {
      model: 'llama-3.1-8b-instant',
      messages: formattedMessages,
      temperature: 0.3,
      max_tokens: 2000,
      top_p: 1,
      stream: false
    };

    console.log('Sending request to Groq API:', JSON.stringify(requestBody, null, 2));

    const response = await grokClient.post('', requestBody);

    console.log('Received response from Groq API:', JSON.stringify(response.data, null, 2));

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from Groq API');
    }

    return {
      reply: response.data.choices[0].message.content,
      success: true
    };
  } catch (error) {
    console.error('Error in Groq API request:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    
    let errorMessage = 'Failed to get response from AI.';
    if (error.response?.data?.error?.message) {
      errorMessage = error.response.data.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      reply: errorMessage,
      success: false,
      error: error.message
    };
  }
}; 