import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AIChat.module.css';
import { sendChatMessage } from '../services/aiChatService';

const AIChat = ({ selectedThreat, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const summary = generateThreatSummary();
    setMessages([
      { role: 'assistant', content: 'Hello! I am your AI assistant. I can help you analyze and understand the selected threat. What would you like to know?' },
      { role: 'assistant', content: summary }
    ]);
  }, [selectedThreat]);

  const generateThreatSummary = () => {
    if (!selectedThreat) return '';
    return `Here's a summary of the selected threat:
    
Title: ${selectedThreat.title}
Severity: ${selectedThreat.severity}
Type: ${selectedThreat.type}
Description: ${selectedThreat.description}

What specific aspects would you like to explore?`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(selectedThreat, [...messages, userMessage]);
      
      if (response.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.reply }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Error: ${response.reply}. Please try again or contact support if the issue persists.` 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error processing your request. Please try again.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <ArrowLeft size={24} />
        </button>
        <h2>AI Threat Analysis</h2>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
              >
                {message.content}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${styles.message} ${styles.assistantMessage}`}
              >
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className={styles.input}
            disabled={isTyping}
          />
          <button type="submit" className={styles.sendButton} disabled={isTyping || !inputMessage.trim()}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat; 