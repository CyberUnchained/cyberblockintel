import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import ThreatDashboard from './pages/ThreatDashboard';
import UploadThreat from './pages/UploadThreat';
import AIChat from './pages/AIChat';
import './styles/global.css';
import styles from './App.module.css';
import { ChatProvider } from './context/ChatContext';
import ThreatFeed from './components/ThreatFeed';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <ChatProvider>
        <div className={styles.appContainer}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Dashboard as landing page */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className={styles.mainLayout}>
                    <Sidebar />
                    <main className={styles.mainContent}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={pageTransition}
                          transition={{ duration: 0.3 }}
                        >
                          <ThreatDashboard />
                        </motion.div>
                      </AnimatePresence>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Cyber Feed route */}
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <div className={styles.mainLayout}>
                    <Sidebar />
                    <main className={styles.mainContent}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={pageTransition}
                          transition={{ duration: 0.3 }}
                        >
                          <Home />
                        </motion.div>
                      </AnimatePresence>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <div className={styles.mainLayout}>
                    <Sidebar />
                    <main className={styles.mainContent}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={pageTransition}
                          transition={{ duration: 0.3 }}
                        >
                          <UploadThreat />
                        </motion.div>
                      </AnimatePresence>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <div className={styles.mainLayout}>
                    <Sidebar />
                    <main className={styles.mainContent}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={pageTransition}
                          transition={{ duration: 0.3 }}
                        >
                          <AIChat />
                        </motion.div>
                      </AnimatePresence>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </ChatProvider>
    </Router>
  );
}

export default App; 