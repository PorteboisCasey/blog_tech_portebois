#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// Generate a truncated hash for ID creation
function generateId(text) {
  return crypto.createHash('md5').update(text).digest('hex').substring(0, 8);
}

// Format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Get a future publish date (incrementing by day)
function getFutureDate(daysInFuture) {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);
  return formatDate(date);
}

// Array of diverse lunch read topics with titles and content
const lunchReadTopics = [
  {
    topic: "web-development",
    titleEn: "Modern Web Development Techniques for 2025",
    titleFr: "Techniques de développement web modernes pour 2025",
    contentEn: "Web development continues to evolve rapidly, with new frameworks, tools, and methodologies emerging regularly. In this lunch read, we explore the most promising web development techniques for 2025, including server components, edge computing, and AI-assisted coding. We'll discuss how these approaches are changing the developer experience and improving application performance.",
    contentFr: "Le développement web continue d'évoluer rapidement, avec de nouveaux frameworks, outils et méthodologies qui émergent régulièrement. Dans cette lecture de midi, nous explorons les techniques de développement web les plus prometteuses pour 2025, notamment les composants serveur, l'informatique en périphérie et le codage assisté par IA. Nous verrons comment ces approches transforment l'expérience des développeurs et améliorent les performances des applications."
  },
  {
    topic: "cloud-native",
    titleEn: "Building Resilient Applications with Cloud-Native Principles",
    titleFr: "Développer des applications résilientes avec les principes cloud-native",
    contentEn: "Cloud-native development focuses on building applications that fully embrace the advantages of cloud computing. This lunch read covers key principles like immutable infrastructure, distributed systems design, and observability patterns. Learn how these concepts can help you create systems that scale efficiently and recover gracefully from failures.",
    contentFr: "Le développement cloud-native se concentre sur la création d'applications qui exploitent pleinement les avantages du cloud computing. Cette lecture de midi couvre des principes clés comme l'infrastructure immuable, la conception de systèmes distribués et les modèles d'observabilité. Découvrez comment ces concepts peuvent vous aider à créer des systèmes qui s'adaptent efficacement et se remettent gracieusement des pannes."
  },
  {
    topic: "ai-ethics",
    titleEn: "Ethical Considerations in AI Development",
    titleFr: "Considérations éthiques dans le développement de l'IA",
    contentEn: "As AI becomes more integrated into software development, ethical considerations are increasingly important. This lunch read explores issues like algorithmic bias, transparency, privacy, and responsible AI governance. We'll examine frameworks for ethical AI development and provide practical guidance for implementing these principles in your projects.",
    contentFr: "Alors que l'IA s'intègre davantage dans le développement logiciel, les considérations éthiques deviennent de plus en plus importantes. Cette lecture de midi explore des questions comme les biais algorithmiques, la transparence, la confidentialité et la gouvernance responsable de l'IA. Nous examinerons des cadres pour le développement éthique de l'IA et fournirons des conseils pratiques pour mettre en œuvre ces principes dans vos projets."
  },
  {
    topic: "devops",
    titleEn: "DevOps Practices for Continuous Improvement",
    titleFr: "Pratiques DevOps pour l'amélioration continue",
    contentEn: "DevOps culture emphasizes collaboration, automation, and continuous improvement. This lunch read examines advanced DevOps practices like GitOps, chaos engineering, and progressive delivery. Learn how these approaches can streamline your development pipeline and improve both system reliability and team productivity.",
    contentFr: "La culture DevOps met l'accent sur la collaboration, l'automatisation et l'amélioration continue. Cette lecture de midi examine des pratiques DevOps avancées comme GitOps, l'ingénierie du chaos et la livraison progressive. Découvrez comment ces approches peuvent rationaliser votre pipeline de développement et améliorer à la fois la fiabilité du système et la productivité de l'équipe."
  },
  {
    topic: "microservices",
    titleEn: "Microservices Architecture: Benefits and Challenges",
    titleFr: "Architecture de microservices : avantages et défis",
    contentEn: "Microservices architecture continues to be a popular approach for building complex, scalable applications. This lunch read discusses the latest patterns for implementing microservices, including service meshes, API gateways, and event-driven architectures. We'll also explore common challenges and strategies for mitigating them.",
    contentFr: "L'architecture de microservices continue d'être une approche populaire pour créer des applications complexes et évolutives. Cette lecture de midi aborde les derniers modèles d'implémentation des microservices, y compris les maillages de services, les passerelles API et les architectures pilotées par événements. Nous explorerons également les défis courants et les stratégies pour les atténuer."
  },
  {
    topic: "security",
    titleEn: "Securing Modern Applications: Beyond the Basics",
    titleFr: "Sécuriser les applications modernes : au-delà des bases",
    contentEn: "Application security is a critical concern as threats continue to evolve. This lunch read covers advanced security strategies like zero-trust architecture, supply chain security, and threat modeling. Learn how to integrate security throughout your development lifecycle and build systems that are secure by design.",
    contentFr: "La sécurité des applications est une préoccupation essentielle à mesure que les menaces continuent d'évoluer. Cette lecture de midi couvre des stratégies de sécurité avancées comme l'architecture zéro confiance, la sécurité de la chaîne d'approvisionnement et la modélisation des menaces. Apprenez à intégrer la sécurité tout au long de votre cycle de développement et à créer des systèmes sécurisés dès leur conception."
  },
  {
    topic: "performance",
    titleEn: "Web Performance Optimization Strategies",
    titleFr: "Stratégies d'optimisation des performances web",
    contentEn: "Performance remains a key factor in user experience and business success. This lunch read explores cutting-edge performance optimization techniques including Core Web Vitals, resource prioritization, and modern image formats. Discover tools and methodologies for measuring, analyzing, and improving your application's performance.",
    contentFr: "La performance reste un facteur clé dans l'expérience utilisateur et le succès commercial. Cette lecture de midi explore des techniques d'optimisation des performances de pointe, notamment les Core Web Vitals, la priorisation des ressources et les formats d'image modernes. Découvrez des outils et des méthodologies pour mesurer, analyser et améliorer les performances de votre application."
  },
  {
    topic: "accessibility",
    titleEn: "Building Inclusive Applications: A Guide to Web Accessibility",
    titleFr: "Créer des applications inclusives : guide pour l'accessibilité web",
    contentEn: "Web accessibility ensures that applications can be used by everyone. This lunch read provides practical guidance on implementing WCAG guidelines, conducting accessibility audits, and adopting inclusive design principles. Learn how making your applications more accessible benefits all users and meets regulatory requirements.",
    contentFr: "L'accessibilité web garantit que les applications peuvent être utilisées par tous. Cette lecture de midi fournit des conseils pratiques sur la mise en œuvre des directives WCAG, la conduite d'audits d'accessibilité et l'adoption de principes de conception inclusive. Découvrez comment rendre vos applications plus accessibles profite à tous les utilisateurs et répond aux exigences réglementaires."
  },
  {
    topic: "api-design",
    titleEn: "Crafting Robust and Developer-Friendly APIs",
    titleFr: "Conception d'APIs robustes et conviviales pour les développeurs",
    contentEn: "Well-designed APIs are the foundation of modern software architecture. This lunch read explores principles for creating intuitive, scalable, and maintainable APIs. We'll cover topics like versioning strategies, documentation best practices, and patterns for error handling and rate limiting.",
    contentFr: "Des APIs bien conçues sont le fondement de l'architecture logicielle moderne. Cette lecture de midi explore les principes de création d'APIs intuitives, évolutives et maintenables. Nous aborderons des sujets comme les stratégies de versionnage, les meilleures pratiques de documentation et les modèles de gestion des erreurs et de limitation de débit."
  },
  {
    topic: "testing",
    titleEn: "Modern Testing Strategies for Complex Systems",
    titleFr: "Stratégies de test modernes pour systèmes complexes",
    contentEn: "Effective testing is essential for maintaining software quality as systems grow in complexity. This lunch read discusses advanced testing approaches including property-based testing, contract testing, and testing in production. Learn how to build a comprehensive testing strategy that increases confidence in your code while optimizing development speed.",
    contentFr: "Des tests efficaces sont essentiels pour maintenir la qualité des logiciels à mesure que les systèmes deviennent plus complexes. Cette lecture de midi aborde des approches de test avancées, notamment les tests basés sur les propriétés, les tests de contrat et les tests en production. Apprenez à élaborer une stratégie de test complète qui augmente la confiance dans votre code tout en optimisant la vitesse de développement."
  },
  {
    topic: "frontend-frameworks",
    titleEn: "Comparing Modern Frontend Frameworks in 2025",
    titleFr: "Comparaison des frameworks frontend modernes en 2025",
    contentEn: "The frontend framework landscape continues to evolve with innovations in performance, developer experience, and architectural patterns. This lunch read provides an up-to-date comparison of leading frameworks including React, Angular, Vue, and emerging alternatives. We'll examine their strengths, weaknesses, and ideal use cases to help you make informed decisions.",
    contentFr: "Le paysage des frameworks frontend continue d'évoluer avec des innovations en matière de performance, d'expérience développeur et de modèles architecturaux. Cette lecture de midi fournit une comparaison à jour des frameworks leaders, notamment React, Angular, Vue, et des alternatives émergentes. Nous examinerons leurs forces, leurs faiblesses et leurs cas d'utilisation idéaux pour vous aider à prendre des décisions éclairées."
  },
  {
    topic: "database-patterns",
    titleEn: "Modern Database Patterns for Scalable Applications",
    titleFr: "Modèles de bases de données modernes pour applications évolutives",
    contentEn: "Database technology continues to diversify to meet varied application requirements. This lunch read explores patterns like CQRS, event sourcing, and polyglot persistence. Learn how to choose the right database technology for your specific needs and implement patterns that support scalability, performance, and data integrity.",
    contentFr: "La technologie des bases de données continue de se diversifier pour répondre aux exigences variées des applications. Cette lecture de midi explore des modèles comme CQRS, l'event sourcing et la persistance polyglotte. Apprenez à choisir la bonne technologie de base de données pour vos besoins spécifiques et à implémenter des modèles qui soutiennent l'évolutivité, la performance et l'intégrité des données."
  },
  {
    topic: "serverless",
    titleEn: "Serverless Architecture: Patterns and Practices",
    titleFr: "Architecture serverless : modèles et pratiques",
    contentEn: "Serverless computing offers a way to build and run applications without managing infrastructure. This lunch read covers advanced serverless patterns, cold start mitigation strategies, and hybrid architectures. Discover how to leverage serverless effectively while addressing its limitations and optimizing for cost and performance.",
    contentFr: "L'informatique serverless offre un moyen de créer et d'exécuter des applications sans gérer l'infrastructure. Cette lecture de midi couvre des modèles serverless avancés, des stratégies d'atténuation des démarrages à froid et des architectures hybrides. Découvrez comment exploiter efficacement le serverless tout en abordant ses limitations et en optimisant les coûts et les performances."
  },
  {
    topic: "machine-learning",
    titleEn: "Unveiling the Magic: Practical Machine Learning for Developers",
    titleFr: "Dévoiler la magie : l'apprentissage automatique pratique pour développeurs",
    contentEn: "Machine learning is increasingly accessible to mainstream software developers. This lunch read provides an approachable introduction to implementing ML in your applications, focusing on practical use cases and available tools and libraries. Learn about model selection, training basics, and integration patterns that don't require a PhD in data science.",
    contentFr: "L'apprentissage automatique est de plus en plus accessible aux développeurs de logiciels grand public. Cette lecture de midi fournit une introduction accessible à la mise en œuvre de l'apprentissage automatique dans vos applications, en se concentrant sur des cas d'utilisation pratiques et des outils et bibliothèques disponibles. Apprenez la sélection de modèles, les bases de l'entraînement et des modèles d'intégration qui ne nécessitent pas un doctorat en science des données."
  },
  {
    topic: "code-quality",
    titleEn: "Building a Culture of Code Quality",
    titleFr: "Construire une culture de qualité du code",
    contentEn: "Maintaining high code quality is a team effort that requires both technical practices and cultural alignment. This lunch read explores approaches like code reviews, pair programming, and technical debt management. Learn how to foster a culture where quality is valued and continuous improvement becomes a natural part of your development process.",
    contentFr: "Maintenir une haute qualité de code est un effort d'équipe qui nécessite à la fois des pratiques techniques et un alignement culturel. Cette lecture de midi explore des approches comme les revues de code, la programmation en binôme et la gestion de la dette technique. Apprenez à favoriser une culture où la qualité est valorisée et l'amélioration continue devient une partie naturelle de votre processus de développement."
  }
];

// Expand the array to generate more lunch reads with variations
function expandLunchReads(baseTopics, targetCount = 100) {
  const expandedReads = [...baseTopics];
  
  // Add variations until we reach the target count
  while (expandedReads.length < targetCount) {
    // Pick a random topic to create a variation of
    const baseTopic = baseTopics[Math.floor(Math.random() * baseTopics.length)];
    
    // Create a variation with slightly modified title and content
    const variation = {
      ...baseTopic,
      topic: baseTopic.topic,
      titleEn: `${baseTopic.titleEn} - Part ${Math.floor(Math.random() * 5) + 2}`,
      titleFr: `${baseTopic.titleFr} - Partie ${Math.floor(Math.random() *

/**
 * generate100LunchReads.js
 * 
 * This script creates 100 hardcoded lunch reads with varied topics.
 * No API calls, just static content that can be exported to lunchReads.js
 */

const fs = require('fs');
const path = require('path');

// Generate a random ID for each lunch read
function generateId(title) {
  const base = title.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20);
  const randomSuffix = Math.random().toString(16).substring(2, 10);
  return `${base}-${randomSuffix}`;
}

// Format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Generate dates starting from tomorrow, one per entry
function generateDates(count) {
  const dates = [];
  const startDate = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i + 1);
    dates.push(formatDate(date));
  }
  
  return dates;
}

// 100 lunch reads with varied topics
const lunchReadTopics = [
  // Technology Tips
  {
    category: 'technology-tips',
    enTitle: 'Keyboard Shortcuts That Will Change Your Life',
    frTitle: 'Raccourcis Clavier Qui Changeront Votre Vie',
    enContent: `<h2>Save Time With These Essential Shortcuts</h2>
<p>Keyboard shortcuts might seem like a small optimization, but they can dramatically improve your productivity over time. Here are some universal shortcuts every developer should know:</p>
<ul>
  <li><strong>Ctrl+C, Ctrl+V, Ctrl+X:</strong> Copy, paste, and cut - the classics</li>
  <li><strong>Ctrl+Z, Ctrl+Y:</strong> Undo and redo changes</li>
  <li><strong>Ctrl+F:</strong> Find text in current document</li>
  <li><strong>Alt+Tab:</strong> Switch between applications</li>
  <li><strong>Ctrl+Shift+T:</strong> Reopen closed tabs in browsers and some editors</li>
</ul>
<p>Make a conscious effort to use these shortcuts for one week, and they'll become second nature, saving you hours of time in the long run.</p>`,
    frContent: `<h2>Gagnez du Temps Avec Ces Raccourcis Essentiels</h2>
<p>Les raccourcis clavier peuvent sembler être une petite optimisation, mais ils peuvent considérablement améliorer votre productivité au fil du temps. Voici quelques raccourcis universels que chaque développeur devrait connaître :</p>
<ul>
  <li><strong>Ctrl+C, Ctrl+V, Ctrl+X :</strong> Copier, coller et couper - les classiques</li>
  <li><strong>Ctrl+Z, Ctrl+Y :</strong> Annuler et rétablir les modifications</li>
  <li><strong>Ctrl+F :</strong> Rechercher du texte dans le document actuel</li>
  <li><strong>Alt+Tab :</strong> Basculer entre les applications</li>
  <li><strong>Ctrl+Shift+T :</strong> Rouvrir les onglets fermés dans les navigateurs et certains éditeurs</li>
</ul>
<p>Faites un effort conscient pour utiliser ces raccourcis pendant une semaine, et ils deviendront une seconde nature, vous faisant gagner des heures de temps à long terme.</p>`
  },
  {
    category: 'technology-tips',
    enTitle: 'Terminal Productivity Boosters',
    frTitle: 'Améliorez Votre Productivité en Terminal',
    enContent: `<h2>Command Line Tips for Faster Workflows</h2>
<p>The terminal is a powerful tool, and a few simple tricks can make you significantly more efficient:</p>
<ul>
  <li><strong>Up Arrow:</strong> Cycle through previous commands</li>
  <li><strong>Ctrl+R:</strong> Search command history</li>
  <li><strong>Tab completion:</strong> Type the start of a command or filename and press Tab</li>
  <li><strong>Ctrl+A / Ctrl+E:</strong> Move to beginning/end of line</li>
  <li><strong>Aliases:</strong> Create shortcuts for your most used commands</li>
</ul>
<p>Remember that investing time in learning the terminal pays dividends for your entire career.</p>`,
    frContent: `<h2>Astuces de Ligne de Commande pour des Flux de Travail Plus Rapides</h2>
<p>Le terminal est un outil puissant, et quelques astuces simples peuvent vous rendre beaucoup plus efficace :</p>
<ul>
  <li><strong>Flèche Haut :</strong> Parcourir les commandes précédentes</li>
  <li><strong>Ctrl+R :</strong> Rechercher dans l'historique des commandes</li>
  <li><strong>Complétion Tab :</strong> Tapez le début d'une commande ou d'un nom de fichier et appuyez sur Tab</li>
  <li><strong>Ctrl+A / Ctrl+E :</strong> Aller au début/fin de la ligne</li>
  <li><strong>Alias :</strong> Créez des raccourcis pour vos commandes les plus utilisées</li>
</ul>
<p>N'oubliez pas que le temps investi dans l'apprentissage du terminal rapporte des dividendes pour toute votre carrière.</p>`
  },
  {
    category: 'technology-tips',
    enTitle: 'Version Control Best Practices',
    frTitle: 'Meilleures Pratiques de Contrôle de Version',
    enContent: `<h2>Git Techniques Every Developer Should Know</h2>
<p>Version control is central to modern development. Here are some essential Git practices that will help you work more efficiently:</p>
<ul>
  <li><strong>Commit often:</strong> Small, focused commits are easier to understand and review</li>
  <li><strong>Write meaningful commit messages:</strong> They should explain why a change was made, not just what changed</li>
  <li><strong>Use branches:</strong> Never work directly on main/master for new features</li>
  <li><strong>Pull before pushing:</strong> Keep your local repository up-to-date</li>
  <li><strong>Learn interactive rebase:</strong> Clean up your commit history before sharing</li>
</ul>
<p>Good Git habits make collaboration smoother and can save your project when things go wrong.</p>`,
    frContent: `<h2>Techniques Git Que Tout Développeur Devrait Connaître</h2>
<p>Le contrôle de version est au cœur du développement moderne. Voici quelques pratiques Git essentielles qui vous aideront à travailler plus efficacement :</p>
<ul>
  <li><strong>Committez souvent :</strong> Les commits petits et ciblés sont plus faciles à comprendre et à réviser</li>
  <li><strong>Écrivez des messages de commit significatifs :</strong> Ils doivent expliquer pourquoi un changement a été fait, pas seulement ce qui a changé</li>
  <li><strong>Utilisez des branches :</strong> Ne travaillez jamais directement sur main/master pour de nouvelles fonctionnalités</li>
  <li><strong>Tirez avant de pousser :</strong> Gardez votre dépôt local à jour</li>
  <li><strong>Apprenez le rebase interactif :</strong> Nettoyez votre historique de commits avant de le partager</li>
</ul>
<p>De bonnes habitudes Git rendent la collaboration plus fluide et peuvent sauver votre projet en cas de problème.</p>`
  },
  {
    category: 'technology-tips',
    enTitle: 'Browser Developer Tools You Should Be Using',
    frTitle: 'Outils de Développement du Navigateur Que Vous Devriez Utiliser',
    enContent: `<h2>Beyond the Elements Tab</h2>
<p>Browser dev tools have evolved into powerful development environments. Here are some features you might not be using but should:</p>
<ul>
  <li><strong>Network throttling:</strong> Test site performance on slower connections</li>
  <li><strong>Performance profiling:</strong> Identify bottlenecks in your JavaScript</li>
  <li><strong>Local overrides:</strong> Edit production files locally for testing</li>
  <li><strong>Accessibility inspection:</strong> Ensure your site works for everyone</li>
  <li><strong>Console utilities:</strong> Use built-in functions like $() and $$() to simplify DOM selection</li>
</ul>
<p>Taking time to master these tools will dramatically improve your debugging efficiency.</p>`,
    frContent: `<h2>Au-delà de l'Onglet Éléments</h2>
<p>Les outils de développement des navigateurs ont évolué en de puissants environnements de développement. Voici quelques fonctionnalités que vous n'utilisez peut-être pas mais que vous devriez :</p>
<ul>
  <li><strong>Limitation de réseau :</strong> Testez les performances du site sur des connexions plus lentes</li>
  <li><strong>Profilage des performances :</strong> Identifiez les goulots d'étranglement dans votre JavaScript</li>
  <li><strong>Remplacements locaux :</strong> Modifiez localement les fichiers de production pour les tests</li>
  <li><strong>Inspection d'accessibilité :</strong> Assurez-vous que votre site fonctionne pour tout le monde</li>
  <li><strong>Utilitaires de console :</strong> Utilisez des fonctions intégrées comme $() et $$() pour simplifier la sélection DOM</li>
</ul>
<p>Prendre le temps de maîtriser ces outils améliorera considérablement votre efficacité de débogage.</p>`
  },
  {
    category: 'technology-tips',
    enTitle: 'VS Code Extensions That Boost Productivity',
    frTitle: 'Extensions VS Code Qui Augmentent la Productivité',
    enContent: `<h2>Must-Have Tools for Your Editor</h2>
<p>Visual Studio Code is already powerful, but these extensions can make you even more efficient:</p>
<ul>
  <li><strong>GitLens:</strong> Enhanced Git capabilities within VS Code</li>
  <li><strong>Prettier:</strong> Automatic code formatting</li>
  <li><strong>ESLint:</strong> Catch problems before runtime</li>
  <li><strong>Live Share:</strong> Real-time collaborative editing</li>
  <li><strong>REST Client:</strong> Make HTTP requests directly from your editor</li>
</ul>
<p>Choose extensions that solve real problems in your workflow rather than installing everything available.</p>`,
    frContent: `<h2>Outils Indispensables pour Votre Éditeur</h2>
<p>Visual Studio Code est déjà puissant, mais ces extensions peuvent vous rendre encore plus efficace :</p>
<ul>
  <li><strong>GitLens :</strong> Fonctionnalités Git améliorées dans VS Code</li>
  <li><strong>Prettier :</strong> Formatage automatique du code</li>
  <li><strong>ESLint :</strong> Détectez les problèmes avant l'exécution</li>
  <li><strong>Live Share :</strong> Édition collaborative en temps réel</li>
  <li><strong>REST Client :</strong> Effectuez des requêtes HTTP directement depuis votre éditeur</li>
</ul>
<p>Choisissez des extensions qui résolvent des problèmes réels dans votre flux de travail plutôt que d'installer tout ce qui est disponible.</p>`
  },
  
  // Programming Best Practices
  {
    category: 'programming-best-practices',
    enTitle: 'The Art of Writing Comments',
    frTitle: 'L\'Art d\'Écrire des Commentaires',
    enContent: `<h2>Comment on Why, Not What</h2>
<p>Good code comments can dramatically improve maintainability. Here are some principles to follow:</p>
<ul>
  <li><strong>Focus on why:</strong> Explain reasoning behind decisions, not what the code does</li>
  <li><strong>Document non-obvious behavior:</strong> If something isn't intuitive, explain it</li>
  <li><strong>Keep comments updated:</strong> Outdated comments are worse than no comments</li>
  <li><strong>Use comments for TODOs:</strong> Mark areas needing future improvement</li>
  <li><strong>Avoid commenting out code:</strong> Delete it; you have version control</li>
</ul>
<p>Remember that the best code is self-documenting, with comments added only where they add clarity.</p>`,
    frContent: `<h2>Commentez le Pourquoi, Pas le Quoi</h2>
<p>De bons commentaires de code peuvent considérablement améliorer la maintenabilité. Voici quelques principes à suivre :</p>
<ul>
  <li><strong>Concentrez-vous sur le pourquoi :</strong> Expliquez le raisonnement derrière les décisions, pas ce que fait le code</li>
  <li><strong>Documentez les comportements non évidents :</strong> Si quelque chose n'est pas intuitif, expliquez-le</li>
  <li><strong>Gardez les commentaires à jour :</strong> Des commentaires obsolètes sont pires que pas de commentaires</li>
  <li><strong>Utilisez les commentaires pour les TODOs :</strong> Marquez les zones nécessitant des améliorations futures</li>
  <li><strong>Évitez de commenter du code :</strong> Supprimez-le; vous avez le contrôle de version</li>
</ul>
<p>N'oubliez pas que le meilleur code est auto-documenté, avec des commentaires ajoutés uniquement lorsqu'ils apportent de la clarté.</p>`
  },
  {
    category: 'programming-best-practices',
    enTitle: 'Function Length: How Small Is Too Small?',
    frTitle: 'Longueur des Fonctions : Quand Est-ce Trop Court ?',
    enContent: `<h2>Finding the Right Balance</h2>
<p>There's often a push to make functions as small as possible, but there are trade-offs to consider:</p>
<ul>
  <li><strong>Small functions are testable:</strong> They usually do one thing well</li>
  <li><strong>Extreme decomposition:</strong> Can lead to "function ping-pong" making code hard to follow</li>
  <li><strong>Context switching:</strong> Too many tiny functions can increase mental load</li>
  <li><strong>

