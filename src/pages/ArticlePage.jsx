import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import articlesData from '../content/articlesData';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState } from 'react';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      console.log(`Loading article: id=${id}, language=${language}`);
      setLoading(true);
      try {
        // Get article metadata from articlesData
        if (articlesData[id]?.[language]) {
          const articleMetadata = articlesData[id][language];
          console.log('Article metadata found:', articleMetadata);
          
          // Fetch markdown content from the file
          try {
            const markdownPath = articleMetadata.markdownPath;
            if (markdownPath) {
              // Construct absolute URL for development
              const baseUrl = import.meta.env.DEV 
                ? window.location.origin 
                : '';
              const markdownUrl = `${baseUrl}${markdownPath}`;
              console.log('Fetching markdown from:', markdownUrl);
              
              const response = await fetch(markdownUrl);
              if (!response.ok) {
                throw new Error(`Failed to fetch markdown: ${response.status}`);
              }

              const markdownContent = await response.text();
              console.log('Markdown content loaded, length:', markdownContent.length);

              // Combine metadata with content
              setArticle({
                ...articleMetadata,
                content: markdownContent
              });
            } else {
              // Fallback if no markdown path
              console.warn('No markdown path found for article:', id, language);
              setArticle(articleMetadata);
            }
          } catch (fetchError) {
            console.error('Error fetching markdown content:', fetchError);
            console.error('Stack:', fetchError.stack);
            // Still show article with metadata but without content
            setArticle({
              ...articleMetadata,
              content: `# Error Loading Content\n\nSorry, we couldn't load the content for this article. Please try again later.`
            });
          }
        } else {
          // If article not found, navigate back to articles page
          console.error('Article not found:', id, language);
          navigate('/articles');
        }
      } catch (error) {
        console.error('Error loading article:', error);
        console.error('Stack:', error.stack);
        navigate('/articles');
      } finally {
        setLoading(false);
      };
    };

    loadArticle();
  }, [id, language, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-club-black flex items-center justify-center">
        <div className="text-club-neon text-xl">Loading article content...</div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-club-black">      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-48"
      >
        <article className="max-w-3xl mx-auto bg-white dark:bg-club-black p-8 rounded-xl shadow-lg">
          <h1 className="font-display text-4xl md:text-5xl text-club-text mb-8 leading-tight text-center">
            {article.title}
          </h1>
          <hr className="mb-12 border-t-2 border-club-neon/30 mx-auto w-1/3" />
          <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:text-club-black dark:prose-headings:text-club-text prose-p:text-club-smoke dark:prose-p:text-club-text/70 prose-strong:text-club-neon prose-a:text-club-neon hover:prose-a:text-club-neon/80 prose-h2:text-3xl prose-h3:text-2xl prose-h2:mt-12 prose-h3:mt-8 prose-p:leading-relaxed prose-p:mb-6 prose-ul:mb-6 prose-li:mb-2 break-words
            prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-club-neon/20
            prose-figcaption:text-center prose-figcaption:italic prose-figcaption:text-sm prose-figcaption:text-club-smoke/80 dark:prose-figcaption:text-club-text/70">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </article>
      </motion.div>
    </div>
  );
};

export default ArticlePage;
