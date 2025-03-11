import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { lunchReads } from '../content/lunchReads';
import { useLanguage } from '../context/LanguageContext';
import { useEffect } from 'react';

const LunchReadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lunchRead = lunchReads[id]?.[language];

  useEffect(() => {
    if (!lunchRead) {
      navigate('/lunch-read');
    }
  }, [lunchRead, navigate]);

  if (!lunchRead) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-club-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-48 pb-48"
      >
        <article className="max-w-3xl mx-auto bg-white/80 dark:bg-club-black/80 backdrop-blur rounded-lg p-8">
          <div className="mb-8 flex items-center">
            <span className="text-xs font-mono text-club-text/60 tracking-wider mr-4">
              {lunchRead.date}
            </span>
            <span className="px-3 py-1 text-xs font-mono tracking-wider bg-club-neon/20 text-club-neon rounded-full">
              {language === 'fr' ? '5 min de lecture' : '5 min read'}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-club-text mb-6 text-center">
            {lunchRead.title}
          </h1>
          <p className="text-xl text-club-text/70 font-light max-w-2xl mx-auto text-center mb-8">
            {lunchRead.excerpt}
          </p>
          <div className="w-1/3 h-px bg-club-neon/10 mx-auto mb-12"></div>
          <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:text-club-black dark:prose-headings:text-club-text prose-p:text-club-smoke dark:prose-p:text-club-text/70 prose-strong:text-club-neon prose-a:text-club-neon hover:prose-a:text-club-neon/80 prose-h2:text-3xl prose-h3:text-2xl prose-h2:mt-12 prose-h3:mt-8 prose-p:leading-relaxed prose-p:mb-6 prose-ul:mb-6 prose-li:mb-2 break-words">
            <ReactMarkdown>{lunchRead.content}</ReactMarkdown>
          </div>
        </article>
      </motion.div>
    </div>
  );
};

export default LunchReadPage;
