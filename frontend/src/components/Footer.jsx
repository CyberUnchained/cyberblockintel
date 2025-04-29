import { motion } from 'framer-motion';
import { Github, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} BlockIntelAI. All rights reserved.
          </p>
          <div className={styles.links}>
            <a href="#" className={styles.link}>
              Privacy Policy
            </a>
            <a href="#" className={styles.link}>
              Terms of Service
            </a>
            <a href="#" className={styles.link}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
