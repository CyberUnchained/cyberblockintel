import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertTriangle, ArrowLeft, Loader } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import ReactMarkdown from 'react-markdown';
import styles from './Chat.module.css';

const Chat = () => {
  const {
    currentThreat,
    chatHistory,
    isLoading,
    error,
    sendMessage,
    clearChat
  } = useChatContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef(null);
  
  useEffect(() => {
    // Scroll to bottom when chat history updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    await sendMessage(userMessage);
  };

  const handleBack = () => {
    clearChat();
    navigate(-1);
  };

  if (!currentThreat) {
    return (
      <div className={styles.noThreatContainer}>
        <h2>No threat selected</h2>
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={20} />
          Return to Threat Feed
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={20} />
        </button>
        <div className={styles.threatInfo}>
          <h2>{currentThreat.title}</h2>
          <span className={`${styles.severityBadge} ${styles[currentThreat.severity]}`}>
            {currentThreat.severity.toUpperCase()}
          </span>
        </div>
      </div>

      <div className={styles.chatContainer} ref={chatContainerRef}>
        <div className={styles.welcomeMessage}>
          <h3>AI Cybersecurity Expert</h3>
          <p>I'm analyzing the following threat:</p>
          <div className={styles.threatSummary}>
            <p><strong>Title:</strong> {currentThreat.title}</p>
            <p><strong>Severity:</strong> {currentThreat.severity}</p>
            <p><strong>Attack Vector:</strong> {currentThreat.expandedData.attackVector}</p>
            <p><strong>Target Systems:</strong> {currentThreat.expandedData.targetSystems}</p>
          </div>
          <p>You can ask me about:</p>
          <ul>
            <li>Detailed technical analysis and impact assessment</li>
            <li>Specific mitigation strategies and recommendations</li>
            <li>Related threats and attack patterns</li>
            <li>Timeline and progression of the threat</li>
            <li>Indicators of compromise and detection methods</li>
          </ul>
        </div>

        <AnimatePresence mode="popLayout">
          {chatHistory.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.aiMessage}`}
            >
              <div className={styles.messageContent}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.loadingMessage}
            >
              <Loader className={styles.loadingSpinner} />
              <span>AI is analyzing your question...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.errorMessage}
          >
            <AlertTriangle size={20} />
            <span>{error}</span>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about the threat..."
          className={styles.input}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={isLoading || !message.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chat; 