import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerWithEmail, loginWithGoogle } from '../services/authService';
import styles from './Register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const { user, error } = await registerWithEmail(email, password);
      setIsLoading(false);

      if (error) {
        // Handle specific Firebase error codes
        if (error.includes('API key not valid')) {
          setError('Authentication service is currently unavailable. Please try again later or contact support.');
        } else if (error.includes('email-already-in-use')) {
          setError('An account with this email already exists. Please login instead.');
        } else if (error.includes('weak-password')) {
          setError('Password is too weak. Please use a stronger password.');
        } else {
          setError(error);
        }
      } else if (user) {
        setError('');
        setIsLoading(false);
        navigate('/');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An unexpected error occurred. Please try again later.');
      console.error('Registration error:', err);
    }
  };

  const handleGoogleRegister = async () => {
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
        setError('');
        setIsLoading(false);
        navigate('/');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An unexpected error occurred. Please try again later.');
      console.error('Google registration error:', err);
    }
  };

  return (
    <motion.div 
      className={styles.registerContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.registerCard}>
        <h1 className={styles.title}>Create Account</h1>
        
        {error && (
          <motion.div 
            className={styles.error}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleEmailRegister} className={styles.form}>
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
              placeholder="Create a password"
              minLength={6}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="Confirm your password"
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button 
          onClick={handleGoogleRegister}
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

        <p className={styles.loginLink}>
          Already have an account?{' '}
          <a href="/login" className={styles.link}>
            Login here
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Register; 