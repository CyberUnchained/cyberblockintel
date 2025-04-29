import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import styles from './AIChat.module.css';

const AIChat = () => {
  const { currentThreat, sendMessage, chatHistory, isLoading, error } = useChatContext();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>AI Chat Assistant</h1>
        {currentThreat ? (
          <p className={styles.subtitle}>
            Analyzing: {currentThreat.title}
          </p>
        ) : (
          <p className={styles.subtitle}>Select a threat from the feed to start analysis</p>
        )}
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {!currentThreat ? (
            <div className={styles.emptyState}>
              <Bot size={48} />
              <p>Select a threat from the feed to begin analysis</p>
            </div>
          ) : chatHistory.length === 0 ? (
            <div className={styles.emptyState}>
              <Bot size={48} />
              <p>Start a conversation about this threat</p>
            </div>
          ) : (
            <>
              {chatHistory.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.aiMessage}`}
                >
                  <div className={styles.messageIcon}>
                    {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={styles.messageContent}>
                    <p>{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className={styles.loadingIndicator}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <form onSubmit={handleSendMessage} className={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={currentThreat ? "Ask about this threat..." : "Select a threat first"}
            className={styles.input}
            disabled={!currentThreat || isLoading}
          />
          <button 
            type="submit" 
            className={styles.sendButton} 
            disabled={!currentThreat || isLoading || !input.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
