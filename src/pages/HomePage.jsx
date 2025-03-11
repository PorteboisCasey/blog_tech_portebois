import { motion } from 'framer-motion';
import ArticleCard from '../components/ArticleCard';
import { getAllArticles } from '../lib/markdownParser';

const HomePage = () => {
  const articles = getAllArticles();

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-16 pb-16"
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Mes Explorations Tech
      </h1>
      
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            excerpt={article.excerpt}
            date={article.date}
            tags={article.tags}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default HomePage;
