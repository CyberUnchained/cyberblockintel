import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import styles from './ThreatAnalysisModal.module.css';

const ThreatAnalysisModal = ({ isOpen, onClose, analysis, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className={styles.header}>
            <h2>Threat Analysis Report</h2>
            <button onClick={onClose} className={styles.closeButton}>
              <X size={24} />
            </button>
          </div>
          
          <div className={styles.content}>
            {isLoading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Analyzing threat data...</p>
              </div>
            ) : (
              <div className={styles.analysis}>
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.cancelButton} 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              className={styles.confirmButton} 
              onClick={onConfirm}
              disabled={isLoading}
            >
              Confirm & Add to Feed
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThreatAnalysisModal; 