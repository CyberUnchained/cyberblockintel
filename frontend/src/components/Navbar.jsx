import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            <Shield className={styles.logoIcon} />
            <span className={styles.logoText}>BlockIntelAI</span>
          </Link>
          
          <div className={styles.links}>
            <Link to="/" className={styles.link}>
              Dashboard
            </Link>
            <Link to="/feed" className={styles.link}>
              Cyber Feed
            </Link>
            <Link to="/upload" className={styles.link}>
              Upload
            </Link>
            <Link to="/chat" className={styles.link}>
              AI Chat
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
