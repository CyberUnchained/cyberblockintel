import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Get a response from the AI assistant
 * @param {string} message - The user's message
 * @returns {Promise<Object>} - Promise resolving to the AI's response
 */
export const getChatResponse = async (message) => {
  try {
    // Simulate AI response
    return await new Promise((resolve) => {
      setTimeout(() => {
        // Generate a contextual response based on the message
        let reply = "I'm analyzing your request...";
        
        if (message.toLowerCase().includes('threat')) {
          reply = "I've detected a potential threat in your system. Based on my analysis, it appears to be a variant of the recent ransomware campaign. I recommend isolating the affected systems and running a full scan.";
        } else if (message.toLowerCase().includes('blockchain')) {
          reply = "The blockchain verification process is currently running at 98% efficiency. All recent threat hashes have been successfully verified and added to the immutable ledger.";
        } else if (message.toLowerCase().includes('help')) {
          reply = "I can help you analyze threat reports, verify blockchain hashes, and provide real-time security recommendations. What would you like to know more about?";
        } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
          reply = "Hello! I'm your AI security assistant. How can I help you today?";
        }
        
        resolve({
          reply,
          timestamp: new Date().toISOString(),
          confidence: Math.floor(Math.random() * 20) + 80 // 80-100%
        });
      }, 1000);
    });
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw new Error('Failed to get AI response');
  }
};

/**
 * Analyze a threat using the backend AI service
 * @param {Object} threatData - The threat data to analyze
 * @returns {Promise<Object>} - Promise resolving to the analysis results
 */
export const analyzeThreat = async (threatData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/threats/analyze`, threatData);
    return response.data;
  } catch (error) {
    console.error('Error analyzing threat:', error);
    throw new Error('Failed to analyze threat');
  }
};
