import axios from 'axios';

/**
 * Upload a threat report to the server
 * @param {File} file - The JSON file containing threat report data
 * @returns {Promise} - Promise resolving to the upload response
 */
export const uploadThreatReport = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // In a real implementation, this would be an actual API endpoint
    // For now, we'll simulate a successful upload
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Threat report uploaded successfully',
          data: {
            id: `threat-${Date.now()}`,
            filename: file.name,
            size: file.size,
            timestamp: new Date().toISOString()
          }
        });
      }, 1500); // Simulate network delay
    });
  } catch (error) {
    console.error('Error uploading threat report:', error);
    throw new Error('Failed to upload threat report');
  }
};

/**
 * Get the status of an uploaded threat report
 * @param {string} reportId - The ID of the uploaded report
 * @returns {Promise} - Promise resolving to the report status
 */
export const getThreatReportStatus = async (reportId) => {
  try {
    // Simulate API call
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: reportId,
          status: 'processed',
          progress: 100,
          timestamp: new Date().toISOString()
        });
      }, 1000);
    });
  } catch (error) {
    console.error('Error getting threat report status:', error);
    throw new Error('Failed to get threat report status');
  }
};
