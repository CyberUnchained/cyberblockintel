import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, AlertTriangle, CheckCircle, FileJson } from 'lucide-react';
import { uploadThreatReport } from '../services/uploadService';
import styles from './UploadThreat.module.css';

const UploadThreat = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.json')) {
        setError('Please select a JSON file');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      setUploadProgress(0);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 500);

      const response = await uploadThreatReport(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setSuccess(true);
      setFile(null);
      
      // Wait a moment before redirecting to show the success message
      setTimeout(() => {
        navigate('/feed');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to upload file. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <h1 className={styles.title}>Upload Threat Data</h1>
      
      <div className={styles.uploadCard}>
        <div className={styles.uploadIcon}>
          <Upload size={48} />
        </div>
        
        <h2 className={styles.subtitle}>Upload Threat Information</h2>
        <p className={styles.description}>
          Upload threat data files to be analyzed and verified on the blockchain.
          Supported format: JSON
        </p>
        
        <form onSubmit={handleUpload} className={styles.form}>
          <div className={styles.fileInput}>
            <label htmlFor="file-upload" className={styles.fileLabel}>
              {file ? (
                <div className={styles.selectedFile}>
                  <FileJson size={20} />
                  <span>{file.name}</span>
                </div>
              ) : (
                'Choose a JSON file'
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className={styles.input}
              accept=".json"
            />
          </div>
          
          {error && (
            <div className={styles.errorMessage}>
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className={styles.successMessage}>
              <CheckCircle size={16} />
              <span>File uploaded successfully! Redirecting to threat feed...</span>
            </div>
          )}

          {uploading && (
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${uploadProgress}%` }}
              />
              <span className={styles.progressText}>
                {uploadProgress}% - {uploadProgress === 100 ? 'Processing...' : 'Uploading...'}
              </span>
            </div>
          )}
          
          <button 
            type="submit" 
            className={styles.uploadButton}
            disabled={uploading || !file}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {error && error.includes('backend server') && (
          <div className={styles.serverError}>
            <h4>Troubleshooting Steps:</h4>
            <ol>
              <li>Ensure the backend server is running</li>
              <li>Check if the server is running on port 8000</li>
              <li>Try refreshing the page</li>
            </ol>
          </div>
        )}
      </div>
      
      <div className={styles.infoCard}>
        <h3 className={styles.infoTitle}>About Threat Uploads</h3>
        <p className={styles.infoText}>
          When you upload threat data, our system will:
        </p>
        <ul className={styles.infoList}>
          <li>Validate the JSON format</li>
          <li>Analyze the threat information</li>
          <li>Generate a unique hash for verification</li>
          <li>Store the hash on the blockchain</li>
          <li>Make the threat data available in the dashboard</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default UploadThreat;
