import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, PieChart, LineChart, AlertTriangle, Shield, Clock, Hash } from 'lucide-react';
import styles from './ThreatDashboard.module.css';

// Mock data for the dashboard
const mockThreatStats = {
  total: 156,
  critical: 12,
  high: 34,
  medium: 78,
  low: 32,
  verified: 98,
  unverified: 58,
  recentActivity: [
    { id: 1, title: 'Ransomware Attack Detected', severity: 'high', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, title: 'Suspicious Network Activity', severity: 'medium', timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: 3, title: 'Zero-Day Vulnerability', severity: 'critical', timestamp: new Date(Date.now() - 14400000).toISOString() },
    { id: 4, title: 'Phishing Campaign', severity: 'medium', timestamp: new Date(Date.now() - 21600000).toISOString() },
    { id: 5, title: 'Malware Detection', severity: 'high', timestamp: new Date(Date.now() - 28800000).toISOString() }
  ]
};

const ThreatDashboard = () => {
  const [stats, setStats] = useState(mockThreatStats);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real application, you would fetch data from your API
      // const response = await fetch(`/api/dashboard?timeRange=${timeRange}`);
      // const data = await response.json();
      // setStats(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return '#ef4444';
      case 'high':
        return '#f97316';
      case 'medium':
        return '#eab308';
      case 'low':
        return '#22c55e';
      default:
        return '#6b7280';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Threat Dashboard</h1>
        <div className={styles.timeRangeSelector}>
          <button 
            className={`${styles.timeButton} ${timeRange === 'day' ? styles.active : ''}`}
            onClick={() => setTimeRange('day')}
          >
            Day
          </button>
          <button 
            className={`${styles.timeButton} ${timeRange === 'week' ? styles.active : ''}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={`${styles.timeButton} ${timeRange === 'month' ? styles.active : ''}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <AlertTriangle size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>Total Threats</h3>
                <p className={styles.statValue}>{stats.total}</p>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ color: '#ef4444' }}>
                <AlertTriangle size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>Critical</h3>
                <p className={styles.statValue}>{stats.critical}</p>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ color: '#f97316' }}>
                <AlertTriangle size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>High</h3>
                <p className={styles.statValue}>{stats.high}</p>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ color: '#eab308' }}>
                <AlertTriangle size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>Medium</h3>
                <p className={styles.statValue}>{stats.medium}</p>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ color: '#22c55e' }}>
                <AlertTriangle size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>Low</h3>
                <p className={styles.statValue}>{stats.low}</p>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ color: '#3b82f6' }}>
                <Shield size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>Verified</h3>
                <p className={styles.statValue}>{stats.verified}</p>
              </div>
            </div>
          </div>
          
          <div className={styles.chartsGrid}>
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Threat Severity Distribution</h3>
              <div className={styles.chartPlaceholder}>
                <PieChart size={48} />
                <p>Pie Chart Visualization</p>
              </div>
            </div>
            
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Threats Over Time</h3>
              <div className={styles.chartPlaceholder}>
                <LineChart size={48} />
                <p>Line Chart Visualization</p>
              </div>
            </div>
            
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Threat Categories</h3>
              <div className={styles.chartPlaceholder}>
                <BarChart size={48} />
                <p>Bar Chart Visualization</p>
              </div>
            </div>
          </div>
          
          <div className={styles.recentActivity}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <div className={styles.activityList}>
              {stats.recentActivity.map(activity => (
                <div key={activity.id} className={styles.activityItem}>
                  <div 
                    className={styles.severityIndicator}
                    style={{ backgroundColor: getSeverityColor(activity.severity) }}
                  ></div>
                  <div className={styles.activityContent}>
                    <h3 className={styles.activityTitle}>{activity.title}</h3>
                    <div className={styles.activityMeta}>
                      <div className={styles.metaItem}>
                        <Clock size={16} />
                        <span>{formatTimestamp(activity.timestamp)}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <Hash size={16} />
                        <span className={styles.hash}>0x{Math.random().toString(16).substring(2, 10)}...</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ThreatDashboard;
