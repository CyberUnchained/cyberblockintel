import React, { createContext, useContext, useState } from 'react';
import { sendChatMessage } from '../services/aiChatService';

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [currentThreat, setCurrentThreat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setThreatForChat = (threat) => {
    console.log('Setting threat for chat:', JSON.stringify(threat, null, 2));
    setCurrentThreat(threat);
    // Initialize chat with a welcome message
    setChatHistory([{
      role: 'assistant',
      content: `I'm analyzing the threat: "${threat.title}". This is a ${threat.severity} severity threat with ${threat.confidence}% confidence. What would you like to know about it?`
    }]);
    setError(null);
  };

  const sendMessage = async (message) => {
    if (!currentThreat) {
      setError('No threat selected for analysis');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Processing message:', message);
      
      // Add user message to chat history
      const userMessage = { role: 'user', content: message };
      setChatHistory(prev => [...prev, userMessage]);

      // Get AI response
      const response = await sendChatMessage(currentThreat, [...chatHistory, userMessage]);

      console.log('Received AI response:', response);

      if (response.success) {
        // Add AI response to chat history
        const aiMessage = { role: 'assistant', content: response.reply };
        setChatHistory(prev => [...prev, aiMessage]);
      } else {
        setError(response.error || 'Failed to get response from AI');
        // Keep the user message in chat history even if we got an error
        const errorMessage = { role: 'assistant', content: `Error: ${response.reply}` };
        setChatHistory(prev => [...prev, errorMessage]);
      }
    } catch (err) {
      console.error('Error in chat processing:', err);
      const errorMessage = `Error: ${err.message || 'Unknown error occurred'}`;
      setError(errorMessage);
      // Add error message to chat history
      setChatHistory(prev => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setError(null);
  };

  const value = {
    currentThreat,
    chatHistory,
    isLoading,
    error,
    setThreatForChat,
    sendMessage,
    clearChat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}; 