import matter from 'gray-matter';

const articleModules = import.meta.glob('/src/content/articles/*.md', { eager: true });

export const getAllArticles = () => {
  return Object.entries(articleModules)
    .map(([path, module]) => {
      const { data, content } = matter(module.default);
      return {
        ...data,
        id: path.split('/').pop().replace(/\.md$/, ''),
        content
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};
