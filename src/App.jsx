import React, { useEffect, useState, useCallback } from 'react';
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

// Error boundary component
class ErrorFallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('=== App.jsx: ERROR BOUNDARY CAUGHT ERROR ===', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 m-4 border-2 border-red-500 rounded bg-red-100 text-red-900">
          <h2>Something went wrong.</h2>
          <details className="mt-2 whitespace-pre-wrap">
            <summary>Error details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [renderAttempt, setRenderAttempt] = useState(0);
  const location = useLocation();

  // Set up error tracking
  useEffect(() => {
    window.onerror = function(message, source, lineno, colno, error) {
      console.error('Global error:', { message, source, lineno, colno, error });
      return false;
    };

    return () => {
      // Clean up error handler
    };
  }, []);

  // Force re-render on blank page if needed
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasVisibleContent = document.body.innerText.trim().length > 0;
      
      if (!hasVisibleContent && renderAttempt < 3) {
        setRenderAttempt(prev => prev + 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [renderAttempt]);

  const handleRenderError = useCallback((error) => {
    console.error('Render error:', error);
  }, []);

  return (
    <ErrorFallback>
      <ThemeProvider>
        <LanguageProvider>
          <div 
            className="min-h-screen transition-colors duration-300 bg-white dark:bg-club-black text-club-black dark:text-club-text flex flex-col"
            onError={handleRenderError}
          >
          <ErrorFallback>
            <Navbar />
          </ErrorFallback>
          <main className="pt-16 px-4 relative overflow-hidden">
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
            {/* Clean transition without overlays */}
            <ErrorFallback>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<ArticlePage />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </ErrorFallback>
          </motion.div>
        </AnimatePresence>
      </main>
      <ErrorFallback>
        <ThemeToggle />
        <LanguageToggle />
        <Footer />
      </ErrorFallback>
      </div>
      </LanguageProvider>
    </ThemeProvider>
    </ErrorFallback>
  );
}

export default App;
