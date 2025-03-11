// articlesData.js - Simplified article data without template literals or markdown
export const articles = {
  article1: {
    en: {
      id: "article1",
      title: "Getting Started with React",
      date: "2023-01-15",
      author: "Jane Doe",
      category: "React",
      tags: ["react", "javascript", "frontend"],
      image: "/images/react-intro.jpg",
      summary: "An introduction to building applications with React",
      content: "React is a popular JavaScript library for building user interfaces. Created by Facebook, it allows developers to create reusable UI components and efficiently update the DOM when data changes. This article covers the basics of React including components, props, and state management."
    },
    fr: {
      id: "article1",
      title: "Débuter avec React",
      date: "2023-01-15",
      author: "Jane Doe",
      category: "React",
      tags: ["react", "javascript", "frontend"],
      image: "/images/react-intro.jpg",
      summary: "Une introduction à la création d'applications avec React",
      content: "React est une bibliothèque JavaScript populaire pour construire des interfaces utilisateur. Créée par Facebook, elle permet aux développeurs de créer des composants d'interface utilisateur réutilisables et de mettre à jour efficacement le DOM lorsque les données changent. Cet article couvre les bases de React, notamment les composants, les props et la gestion de l'état."
    }
  },
  'ai-blog-creation': {
    en: {
      id: "ai-blog-creation",
      title: "From Zero to Blog Hero: Building This Entire Site with AI",
      date: "2023-06-15",
      author: "AI Enthusiast",
      category: "Artificial Intelligence",
      tags: ["AI", "web development", "prompt engineering", "blogging"],
      image: "/images/ai-blog-creation.jpg",
      summary: "The technical (and hilarious) journey of creating a full-featured blog using AI tools",
      content: "# From Zero to Blog Hero: Building This Entire Site with AI\n\nSo there I was, staring at a blank screen, armed with nothing but a vague idea and an internet connection. \"I need a blog,\" I thought, \"but I don't want to spend weeks coding it.\" Enter the AI revolution!\n\n## Wait, You Used AI to Build an *Entire* Blog? 🤖\n\nYep, every pixel, function, and semicolon on this site came from my dance with various AI tools. But don't get it twisted – this wasn't just me typing \"make me a blog\" and calling it a day. As they say: with great AI power comes great responsibility to know what the heck you're doing.\n\n## The Technical Nitty-Gritty (Without the Snooze Factor)\n\nHere's what went down behind the scenes:\n\n1. **Architecture Planning**: I fed detailed requirements to AI about React component structures, state management patterns, and responsive design principles. The AI suggested a clean separation of concerns with reusable components.\n\n2. **Code Generation**: Each component, from the navigation bar to the article cards, was AI-generated based on specific prompts that included accessibility requirements and performance considerations.\n\n3. **Data Modeling**: The article data structure you're seeing now? That was a collaborative effort where I described entity relationships and the AI proposed JSON schemas.\n\n4. **Styling Solutions**: I told the AI I wanted a \"modern minimalist vibe with a dash of personality\" and it generated CSS that didn't make my eyes bleed!\n\n## The Secret Sauce: Prompt Engineering\n\nThe magic wasn't in the AI – it was in how I talked to it. Some of my favorite prompts included:\n\n- \"Create a React article component that handles markdown content with syntax highlighting, estimated reading time, and responsive images.\"\n\n- \"Refactor this navigation component to improve performance by implementing memoization and reducing re-renders.\"\n\n- \"Debug this state management issue where articles aren't filtering correctly when changing language preference.\"\n\nEach prompt was specific, technically detailed, and included context about adjacent components.\n\n## Security: Not Just an Afterthought\n\nAI-generated code isn't automatically secure code. I conducted thorough reviews for:\n\n- XSS vulnerabilities in the markdown renderer\n- Proper handling of user input\n- Sanitization of data from external sources\n\nRemember: The AI is your co-pilot, not your security auditor!\n\n## The Hard Lessons (AKA: What Went Hilariously Wrong)\n\nLet's just say there was that one time the AI enthusiastically created a beautiful image carousel that worked perfectly... except it loaded all images at full resolution simultaneously, nearly melting my laptop. Oops.\n\nAnother time, I asked for \"optimized mobile navigation\" and received a hamburger menu that, when clicked, animated like it was having a seizure before flinging menu items across the screen like digital confetti.\n\n## Could You Do This Too? Absolutely!\n\nWhile I did leverage AI for code generation, the success came from my understanding of web development principles, security considerations, and user experience design. The AI was the paintbrush, not the artist.\n\nTo embark on your own AI-powered development journey:\n\n1. Start with a clear architecture in mind\n2. Break requirements into specific, technical prompts\n3. Always review and test the generated code\n4. Understand fundamentals so you can spot and fix issues\n\n## The Bottom Line\n\nThis blog represents a new paradigm of development – human expertise augmented by AI assistance. It's faster, more efficient, and honestly, way more fun than traditional coding alone.\n\nSo yes, AI built this blog, but with a human firmly at the helm, steering the ship through the occasional sea of nonsensical code and bizarre styling suggestions.\n\nNow if you'll excuse me, I need to go prompt an AI to help me write my next article – about using AI to write articles about using AI. (Too meta? Never!)"
    },
    fr: {
      id: "ai-blog-creation",
      title: "De Zéro à Héros du Blog : Construction de ce Site avec l'IA",
      date: "2023-06-15",
      author: "Enthousiaste de l'IA",
      category: "Intelligence Artificielle",
      tags: ["IA", "développement web", "ingénierie de prompts", "blogging"],
      image: "/images/ai-blog-creation.jpg",
      summary: "Le voyage technique (et hilarant) de la création d'un blog complet utilisant des outils d'IA",
      content: "# De Zéro à Héros du Blog : Construction de ce Site avec l'IA\n\nJ'étais là, fixant un écran vide, armé seulement d'une vague idée et d'une connexion internet. \"J'ai besoin d'un blog,\" pensais-je, \"mais je ne veux pas passer des semaines à coder.\" Bienvenue dans la révolution de l'IA !\n\n## Attends, Tu as Utilisé l'IA pour Construire un *Entier* Blog ? 🤖\n\nOui, chaque pixel, fonction et point-virgule sur ce site provient de ma danse avec divers outils d'IA. Mais ne vous méprenez pas – ce n'était pas simplement moi tapant \"fais-moi un blog\" et considérant le travail terminé. Comme on dit : avec un grand pouvoir d'IA vient une grande responsabilité de savoir ce que vous faites.\n\n## Les Détails Techniques (Sans l'Ennui)\n\nVoici ce qui s'est passé en coulisses :\n\n1. **Planification de l'Architecture** : J'ai fourni à l'IA des exigences détaillées concernant les structures de composants React, les modèles de gestion d'état et les principes de conception responsive. L'IA a suggéré une séparation claire des préoccupations avec des composants réutilisables.\n\n2. **Génération de Code** : Chaque composant, de la barre de navigation aux cartes d'articles, a été généré par l'IA en fonction de prompts spécifiques incluant des exigences d'accessibilité et des considérations de performance.\n\n3. **Modélisation des Données** : La structure de données des articles que vous voyez maintenant ? C'était un effort collaboratif où j'ai décrit les relations entre entités et l'IA a proposé des schémas JSON.\n\n4. **Solutions de Style** : J'ai dit à l'IA que je voulais une \"ambiance minimaliste moderne avec une touche de personnalité\" et elle a généré du CSS qui ne m'a pas fait saigner des yeux !\n\n## La Sauce Secrète : L'Ingénierie de Prompts\n\nLa magie n'était pas dans l'IA – c'était dans la façon dont je lui parlais. Certains de mes prompts préférés incluaient :\n\n- \"Crée un composant d'article React qui gère le contenu markdown avec coloration syntaxique, temps de lecture estimé et images responsive.\"\n\n- \"Refactorise ce composant de navigation pour améliorer les performances en implémentant la mémoïsation et en réduisant les re-rendus.\"\n\n- \"Débogue ce problème de gestion d'état où les articles ne se filtrent pas correctement lors du changement de préférence linguistique.\"\n\nChaque prompt était spécifique, techniquement détaillé, et incluait le contexte des composants adjacents.\n\n## Sécurité : Pas Juste une Réflexion Après-coup\n\nLe code généré par l'IA n'est pas automatiquement du code sécurisé. J'ai mené des examens approfondis pour :\n\n- Les vulnérabilités XSS dans le rendu markdown\n- La gestion appropriée des entrées utilisateur\n- La désinfection des données provenant de sources externes\n\nRappelez-vous : L'IA est votre copilote, pas votre auditeur de sécurité !\n\n## Les Leçons Difficiles (Ou : Ce Qui a Mal Tourné de Façon Hilarante)\n\nDisons simplement qu'il y a eu cette fois où l'IA a créé avec enthousiasme un magnifique carrousel d'images qui fonctionnait parfaitement... sauf qu'il chargeait toutes les images en pleine résolution simultanément, faisant presque fondre mon ordinateur portable. Oups.\n\nUne autre fois, j'ai demandé une \"navigation mobile optimisée\" et j'ai reçu un menu hamburger qui, lorsqu'il était cliqué, s'animait comme s'il avait une crise avant de projeter des éléments de menu à travers l'écran comme des confettis numériques.\n\n## Pourriez-vous Faire Cela Aussi ? Absolument !\n\nBien que j'aie utilisé l'IA pour la génération de code, le succès est venu de ma compréhension des principes de développement web, des considérations de sécurité et de la conception de l'expérience utilisateur. L'IA était le pinceau, pas l'artiste.\n\nPour vous lancer dans votre propre voyage de développement assisté par l'IA :\n\n1. Commencez avec une architecture claire en tête\n2. Décomposez les exigences en prompts spécifiques et techniques\n3. Examinez et testez toujours le code généré\n4. Comprenez les fondamentaux pour pouvoir repérer et corriger les problèmes\n\n## La Conclusion\n\nCe blog représente un nouveau paradigme de développement – l'expertise humaine augmentée par l'assistance de l'IA. C'est plus rapide, plus efficace et, honnêtement, beaucoup plus amusant que le codage traditionnel seul.\n\nDonc oui, l'IA a construit ce blog, mais avec un humain fermement à la barre, dirigeant le navire à travers l'occasionnelle mer de code insensé et de suggestions de style bizarres.\n\nMaintenant, si vous voulez bien m'excuser, je dois aller demander à une IA de m'aider à écrire mon prochain article – sur l'utilisation de l'IA pour écrire des articles sur l'utilisation de l'IA. (Trop méta ? Jamais !)"
    }
  },
  'lunch-read-automation': {
    en: {
      title: "Lunch Read Automation: How I Optimized My Content Workflow",
      date: '2025-03-10',
      tags: ['Automation', 'AI', 'Node.js', 'Productivity'],
      excerpt: "How I automated the generation of lunch read content and why it transformed my workflow.",
      content: "# Lunch Read Automation: How I Optimized My Content Workflow\n\nAutomation in service of creativity\n\n## The Lunch Read Challenge\n\n\"Lunch Reads\" have become a popular feature on my tech blog. The concept is simple: offer short, engaging articles that readers can consume during their lunch break. But like any regular content, manual creation quickly became challenging.\n\nFaced with these constraints, I decided to explore how automation could help me maintain this section without sacrificing quality or my mental health.\n\n## The Solution: An Automated Lunch Read Generator\n\nI developed a Node.js script that fully automates the lunch read creation process.\n\n## The Results: Enhanced Efficiency and Creativity\n\nAutomating lunch reads has had several positive impacts including significant time savings and improved consistency.\n\n## Conclusion\n\nThe automation of lunch reads perfectly illustrates how AI can be used to enhance creative productivity."
    },
    fr: {
      title: "Automatisation des Lectures du Midi : Comment j'ai optimisé mon flux de contenu",
      date: '2025-03-10',
      tags: ['Automatisation', 'IA', 'Node.js', 'Productivité'],
      excerpt: "Comment j'ai automatisé la génération de contenu pour les lectures du midi et pourquoi cela a transformé mon workflow.",
      content: "# Automatisation des Lectures du Midi : Comment j'ai optimisé mon flux de contenu\n\nL'automatisation au service de la créativité\n\n## Le défi des lectures\n\nLes \"Lectures du Midi\" sont devenues une fonctionnalité populaire sur mon blog technique. Le concept est simple : offrir des articles courts et engageants que les lecteurs peuvent consommer pendant leur pause déjeuner. Mais comme tout contenu régulier, la création manuelle est rapidement devenue un défi.\n\nFace à ces contraintes, j'ai décidé d'explorer comment l'automatisation pourrait m'aider à maintenir cette section sans sacrifier la qualité ou ma santé mentale.\n\n## La solution : Un générateur automatisé de lectures du midi\n\nJ'ai développé un script Node.js qui automatise entièrement le processus de création des lectures du midi.\n\n## Les résultats : Efficacité et créativité améliorées\n\nL'automatisation des lectures du midi a eu plusieurs impacts positifs, notamment un gain de temps significatif et une meilleure cohérence.\n\n## Conclusion\n\nL'automatisation des lectures du midi illustre parfaitement comment l'IA peut être utilisée pour améliorer la productivité créative."
    }
  }
};

// Helper functions for article management
export const getArticleById = (id) => {
  return articles[id] || null;
};

export const getAllArticles = () => {
  return Object.values(articles);
};

export const getArticlesByCategory = (category, language = 'en') => {
  return Object.values(articles).filter(article => 
    article[language]?.category?.toLowerCase() === category.toLowerCase());
};

export const getArticlesByTag = (tag, language = 'en') => {
  return Object.values(articles).filter(article => 
    article[language]?.tags?.includes(tag.toLowerCase()));
};

