import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Upload, BarChart2, MessageSquare, Menu, X, ChevronLeft, ChevronRight, LogOut, User, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../config/firebase';
import { logout } from '../services/authService';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    // Get current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <BarChart2 size={20} /> },
    { path: '/feed', label: 'Cyber Feed', icon: <AlertTriangle size={20} /> },
    { path: '/upload', label: 'Upload', icon: <Upload size={20} /> },
    { path: '/chat', label: 'AI Chat', icon: <MessageSquare size={20} /> },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      width: isMobile ? '100%' : isCollapsed ? '80px' : '250px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: isMobile ? '-100%' : '-250px',
      width: isMobile ? '100%' : '250px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className={styles.menuButton}
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.overlay}
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={toggleSidebar}
            />
          )}
        </AnimatePresence>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          className={styles.sidebar}
          variants={sidebarVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <div className={styles.sidebarContent}>
            <div className={styles.logoContainer}>
              <Shield className={styles.logoIcon} />
              {!isCollapsed && <span className={styles.logoText}>BlockIntelAI</span>}
            </div>

            {/* Collapse toggle button (desktop only) */}
            {!isMobile && (
              <button 
                className={styles.collapseButton}
                onClick={toggleCollapse}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            )}

            <nav className={styles.nav}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
                  onClick={() => isMobile && setIsOpen(false)}
                  title={isCollapsed ? item.label : ''}
                >
                  <motion.div
                    className={styles.navIcon}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                  </motion.div>
                  {!isCollapsed && <span className={styles.navLabel}>{item.label}</span>}
                  {location.pathname === item.path && !isCollapsed && (
                    <motion.div
                      className={styles.activeIndicator}
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* User profile section */}
            {user && (
              <>
                <div className={styles.userProfile}>
                  <div className={styles.userAvatar}>
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <span className={styles.userName}>{user.displayName || user.email}</span>
                </div>
                <div className={styles.logoutSection}>
                  <button 
                    className={styles.logoutButton}
                    onClick={handleLogout}
                    title={isCollapsed ? 'Logout' : ''}
                  >
                    <LogOut size={18} />
                    {!isCollapsed && <span>Logout</span>}
                  </button>
                </div>
              </>
            )}

            <div className={styles.sidebarFooter}>
              <div className={styles.statusIndicator}>
                <div className={styles.statusDot} />
                {!isCollapsed && <span>System Online</span>}
              </div>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

export default Sidebar; 