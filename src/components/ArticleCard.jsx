import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cardVariants } from '../lib/animations';

const ArticleCard = ({ id, title, content, created_at, author_id }) => (
  <motion.article
    variants={cardVariants}
    whileHover="hover"
    className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
  >
    
    <span className="text-xs font-semibold text-primary dark:text-primary-300">
      {new Date(created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </span>
    
    <Link to={`/articles/${id}`} className="block mt-2">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors">
        {title}
      </h2>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        {content.length > 150 ? content.substring(0, 150) + '...' : content}
      </p>
    </Link>
    
    <div className="mt-4 flex flex-wrap gap-2">
      <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
        Author #{author_id}
      </span>
    </div>
  </motion.article>
);

export default ArticleCard;
