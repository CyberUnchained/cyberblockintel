import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginWithEmail, loginWithGoogle } from '../services/authService';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { user, error } = await loginWithEmail(email, password);
      setIsLoading(false);

      if (error) {
        // Handle specific Firebase error codes
        if (error.includes('API key not valid')) {
          setError('Authentication service is currently unavailable. Please try again later or contact support.');
        } else if (error.includes('user-not-found')) {
          setError('No account found with this email address.');
        } else if (error.includes('wrong-password')) {
          setError('Incorrect password. Please try again.');
        } else {
          setError(error);
        }
      } else if (user) {
        navigate('/');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An unexpected error occurred. Please try again later.');
      console.error('Login error:', err);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const { user, error } = await loginWithGoogle();
      setIsLoading(false);

      if (error) {
        // Handle specific Firebase error codes
        if (error.includes('API key not valid')) {
          setError('Authentication service is currently unavailable. Please try again later or contact support.');
        } else if (error.includes('popup-closed-by-user')) {
          setError('Google sign-in was cancelled. Please try again.');
        } else {
          setError(error);
        }
      } else if (user) {
        navigate('/');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An unexpected error occurred. Please try again later.');
      console.error('Google login error:', err);
    }
  };

  return (
    <motion.div 
      className={styles.loginContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Login to BlockIntelAI</h1>
        
        {error && (
          <motion.div 
            className={styles.error}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleEmailLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className={styles.googleButton}
          disabled={isLoading}
        >
          <img 
            src="/google-icon.svg" 
            alt="Google" 
            className={styles.googleIcon}
          />
          Continue with Google
        </button>

        <p className={styles.registerLink}>
          Don't have an account?{' '}
          <a href="/register" className={styles.link}>
            Register here
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Login; 