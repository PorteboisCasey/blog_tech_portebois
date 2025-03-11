
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { articles, getAllArticles } from '../content/articlesData';

const Home = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const fullText = language === 'fr' ? '> EXPLORATION DU DIGITAL UNDERGROUND_' : '> EXPLORING THE DIGITAL UNDERGROUND_';
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
    // Get all articles and prepare them for display
    const allArticles = Object.entries(articles).map(([id, content]) => ({
      id,
      ...content[language]
    }));
    setFeaturedArticles(allArticles);
  }, [language]);
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) index = 0;
    }, 150);
    return () => clearInterval(timer);
  }, []);

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

export default Home;
