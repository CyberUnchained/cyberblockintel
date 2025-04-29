import { motion } from 'framer-motion';
import ThreatFeed from '../components/ThreatFeed';
import styles from './Home.module.css';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <h1 className={styles.title}>
        BlockIntelAI Security Dashboard
      </h1>
      <ThreatFeed />
    </motion.div>
  );
};

export default Home;
