import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedThreat, setSelectedThreat] = useState(null);
  
  const setThreatForChat = (threat, expandedData) => {
    setSelectedThreat({
      ...threat,
      expandedData
    });
  };

  const clearThreatChat = () => {
    setSelectedThreat(null);
  };

  return (
    <ChatContext.Provider value={{ selectedThreat, setThreatForChat, clearThreatChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}; 