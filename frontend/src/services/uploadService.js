import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Upload a threat report to the server
 * @param {File} file - The JSON file containing threat report data
 * @returns {Promise} - Promise resolving to the upload response
 */
export const uploadThreatReport = async (file) => {
  try {
    // First, validate that it's a JSON file
    if (!file.type.includes('json') && !file.name.endsWith('.json')) {
      throw new Error('Only JSON files are supported');
    }

    // Read the file content to validate JSON format
    const fileContent = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });

    // Validate JSON format
    try {
      JSON.parse(fileContent);
    } catch (e) {
      throw new Error('Invalid JSON format in file');
    }

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/threats/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000, // 10 second timeout
      });
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Cannot connect to server. Please ensure the backend server is running.');
      }
      if (error.response) {
        throw new Error(error.response.data.detail || 'Server error during upload');
      }
      throw new Error('Network error during upload');
    }
  } catch (error) {
    console.error('Error uploading threat report:', error);
    throw error; // Throw the specific error message
  }
};

/**
 * Get the status of an uploaded threat report
 * @param {string} reportId - The ID of the uploaded report
 * @returns {Promise} - Promise resolving to the report status
 */
export const getThreatReportStatus = async (reportId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/threats/status/${reportId}`, {
      timeout: 5000, // 5 second timeout
    });
    return response.data;
  } catch (error) {
    console.error('Error getting threat report status:', error);
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to server. Please ensure the backend server is running.');
    }
    throw new Error('Failed to get threat report status');
  }
};
