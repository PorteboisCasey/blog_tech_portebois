import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed bottom-4 right-20 p-3 rounded-full bg-club-concrete dark:bg-club-dark text-club-black dark:text-club-text z-50 font-mono text-sm"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {language.toUpperCase()}
    </motion.button>
  );
};

export default LanguageToggle;
