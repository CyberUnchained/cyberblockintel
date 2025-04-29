import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('Login error:', error);
    // Check for API key error
    if (error.code === 'auth/invalid-api-key' || error.message.includes('API key not valid')) {
      return { user: null, error: 'API key not valid. Please check your Firebase configuration.' };
    }
    return { user: null, error: error.message };
  }
};

export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('Registration error:', error);
    // Check for API key error
    if (error.code === 'auth/invalid-api-key' || error.message.includes('API key not valid')) {
      return { user: null, error: 'API key not valid. Please check your Firebase configuration.' };
    }
    return { user: null, error: error.message };
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    console.error('Google login error:', error);
    // Check for API key error
    if (error.code === 'auth/invalid-api-key' || error.message.includes('API key not valid')) {
      return { user: null, error: 'API key not valid. Please check your Firebase configuration.' };
    }
    return { user: null, error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    console.error('Logout error:', error);
    return { error: error.message };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    console.error('Password reset error:', error);
    // Check for API key error
    if (error.code === 'auth/invalid-api-key' || error.message.includes('API key not valid')) {
      return { error: 'API key not valid. Please check your Firebase configuration.' };
    }
    return { error: error.message };
  }
}; 