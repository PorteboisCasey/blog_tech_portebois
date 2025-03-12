import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { language } = useLanguage();

  const links = [
    { path: '/', label: language === 'fr' ? 'Accueil' : 'Home' },
    { path: '/articles', label: language === 'fr' ? 'Articles' : 'Articles' },
    { path: '/about', label: language === 'fr' ? 'À propos' : 'About' },
  ];

  return (
    <nav 
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-club-dark/90 shadow-lg backdrop-blur-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-16">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-mono text-sm tracking-widest relative overflow-hidden group ${
                  location.pathname === link.path 
                    ? 'text-club-neon' 
                    : scrolled
                      ? 'text-club-black dark:text-club-text hover:text-club-neon transition-colors'
                      : 'text-club-text hover:text-club-neon font-medium transition-colors'
                }`}
              >
                <span className="inline-block relative overflow-hidden h-6">
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-transparent">
                    {link.label}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden w-10 h-10 flex items-center justify-center hover:text-club-neon ${
              scrolled ? 'text-club-black dark:text-club-text' : 'text-club-text'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute top-full left-0 right-0 md:hidden bg-white dark:bg-club-dark shadow-xl border-t border-club-neon/10 px-6 z-50"
          >
            <div className="px-4 py-8">
              <div className="flex flex-col space-y-6">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-display text-4xl tracking-tighter ${location.pathname === link.path
                      ? 'text-club-neon'
                      : 'text-club-black dark:text-club-text hover:text-club-neon'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
