import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon, AlertTriangle, Shield, Clock, Hash } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import styles from './ThreatDashboard.module.css';

// Mock data for different time ranges
const mockData = {
  day: {
    total: 42,
    critical: 4,
    high: 8,
    medium: 18,
    low: 12,
    verified: 28,
    unverified: 14,
    recentActivity: [
      { id: 1, title: 'Critical Zero-Day Exploit', severity: 'critical', timestamp: new Date(Date.now() - 1800000).toISOString() },
      { id: 2, title: 'Suspicious Login Attempt', severity: 'medium', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 3, title: 'Data Exfiltration Alert', severity: 'high', timestamp: new Date(Date.now() - 7200000).toISOString() },
      { id: 4, title: 'Failed Authentication', severity: 'low', timestamp: new Date(Date.now() - 10800000).toISOString() },
      { id: 5, title: 'Malware Detection', severity: 'high', timestamp: new Date(Date.now() - 14400000).toISOString() }
    ]
  },
  week: {
    total: 156,
    critical: 12,
    high: 34,
    medium: 78,
    low: 32,
    verified: 98,
    unverified: 58,
    recentActivity: [
      { id: 1, title: 'Ransomware Attack Detected', severity: 'high', timestamp: new Date(Date.now() - 86400000).toISOString() },
      { id: 2, title: 'Suspicious Network Activity', severity: 'medium', timestamp: new Date(Date.now() - 172800000).toISOString() },
      { id: 3, title: 'Zero-Day Vulnerability', severity: 'critical', timestamp: new Date(Date.now() - 259200000).toISOString() },
      { id: 4, title: 'Phishing Campaign', severity: 'medium', timestamp: new Date(Date.now() - 345600000).toISOString() },
      { id: 5, title: 'Malware Detection', severity: 'high', timestamp: new Date(Date.now() - 432000000).toISOString() }
    ]
  },
  month: {
    total: 587,
    critical: 45,
    high: 123,
    medium: 264,
    low: 155,
    verified: 412,
    unverified: 175,
    recentActivity: [
      { id: 1, title: 'APT Group Activity', severity: 'critical', timestamp: new Date(Date.now() - 604800000).toISOString() },
      { id: 2, title: 'Supply Chain Attack', severity: 'critical', timestamp: new Date(Date.now() - 1209600000).toISOString() },
      { id: 3, title: 'Cryptojacking Campaign', severity: 'high', timestamp: new Date(Date.now() - 1814400000).toISOString() },
      { id: 4, title: 'DDoS Attack', severity: 'medium', timestamp: new Date(Date.now() - 2419200000).toISOString() },
      { id: 5, title: 'Insider Threat Detection', severity: 'high', timestamp: new Date(Date.now() - 3024000000).toISOString() }
    ]
  }
};

// Chart data for different time ranges
const getTimelineData = (timeRange) => {
  switch (timeRange) {
    case 'day':
      return [
        { name: '12AM', threats: 8, verified: 6 },
        { name: '4AM', threats: 5, verified: 4 },
        { name: '8AM', threats: 12, verified: 9 },
        { name: '12PM', threats: 15, verified: 12 },
        { name: '4PM', threats: 10, verified: 8 },
        { name: '8PM', threats: 7, verified: 5 },
        { name: 'Now', threats: 6, verified: 4 }
      ];
    case 'week':
      return [
        { name: 'Mon', threats: 45, verified: 30 },
        { name: 'Tue', threats: 52, verified: 45 },
        { name: 'Wed', threats: 38, verified: 25 },
        { name: 'Thu', threats: 65, verified: 55 },
        { name: 'Fri', threats: 48, verified: 40 },
        { name: 'Sat', threats: 35, verified: 28 },
        { name: 'Sun', threats: 42, verified: 35 }
      ];
    case 'month':
      return [
        { name: 'Week 1', threats: 156, verified: 112 },
        { name: 'Week 2', threats: 142, verified: 98 },
        { name: 'Week 3', threats: 168, verified: 125 },
        { name: 'Week 4', threats: 121, verified: 77 }
      ];
  }
};

const getSeverityData = (timeRange) => {
  switch (timeRange) {
    case 'day':
      return [
        { name: 'Critical', value: 4, color: '#ef4444' },
        { name: 'High', value: 8, color: '#f97316' },
        { name: 'Medium', value: 18, color: '#eab308' },
        { name: 'Low', value: 12, color: '#22c55e' }
      ];
    case 'week':
      return [
        { name: 'Critical', value: 12, color: '#ef4444' },
        { name: 'High', value: 34, color: '#f97316' },
        { name: 'Medium', value: 78, color: '#eab308' },
        { name: 'Low', value: 32, color: '#22c55e' }
      ];
    case 'month':
      return [
        { name: 'Critical', value: 45, color: '#ef4444' },
        { name: 'High', value: 123, color: '#f97316' },
        { name: 'Medium', value: 264, color: '#eab308' },
        { name: 'Low', value: 155, color: '#22c55e' }
      ];
  }
};

const getCategoryData = (timeRange) => {
  switch (timeRange) {
    case 'day':
      return [
        { name: 'Ransomware', count: 8, color: '#3b82f6' },
        { name: 'Phishing', count: 12, color: '#8b5cf6' },
        { name: 'Zero-Day', count: 4, color: '#ec4899' },
        { name: 'Malware', count: 10, color: '#f43f5e' },
        { name: 'DDoS', count: 8, color: '#06b6d4' }
      ];
    case 'week':
      return [
        { name: 'Ransomware', count: 28, color: '#3b82f6' },
        { name: 'Phishing', count: 45, color: '#8b5cf6' },
        { name: 'Zero-Day', count: 15, color: '#ec4899' },
        { name: 'Malware', count: 32, color: '#f43f5e' },
        { name: 'DDoS', count: 22, color: '#06b6d4' }
      ];
    case 'month':
      return [
        { name: 'Ransomware', count: 98, color: '#3b82f6' },
        { name: 'Phishing', count: 156, color: '#8b5cf6' },
        { name: 'Zero-Day', count: 67, color: '#ec4899' },
        { name: 'Malware', count: 145, color: '#f43f5e' },
        { name: 'DDoS', count: 89, color: '#06b6d4' }
      ];
  }
};

const ThreatDashboard = () => {
  const [stats, setStats] = useState(mockData.week);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const [timelineData, setTimelineData] = useState(getTimelineData('week'));
  const [severityData, setSeverityData] = useState(getSeverityData('week'));
  const [categoryData, setCategoryData] = useState(getCategoryData('week'));

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockData[timeRange]);
      setTimelineData(getTimelineData(timeRange));
      setSeverityData(getSeverityData(timeRange));
      setCategoryData(getCategoryData(timeRange));
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Threats Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="threats" stroke="#3b82f6" fillOpacity={1} fill="url(#colorThreats)" />
                  <Area type="monotone" dataKey="verified" stroke="#22c55e" fillOpacity={1} fill="url(#colorVerified)" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Threat Categories</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
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
