import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Fetch all threats from the backend
 * @returns {Promise<Array>} - Promise resolving to an array of threats
 */
export const fetchThreats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/threats`);
    // Transform the response to include all necessary fields
    return response.data.map(threat => ({
      ...threat,
      attackVector: threat.attackVector || 'Unknown',
      targetSystems: threat.targetSystems || 'Not specified',
      affectedRegions: threat.affectedRegions || 'Global',
      malwareFamily: threat.malwareFamily || 'Unknown',
      encryptionMethod: threat.encryptionMethod || 'Not specified',
      commandAndControl: threat.commandAndControl || [],
      indicators: threat.indicators || [],
      recommendations: threat.recommendations || [],
      timeline: {
        firstSeen: threat.firstSeen || threat.timestamp,
        lastSeen: threat.lastSeen || threat.timestamp,
        updateFrequency: threat.updateFrequency || 'As needed'
      }
    }));
  } catch (error) {
    console.error('Error fetching threats:', error);
    throw new Error('Failed to fetch threats');
  }
};

/**
 * Get a single threat by ID with full details
 * @param {string} threatId - The ID of the threat to fetch
 * @returns {Promise<Object>} - Promise resolving to the threat object
 */
export const getThreatById = async (threatId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/threats/${threatId}`);
    const threat = response.data;
    
    // Ensure all required fields are present
    return {
      ...threat,
      attackVector: threat.attackVector || 'Unknown',
      targetSystems: threat.targetSystems || 'Not specified',
      affectedRegions: threat.affectedRegions || 'Global',
      malwareFamily: threat.malwareFamily || 'Unknown',
      encryptionMethod: threat.encryptionMethod || 'Not specified',
      commandAndControl: threat.commandAndControl || [],
      indicators: threat.indicators || [],
      recommendations: threat.recommendations || [],
      timeline: {
        firstSeen: threat.firstSeen || threat.timestamp,
        lastSeen: threat.lastSeen || threat.timestamp,
        updateFrequency: threat.updateFrequency || 'As needed'
      }
    };
  } catch (error) {
    console.error('Error fetching threat:', error);
    throw new Error('Failed to fetch threat');
  }
}; 