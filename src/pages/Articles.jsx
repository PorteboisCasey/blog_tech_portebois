import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { articles } from '../content/articlesData';
import { useLanguage } from '../context/LanguageContext';

const Articles = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const articleList = Object.entries(articles).map(([id, article]) => ({
    ...article[language],
    id
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-club-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-club-black dark:text-club-text mb-4">
            {language === 'fr' ? 'Articles' : 'Articles'}
          </h1>
          <p className="text-lg text-club-smoke dark:text-club-text/70 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Mes réflexions et expériences sur la technologie et le développement.' 
              : 'My thoughts and experiences on technology and development.'}
          </p>
        </div>

        {articleList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-club-smoke dark:text-club-text/70">
              {language === 'fr' 
                ? 'Les articles arrivent bientôt !' 
                : 'Articles coming soon!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-h-[800px] overflow-y-auto pr-2 pb-4">
            {articleList.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="cursor-pointer"
                onClick={() => navigate(`/articles/${article.id}`)}
              >
                <article className="border border-club-concrete dark:border-club-dark p-6 rounded-lg hover:border-club-neon transition-colors duration-300 h-full flex flex-col bg-white dark:bg-club-black">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-mono text-club-smoke dark:text-club-text/60">{article.date}</span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      <span className="px-3 py-1 text-xs font-mono tracking-wider bg-club-neon/20 text-club-neon rounded-full">
                        {language === 'fr' ? '5 min' : '5 min'}
                      </span>
                      {article.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-mono tracking-wider bg-club-dark text-club-text rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl text-club-black dark:text-club-text mb-3">
                    {article.title}
                  </h2>
                  <p className="text-base text-club-smoke dark:text-club-text/70 font-light leading-relaxed flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 text-club-neon text-sm font-medium">
                    {language === 'fr' ? 'Lire l\'article' : 'Read article'} →
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
