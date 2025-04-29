import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import styles from './UploadThreat.module.css';

const UploadThreat = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would upload the file to your backend
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });
      
      setSuccess(true);
      setFile(null);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
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
          Supported formats: JSON, CSV, TXT
        </p>
        
        <form onSubmit={handleUpload} className={styles.form}>
          <div className={styles.fileInput}>
            <label htmlFor="file-upload" className={styles.fileLabel}>
              {file ? file.name : 'Choose a file'}
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className={styles.input}
              accept=".json,.csv,.txt"
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
              <span>File uploaded successfully!</span>
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
      </div>
      
      <div className={styles.infoCard}>
        <h3 className={styles.infoTitle}>About Threat Uploads</h3>
        <p className={styles.infoText}>
          When you upload threat data, our system will:
        </p>
        <ul className={styles.infoList}>
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
