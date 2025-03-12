import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticlePage from './pages/ArticlePage';
import About from './pages/About';


const pageTransitionVariants = {
  initial: { 
    opacity: 0
  },
  animate: { 
    opacity: 1
  },
  exit: { 
    opacity: 0
  }
};

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <LanguageProvider>
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-club-black text-club-black dark:text-club-text flex flex-col">
      <Navbar />
      <main className="pt-24 relative overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div
            key={location.pathname}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: 'anticipate'
            }}
            className="relative"
          >
            {/* Clean transition without overlays */}
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticlePage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
        <ThemeToggle />
        <LanguageToggle />
        <Footer />
      </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
