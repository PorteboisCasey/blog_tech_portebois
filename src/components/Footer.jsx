import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-white dark:bg-club-black border-t border-club-concrete dark:border-club-dark relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-club-smoke dark:text-club-text/60">
            © {new Date().getFullYear()} Casey Portebois
          </p>
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/PorteboisCasey"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-club-smoke dark:text-club-text/60 hover:text-club-neon dark:hover:text-club-neon"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/casey-portebois"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-club-smoke dark:text-club-text/60 hover:text-club-neon dark:hover:text-club-neon"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="https://twitter.com/CaseyPortebois"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-club-smoke dark:text-club-text/60 hover:text-club-neon dark:hover:text-club-neon"
            >
              <Twitter size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
