#!/usr/bin/env node

/**
 * Lunch Read Generator
 * 
 * This script generates a new "Lunch Read" article - a 5-minute read on a tech topic
 * using AI. It creates both French and English versions and adds them to the lunchReads.js file.
 * 
 * Usage:
 *   node generate-lunch-read.js
 * 
 * You can also schedule this script to run automatically using cron or a similar scheduler.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { v4: uuidv4 } = require('uuid');

// Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const CONTENT_PATH = path.join(__dirname, '../../src/content/lunchReads.js');
const TOPICS = [
  'Web security fails that will make you laugh (and then update your code)',
  'React performance hacks your CPU will thank you for',
  'CSS tricks that would make Harry Potter jealous',
  'JavaScript memory leaks and how to ghostbust them',
  'API designs that won\'t make other developers hate you',
  'Microservices: when your app needs to be more like The Avengers and less like a solo superhero',
  'DevOps automation for the chronically lazy developer',
  'Database optimization for when your queries are slower than a sloth on vacation',
  'Frontend testing without losing your sanity',
  'Serverless computing: because servers are so 2010',
  'Progressive Web Apps that will make native app developers nervous',
  'Web accessibility: because not everyone browses like you do',
  'GraphQL vs REST: the tech world\'s Batman v Superman',
  'Docker containers explained through cat memes',
  'CI/CD pipelines for people who hate fixing broken builds at 2 AM',
  'Kubernetes explained like I\'m five (but a really smart five-year-old)',
  'TypeScript types that will bend your mind like a spoon in The Matrix',
  'State management: because global variables were never the answer',
  'Web animations that won\'t make your users seasick',
  'Browser rendering: what happens after you hit enter',
  'WebAssembly: making JavaScript nervous since 2017',
  'Authentication methods that won\'t get you featured on "How I Got Pwned"',
  'Responsive design for a world with 8,749 different screen sizes',
  'Code reviews without the tears and drama',
  'Technical debt: the monster hiding under your codebase',
  'AI in web apps: how to use AI without becoming Skynet',
  'WebSockets explained while we build a ridiculous real-time app',
  'SEO for developers who think "meta tags" are Instagram hashtags',
  'Web performance for sites that feel faster than a caffeinated cheetah',
  'Cross-browser compatibility or: How I Learned to Stop Worrying and Love Feature Detection'
];

// Helper functions
function getRandomTopic() {
  return TOPICS[Math.floor(Math.random() * TOPICS.length)];
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateTags(content) {
  // Simple tag extraction based on common tech terms in the content
  const techTerms = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Express',
    'API', 'REST', 'GraphQL', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'DevOps', 'CI/CD',
    'Testing', 'Security', 'Performance', 'Optimization', 'Frontend', 'Backend',
    'Fullstack', 'Web', 'Mobile', 'Responsive', 'UX', 'UI', 'Design',
    'Accessibility', 'SEO', 'Analytics', 'AI', 'Machine Learning', 'Serverless',
    'Microservices', 'Architecture', 'Patterns', 'Best Practices', 'CSS', 'HTML'
  ];
  
  const tags = [];
  techTerms.forEach(term => {
    if (content.includes(term) && tags.length < 3 && !tags.includes(term)) {
      tags.push(term);
    }
  });
  
  // Add at least one tag if none were found
  if (tags.length === 0) {
    tags.push('Tech');
  }
  
  return tags;
}

async function generateArticle(topic) {
  if (!OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is not set');
    process.exit(1);
  }

  console.log(`Generating article on topic: ${topic}`);
  
  try {
    // Generate English version
    const englishPrompt = `
      Write a fun, engaging, and conversational 5-minute tech article about "${topic}".
      The article should:
      - Have a casual, friendly tone like you're chatting with a friend
      - Include humor, pop culture references, and relatable analogies
      - Still include practical code examples where relevant, but explain them in a fun way
      - Be structured with clever, catchy headings
      - Tell a story or use narrative elements when possible
      - Include personal anecdotes or hypothetical scenarios
      - Avoid dry, academic language and "tutorial-style" writing
      - Be around 1000-1200 words
      - Use markdown formatting
      
      Start with a # heading for the title (make it catchy and fun), followed by an engaging introduction paragraph.
      Don't include any frontmatter or metadata.
    `;
    
    const englishContent = execSync(`curl -s https://api.openai.com/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${OPENAI_API_KEY}" \
      -d '{
        "model": "gpt-4",
        "messages": [{"role": "user", "content": ${JSON.stringify(englishPrompt)}}],
        "temperature": 0.7
      }'`).toString();
    
    const englishResponse = JSON.parse(englishContent);
    const englishArticle = englishResponse.choices[0].message.content.trim();
    
    // Extract title from the markdown
    const englishTitleMatch = englishArticle.match(/^# (.*?)$/m);
    const englishTitle = englishTitleMatch ? englishTitleMatch[1] : topic;
    
    // Generate excerpt
    const englishExcerptPrompt = `
      Write a witty, intriguing one-sentence excerpt (max 100 characters) for an article titled "${englishTitle}".
      Make it fun and impossible to resist clicking - like a good tweet that makes you curious.
    `;
    
    const englishExcerptContent = execSync(`curl -s https://api.openai.com/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${OPENAI_API_KEY}" \
      -d '{
        "model": "gpt-4",
        "messages": [{"role": "user", "content": ${JSON.stringify(englishExcerptPrompt)}}],
        "temperature": 0.7
      }'`).toString();
    
    const englishExcerptResponse = JSON.parse(englishExcerptContent);
    const englishExcerpt = englishExcerptResponse.choices[0].message.content.trim();
    
    // Generate French version
    const frenchPrompt = `
      Translate the following English tech article into French. Maintain the same markdown formatting,
      code examples, and structure. Ensure the translation is natural and fluent, not literal.
      
      ${englishArticle}
    `;
    
    const frenchContent = execSync(`curl -s https://api.openai.com/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${OPENAI_API_KEY}" \
      -d '{
        "model": "gpt-4",
        "messages": [{"role": "user", "content": ${JSON.stringify(frenchPrompt)}}],
        "temperature": 0.7
      }'`).toString();
    
    const frenchResponse = JSON.parse(frenchContent);
    const frenchArticle = frenchResponse.choices[0].message.content.trim();
    
    // Extract French title
    const frenchTitleMatch = frenchArticle.match(/^# (.*?)$/m);
    const frenchTitle = frenchTitleMatch ? frenchTitleMatch[1] : `${englishTitle} (FR)`;
    
    // Generate French excerpt
    const frenchExcerptPrompt = `
      Translate the following English excerpt into French. Ensure the translation is natural and engaging:
      
      "${englishExcerpt}"
    `;
    
    const frenchExcerptContent = execSync(`curl -s https://api.openai.com/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${OPENAI_API_KEY}" \
      -d '{
        "model": "gpt-4",
        "messages": [{"role": "user", "content": ${JSON.stringify(frenchExcerptPrompt)}}],
        "temperature": 0.7
      }'`).toString();
    
    const frenchExcerptResponse = JSON.parse(frenchExcerptContent);
    const frenchExcerpt = frenchExcerptResponse.choices[0].message.content.trim();
    
    // Generate tags based on content
    const englishTags = generateTags(englishArticle);
    
    // Translate tags to French
    const frenchTagsPrompt = `
      Translate the following technical terms into French. Keep them short and concise:
      
      ${englishTags.join(', ')}
    `;
    
    const frenchTagsContent = execSync(`curl -s https://api.openai.com/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${OPENAI_API_KEY}" \
      -d '{
        "model": "gpt-4",
        "messages": [{"role": "user", "content": ${JSON.stringify(frenchTagsPrompt)}}],
        "temperature": 0.7
      }'`).toString();
    
    const frenchTagsResponse = JSON.parse(frenchTagsContent);
    const frenchTags = frenchTagsResponse.choices[0].message.content
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    return {
      slug: generateSlug(englishTitle),
      date: formatDate(new Date()),
      en: {
        title: englishTitle,
        excerpt: englishExcerpt,
        content: englishArticle,
        tags: englishTags
      },
      fr: {
        title: frenchTitle,
        excerpt: frenchExcerpt,
        content: frenchArticle,
        tags: frenchTags
      }
    };
    
  } catch (error) {
    console.error('Error generating article:', error);
    process.exit(1);
  }
}

async function addArticleToFile(article) {
  try {
    // Read the current lunchReads.js file
    const fileContent = fs.readFileSync(CONTENT_PATH, 'utf8');
    
    // Parse the content to extract the lunchReads object
    const lunchReadsMatch = fileContent.match(/export const lunchReads = {([^]*?)};/);
    if (!lunchReadsMatch) {
      throw new Error('Could not parse lunchReads.js file');
    }
    
    // Create the new article entry
    const newArticleEntry = `
  '${article.slug}': {
    fr: {
      title: "${article.fr.title.replace(/"/g, '\\"')}",
      date: '${article.date}',
      tags: [${article.fr.tags.map(tag => `'${tag.replace(/'/g, "\\'")}'`).join(', ')}],
      excerpt: "${article.fr.excerpt.replace(/"/g, '\\"')}",
      content: \`
${article.fr.content}
\`,
    },
    en: {
      title: "${article.en.title.replace(/"/g, '\\"')}",
      date: '${article.date}',
      tags: [${article.en.tags.map(tag => `'${tag.replace(/'/g, "\\'")}'`).join(', ')}],
      excerpt: "${article.en.excerpt.replace(/"/g, '\\"')}",
      content: \`
${article.en.content}
\`,
    }
  },`;
    
    // Insert the new article at the beginning of the lunchReads object
    const updatedContent = fileContent.replace(
      'export const lunchReads = {',
      'export const lunchReads = {' + newArticleEntry
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(CONTENT_PATH, updatedContent);
    
    console.log(`Successfully added new article: ${article.en.title}`);
    return true;
  } catch (error) {
    console.error('Error adding article to file:', error);
    return false;
  }
}

// Main function
async function main() {
  try {
    const topic = getRandomTopic();
    const article = await generateArticle(topic);
    const success = await addArticleToFile(article);
    
    if (success) {
      console.log('Lunch read article generated successfully!');
      process.exit(0);
    } else {
      console.error('Failed to generate lunch read article');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error in main function:', error);
    process.exit(1);
  }
}

// Run the script
main();
