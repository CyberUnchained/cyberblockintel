import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, Clock, Hash, ExternalLink, Volume2, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchThreatHashes, verifyThreatHash } from '@services/blockchainService';
import { useChatContext } from '../context/ChatContext';
import styles from './ThreatFeed.module.css';

// Mock data for threat feed
const mockThreats = [
  {
    id: 'threat-1',
    title: 'Ransomware Attack Detected',
    description: 'A new variant of the WannaCry ransomware has been detected targeting healthcare systems.',
    severity: 'high',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    hash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
    verified: true,
    confidence: 95
  },
  {
    id: 'threat-2',
    title: 'Suspicious Network Activity',
    description: 'Unusual outbound traffic patterns detected from multiple endpoints within the corporate network.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    verified: true,
    confidence: 82
  },
  {
    id: 'threat-3',
    title: 'Zero-Day Vulnerability',
    description: 'A critical zero-day vulnerability has been discovered in the latest version of the web server software.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    hash: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    verified: false,
    confidence: 78
  },
  {
    id: 'threat-4',
    title: 'Phishing Campaign',
    description: 'A sophisticated phishing campaign targeting financial department employees has been identified.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    hash: '0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    verified: true,
    confidence: 88
  },
  {
    id: 'threat-5',
    title: 'Malware Detection',
    description: 'A new strain of malware has been detected attempting to exfiltrate sensitive data.',
    severity: 'high',
    timestamp: new Date(Date.now() - 28800000).toISOString(),
    hash: '0x7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    verified: true,
    confidence: 91
  }
];

// Add mock expanded data
const mockExpandedData = {
  'threat-1': {
    attackVector: 'Email Phishing',
    targetSystems: 'Windows-based healthcare systems',
    affectedRegions: 'North America, Europe',
    malwareFamily: 'WannaCry variant',
    encryptionMethod: 'RSA-2048, AES-256',
    commandAndControl: ['185.234.x.x', '91.123.x.x'],
    indicators: [
      'Suspicious .exe files in System32',
      'Unusual network traffic on port 445',
      'Multiple failed SMB connections'
    ],
    recommendations: [
      'Patch MS17-010 vulnerability',
      'Block SMB ports (139, 445)',
      'Update antivirus signatures',
      'Implement network segmentation'
    ],
    timeline: {
      firstSeen: '2025-04-29T14:23:00Z',
      lastSeen: '2025-04-29T19:49:23Z',
      updateFrequency: '30 minutes'
    }
  },
  'threat-2': {
    attackVector: 'Network Infiltration',
    targetSystems: 'Corporate Network Infrastructure',
    affectedRegions: 'Asia Pacific, North America',
    malwareFamily: 'Custom Backdoor',
    encryptionMethod: 'TLS 1.3 for C2 Communication',
    commandAndControl: ['209.156.x.x', '167.89.x.x'],
    indicators: [
      'Abnormal DNS queries to suspicious domains',
      'Beaconing activity every 300 seconds',
      'Data exfiltration attempts over HTTPS',
      'Modified system registry keys'
    ],
    recommendations: [
      'Implement DNS filtering',
      'Deploy network behavior analytics',
      'Update firewall rules',
      'Enable enhanced logging for critical systems'
    ],
    timeline: {
      firstSeen: '2025-04-29T12:00:00Z',
      lastSeen: '2025-04-29T18:30:00Z',
      updateFrequency: '15 minutes'
    }
  },
  'threat-3': {
    attackVector: 'Zero-Day Exploit',
    targetSystems: 'Apache Web Servers 2.4.x',
    affectedRegions: 'Global',
    malwareFamily: 'Novel Remote Code Execution',
    encryptionMethod: 'None detected',
    commandAndControl: ['45.76.x.x', '194.68.x.x', '23.45.x.x'],
    indicators: [
      'Unusual POST requests to /cgi-bin/',
      'Base64 encoded payloads in requests',
      'Unexpected outbound connections',
      'Creation of unauthorized admin accounts'
    ],
    recommendations: [
      'Apply emergency patch immediately',
      'Review all admin accounts',
      'Monitor for suspicious POST requests',
      'Implement WAF rules',
      'Consider temporary server isolation'
    ],
    timeline: {
      firstSeen: '2025-04-29T08:15:00Z',
      lastSeen: '2025-04-29T16:45:00Z',
      updateFrequency: '5 minutes'
    }
  },
  'threat-4': {
    attackVector: 'Spear Phishing',
    targetSystems: 'Financial Department Workstations',
    affectedRegions: 'Europe, Middle East',
    malwareFamily: 'Emotet variant',
    encryptionMethod: 'XOR + RC4',
    commandAndControl: ['156.146.x.x', '89.234.x.x'],
    indicators: [
      'Suspicious macro-enabled documents',
      'PowerShell execution in user context',
      'Connections to known Emotet IPs',
      'Modified startup registry keys'
    ],
    recommendations: [
      'Block macro execution in Office documents',
      'Implement email attachment scanning',
      'Train users on phishing awareness',
      'Deploy EDR solutions',
      'Update email security policies'
    ],
    timeline: {
      firstSeen: '2025-04-29T09:30:00Z',
      lastSeen: '2025-04-29T15:20:00Z',
      updateFrequency: '20 minutes'
    }
  },
  'threat-5': {
    attackVector: 'Supply Chain Attack',
    targetSystems: 'Enterprise Software Updates',
    affectedRegions: 'North America, Europe, Asia',
    malwareFamily: 'SolarWinds-like Implant',
    encryptionMethod: 'Custom AES implementation',
    commandAndControl: ['167.172.x.x', '45.32.x.x', '78.90.x.x'],
    indicators: [
      'Modified DLL signatures in updates',
      'Unusual certificate usage',
      'Periodic C2 communication bursts',
      'Steganography in network traffic'
    ],
    recommendations: [
      'Verify software update signatures',
      'Implement software supply chain verification',
      'Monitor for unusual certificate usage',
      'Deploy network traffic analysis tools',
      'Review all recent system updates'
    ],
    timeline: {
      firstSeen: '2025-04-29T07:00:00Z',
      lastSeen: '2025-04-29T17:15:00Z',
      updateFrequency: '10 minutes'
    }
  }
};

const ThreatFeed = () => {
  const navigate = useNavigate();
  const { setThreatForChat } = useChatContext();
  const [threats, setThreats] = useState(mockThreats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState(null);

  useEffect(() => {
    loadThreats();
  }, []);

  const loadThreats = async () => {
    try {
      setLoading(true);
      const threatHashes = await fetchThreatHashes();
      // In a real application, we would process the threat hashes and update the state
      // For now, we'll just use the mock data
      setThreats(mockThreats);
    } catch (err) {
      setError('Failed to load threats');
      console.error('Error loading threats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyThreat = async (threat) => {
    try {
      const isVerified = await verifyThreatHash(threat.hash);
      setThreats(prevThreats =>
        prevThreats.map(t =>
          t.id === threat.id ? { ...t, verified: isVerified } : t
        )
      );
    } catch (err) {
      console.error('Error verifying threat:', err);
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return styles.severityCritical;
      case 'high':
        return styles.severityHigh;
      case 'medium':
        return styles.severityMedium;
      case 'low':
        return styles.severityLow;
      default:
        return styles.severityDefault;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleTTS = (threat) => {
    if (isSpeaking && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeech(null);
      return;
    }

    const text = `
      ${threat.title}. 
      Severity: ${threat.severity}.
      ${threat.description}
      ${threat.summary ? `Summary: ${threat.summary}` : ''}
      Confidence: ${threat.confidence}%.
      Detected at: ${formatTimestamp(threat.timestamp)}.
    `;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeech(null);
    };
    
    setIsSpeaking(true);
    setCurrentSpeech(threat.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleChatClick = (threat) => {
    const expandedData = mockExpandedData[threat.id];
    setThreatForChat(threat, expandedData);
    navigate('/chat');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Threat Feed</h2>
        <button
          onClick={loadThreats}
          className={styles.refreshButton}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      <div className={styles.feedContainer}>
        <AnimatePresence>
          {threats.map((threat) => {
            const isExpanded = expandedId === threat.id;
            const expandedData = mockExpandedData[threat.id];
            
            return (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={styles.threatCard}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span className={`${styles.severityBadge} ${getSeverityClass(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                    {threat.verified ? (
                      <span className={styles.verifiedBadge}>
                        <Shield size={16} />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleVerifyThreat(threat)}
                        className={styles.verifyButton}
                      >
                        <Shield size={16} />
                        <span>Verify</span>
                      </button>
                    )}
                  </div>
                  <h3 className={styles.threatTitle}>{threat.title}</h3>
                  <p className={styles.threatDescription}>{threat.description}</p>
                  <div className={styles.threatMeta}>
                    <div className={styles.metaItem}>
                      <Clock size={16} />
                      <span>{formatTimestamp(threat.timestamp)}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Hash size={16} />
                      <span className={styles.hash}>{threat.hash.slice(0, 16)}...</span>
                    </div>
                    <div className={styles.metaItem}>
                      <AlertTriangle size={16} />
                      <span>{threat.confidence}% confidence</span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isExpanded && expandedData && (
                      <motion.div
                        className={styles.expandedDetails}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={styles.detailsGrid}>
                          <div className={styles.detailsSection}>
                            <h4 className={styles.sectionTitle}>Attack Details</h4>
                            <div className={styles.detailsRow}>
                              <span className={styles.detailsLabel}>Attack Vector:</span>
                              <span>{expandedData.attackVector}</span>
                            </div>
                            <div className={styles.detailsRow}>
                              <span className={styles.detailsLabel}>Target Systems:</span>
                              <span>{expandedData.targetSystems}</span>
                            </div>
                            <div className={styles.detailsRow}>
                              <span className={styles.detailsLabel}>Affected Regions:</span>
                              <span>{expandedData.affectedRegions}</span>
                            </div>
                          </div>

                          <div className={styles.detailsSection}>
                            <h4 className={styles.sectionTitle}>Technical Details</h4>
                            <div className={styles.detailsRow}>
                              <span className={styles.detailsLabel}>Malware Family:</span>
                              <span>{expandedData.malwareFamily}</span>
                            </div>
                            <div className={styles.detailsRow}>
                              <span className={styles.detailsLabel}>Encryption:</span>
                              <span>{expandedData.encryptionMethod}</span>
                            </div>
                            <div className={styles.detailsRow}>
                              <span className={styles.detailsLabel}>C2 Servers:</span>
                              <span>{expandedData.commandAndControl.join(', ')}</span>
                            </div>
                          </div>

                          <div className={styles.detailsSection}>
                            <h4 className={styles.sectionTitle}>Indicators</h4>
                            <ul className={styles.bulletList}>
                              {expandedData.indicators.map((indicator, index) => (
                                <li key={index}>{indicator}</li>
                              ))}
                            </ul>
                          </div>

                          <div className={styles.detailsSection}>
                            <h4 className={styles.sectionTitle}>Recommendations</h4>
                            <ul className={styles.bulletList}>
                              {expandedData.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>

                          <div className={styles.actionsRow}>
                            <button 
                              className={`${styles.ttsButton} ${isSpeaking && currentSpeech === threat.id ? styles.active : ''}`}
                              onClick={() => handleTTS(threat)}
                              title={isSpeaking && currentSpeech === threat.id ? "Stop Reading" : "Read Aloud"}
                            >
                              <Volume2 size={20} />
                            </button>
                            <button 
                              className={styles.chatButton} 
                              onClick={() => handleChatClick(threat)}
                              title="Chat with AI"
                            >
                              <MessageSquare size={20} />
                              <span>Chat with AI</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button 
                  className={`${styles.externalLinkButton} ${isExpanded ? styles.expanded : ''}`}
                  onClick={() => handleExpand(threat.id)}
                  aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                >
                  <ExternalLink size={20} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </div>
  );
};

export default ThreatFeed;
