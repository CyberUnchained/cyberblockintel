import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import styles from './AIChat.module.css';

const AIChat = () => {
  const { selectedThreat, clearThreatChat } = useChatContext();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedThreat) {
      navigate('/');
      return;
    }

    // Initialize chat with a welcome message
    const initialMessage = {
      type: 'system',
      content: `I'm here to help you analyze the threat: "${selectedThreat.title}". What would you like to know about this security incident?`,
      timestamp: new Date().toISOString()
    };

    const threatSummary = {
      type: 'system',
      content: generateThreatSummary(selectedThreat),
      timestamp: new Date().toISOString()
    };

    setMessages([initialMessage, threatSummary]);
  }, [selectedThreat, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateThreatSummary = (threat) => {
    const { expandedData } = threat;
    return `Threat Summary:
• Attack Vector: ${expandedData.attackVector}
• Target Systems: ${expandedData.targetSystems}
• Affected Regions: ${expandedData.affectedRegions}
• Malware Family: ${expandedData.malwareFamily}
• Confidence: ${threat.confidence}%
• Status: ${threat.verified ? 'Verified' : 'Unverified'}

Key Indicators:
${expandedData.indicators.map(indicator => `• ${indicator}`).join('\n')}

You can ask me about specific details, recommendations, or analysis of this threat.`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBack = () => {
    clearThreatChat();
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse = {
        type: 'assistant',
        content: generateAIResponse(inputMessage, selectedThreat),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (query, threat) => {
    // This is a placeholder. Replace with actual AI integration
    const { expandedData } = threat;
    
    if (query.toLowerCase().includes('recommend') || query.toLowerCase().includes('what should')) {
      return `Based on our analysis, here are the key recommendations:\n${expandedData.recommendations.map(rec => `• ${rec}`).join('\n')}`;
    }
    
    if (query.toLowerCase().includes('timeline') || query.toLowerCase().includes('when')) {
      return `This threat was:\n• First seen: ${new Date(expandedData.timeline.firstSeen).toLocaleString()}\n• Last seen: ${new Date(expandedData.timeline.lastSeen).toLocaleString()}\n• Update frequency: ${expandedData.timeline.updateFrequency}`;
    }
    
    return `I understand you're asking about ${query}. This threat is a ${expandedData.attackVector} targeting ${expandedData.targetSystems}. Would you like to know more about specific aspects such as recommendations, timeline, or technical details?`;
  };

  if (!selectedThreat) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={20} />
          <span>Back to Threats</span>
        </button>
        <div className={styles.threatInfo}>
          <AlertTriangle size={20} />
          <h2>{selectedThreat.title}</h2>
        </div>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${styles[message.type]}`}
            >
              <div className={styles.messageContent}>
                {message.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className={styles.timestamp}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`${styles.message} ${styles.system}`}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about this threat..."
            className={styles.input}
          />
          <button type="submit" className={styles.sendButton} disabled={!inputMessage.trim()}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat; 