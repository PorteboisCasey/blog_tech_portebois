
import React, { useState, useEffect, Component } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import articlesData from '../content/articlesData.js';

// Error Boundary component to catch rendering errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console
    console.error('ErrorBoundary caught an error:', error);
    console.error('Component stack trace:', errorInfo.componentStack);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="min-h-screen bg-white dark:bg-club-black flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-club-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-display text-club-black dark:text-club-text mb-4">
              Something went wrong
            </h2>
            <p className="text-club-smoke dark:text-club-text/70 mb-4">
              We're sorry, but an error occurred while rendering this page.
            </p>
            <pre className="bg-gray-100 dark:bg-club-black p-4 rounded text-sm font-mono overflow-auto max-h-40 mb-4">
              {this.state.error && this.state.error.toString()}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-club-neon text-white rounded hover:bg-club-neon/80 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Home = () => {
  console.log('=== Home.jsx: Home component mounting ===');
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const fullText = language === 'fr' ? '> EXPLORATION DU DIGITAL UNDERGROUND_' : '> EXPLORING THE DIGITAL UNDERGROUND_';
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
    console.log('=== Home.jsx: Loading articles data ===');
    try {
      // Verify articlesData is properly loaded
      if (!articlesData) {
        console.error('=== Home.jsx: articlesData is undefined or null ===');
        throw new Error('Articles data could not be loaded. Check the import path.');
      }
      
      console.log('articlesData type:', typeof articlesData);
      console.log('articlesData available:', !!articlesData);
      console.log('articlesData keys:', Object.keys(articlesData));
      
      // Get all articles and prepare them for display
      const allArticles = Object.entries(articlesData).map(([id, content]) => {
        if (!content || !content[language]) {
          console.warn(`=== Home.jsx: Missing language data for article ${id} ===`);
          return null;
        }
        return {
          id,
          ...content[language]
        };
      }).filter(Boolean); // Filter out any null values
      
      console.log('=== Home.jsx: Articles processed ===', allArticles.length);
      setFeaturedArticles(allArticles);
    } catch (error) {
      console.error('=== Home.jsx: Error processing articles data ===', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        articlesDataAvailable: !!articlesData,
      });
      // Set empty array to prevent rendering errors
      setFeaturedArticles([]);
    }
  }, [language]);
  
  useEffect(() => {
    console.log('=== Home.jsx: Setting up text animation ===');
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) index = 0;
    }, 150);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log('=== Home.jsx: Featured articles updated ===', featuredArticles.length);
  }, [featuredArticles]);

  return (
    <div className="min-h-screen bg-white dark:bg-club-black transition-colors duration-300">
      <div className="relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="font-mono text-sm text-club-smoke dark:text-club-text/60 mb-4">
              {text}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display mb-4 text-club-black dark:text-club-text leading-none">
              STUDENT 
              <span className="text-club-neon">LAB</span>
            </h1>

            <p className="text-lg text-club-smoke dark:text-club-text/70 max-w-2xl leading-relaxed font-light mb-6">
              {language === 'fr' ? 
                "Explorer le développement à travers mes expériences d'étudiant et mes projets." :
                "Exploring development through my student experiences and projects."}
            </p>

            <p className="text-sm font-mono text-club-smoke/60 dark:text-club-text/40 tracking-wider">
              {language === 'fr' ? 'EXPLORER LE DÉVELOPPEMENT' : 'EXPLORING DEVELOPMENT'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-24"
          >
            <h2 className="text-3xl font-display mb-10 text-club-black dark:text-club-text">
              {language === 'fr' ? 'Articles récents' : 'Recent Articles'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/articles/${article.id}`)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <article className="border border-gray-200 dark:border-club-dark p-6 rounded-lg hover:border-club-neon transition-colors duration-300 h-full flex flex-col bg-white dark:bg-club-black shadow-none">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-mono text-gray-600 dark:text-club-text/90">{article.date}</span>
                      <span className="px-3 py-1 text-xs font-mono tracking-wider bg-club-neon/10 text-club-neon rounded-full">
                        {article.readTime || (language === 'fr' ? '5 min' : '5 min')}
                      </span>
                    </div>
                    
                    <h3 className="font-display text-xl text-club-black dark:text-white mb-3">
                      {article.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags && article.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-mono tracking-wider bg-gray-100 dark:bg-club-dark/80 text-gray-800 dark:text-white rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-base text-gray-700 dark:text-gray-100 font-light leading-relaxed flex-grow">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center text-club-neon mt-4">
                      <span className="text-xs font-mono mr-2">{language === 'fr' ? 'Lire la suite' : 'Read more'}</span>
                      <ArrowRight size={14} />
                    </div>
                  </article>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Wrap the Home component with ErrorBoundary
const HomeWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
};

export default HomeWithErrorBoundary;
