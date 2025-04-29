import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDqjV6-ER1gqgklq0cUT8hOHsF9EuN_ZPo",
  authDomain: "juriscan-f2360.firebaseapp.com",
  projectId: "juriscan-f2360",
  storageBucket: "juriscan-f2360.firebasestorage.app",
  messagingSenderId: "650316083510",
  appId: "1:650316083510:web:ff9daf5ad00223cc180397"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app; 