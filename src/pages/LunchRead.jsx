import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { lunchReads } from '../content/lunchReads';

const LunchRead = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lunchReadList = Object.entries(lunchReads).map(([id, lunchRead]) => ({
    ...lunchRead[language],
    id
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-club-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-club-black dark:text-club-text mb-4">
            {language === 'fr' ? 'Lecture du Midi' : 'Lunch Read'}
          </h1>
          <p className="text-lg text-club-smoke dark:text-club-text/70 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Des articles de 5 minutes sur des sujets tech générés par IA pour votre pause déjeuner.' 
              : '5-minute reads on AI-generated tech topics for your lunch break.'}
          </p>
        </div>

        {lunchReadList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-club-smoke dark:text-club-text/70">
              {language === 'fr' 
                ? 'Les lectures du midi arrivent bientôt !' 
                : 'Lunch reads coming soon!'}
            </p>
          </div>
        ) : (
          lunchReadList.map((lunchRead) => (
            <motion.div
              key={lunchRead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer mb-8"
              onClick={() => navigate(`/lunch-read/${lunchRead.id}`)}
            >
              <article className="border border-club-concrete dark:border-club-dark p-8 rounded-lg hover:border-club-neon transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-mono text-club-smoke dark:text-club-text/60">{lunchRead.date}</span>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-xs font-mono tracking-wider bg-club-neon/20 text-club-neon rounded-full">
                      {language === 'fr' ? '5 min' : '5 min'}
                    </span>
                    {lunchRead.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono tracking-wider bg-club-dark text-club-text rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-club-black dark:text-club-text mb-4 hover:text-club-neon transition-colors duration-300">
                  {lunchRead.title}
                </h2>
                <p className="text-base text-club-smoke dark:text-club-text/70 font-light leading-relaxed">
                  {lunchRead.excerpt}
                </p>
              </article>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LunchRead;
