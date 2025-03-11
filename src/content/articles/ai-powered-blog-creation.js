export const article = {
  fr: {
    title: "Comment j'ai codé ce blog en pyjama avec l'IA (sans finir esclave de mes propres prompts)",
    date: '2025-03-10',
    tags: ['IA', 'Prompt Engineering', 'Humour', 'Next.js'],
    excerpt: "L'histoire vraie d'un développeur qui a presque réussi à dompter GPT-4 pour coder son blog... et ce qu'il a appris en chemin.",
    content: `
# Comment j'ai codé ce blog en pyjama avec l'IA (sans finir esclave de mes propres prompts)

![IA vs Café](https://source.unsplash.com/800x600/?robot,coffee)
*Mon nouveau collègue de travail - il ne boit pas mon café mais consomme des terawatts*

## Le pari fou : coder un blog tech avec 80% d'IA

Tout commence un dimanche pluvieux. Objectif : créer un blog moderne avec :

- Next.js 15°
- Internationalisation
- Dark mode
- Système de contenu Markdown
- ...et zéro caféine

Mais comment ? En transformant GPT-4 en colloc codeur !

### Prompt #1 - Le framework de base

\`\`\`javascript
// Mon premier prompt sérieux
const initialPrompt = \`
Tu es un expert Next.js avec 10 ans d'expérience.
Génère une structure de projet pour un blog tech avec :

1. Routing app avec pages statiques
2. Internationalisation (fr/en) avec contexte React
3. Système de thème (light/dark) persistant
4. Système de contenu avec Markdown dans /content
5. Composants réutilisables (Navbar, ArticleCard)

Exigeances :
- Utilise TypeScript et Tailwind
- Fichiers de configuration prêts pour Vite
- Structure de dossier professionnelle
- Évite tout code inutile

Format de réponse : 
- Arborescence de fichiers
- Code pour les fichiers principaux
- Pas d'explications superflues
\`;
\`\`\`

**Réussite** : J'obtiens une base solide... mais le dark mode s'affiche en violet fluo. Lesson learned : spécifier les couleurs.

## Le piège des prompts trop vagues

### Prompt raté #1
"Crée-moi un composant Navbar stylé"

Résultat : Une navbar rose bonbon avec des emojis de licorne. Mon côté "professional" pleure.

### Prompt sauvé par le contexte
\`\`\`javascript
const navbarPrompt = \`
Génère une Navbar Next.js avec :

1. Logo cliquable
2. Menu responsive (burger mobile)
3. Sélecteur de langue fr/en
4. Toggle dark/light mode
5. Style Tailwind sobre (pas de couleurs flashy)

Contraintes techniques :
- Utilitaire clsx pour les classes conditionnelles
- Icônes depuis Heroicons
- Accessibilité ARIA
- TypeScript strict

Fournis aussi :
- Les types pour les props
- La logique de toggle dans un contexte séparé
- Un fichier de configuration pour les couleurs des thèmes
\`;
\`\`\`

**Résultat** : Un composant clean avec gestion d'état propre. Crisis avoided.

## La danse subtile du contrôle créatif

### Exemple de prompt équilibré
\`\`\`javascript
const markdownPrompt = \`
Écris un parser Markdown en TS avec :

- Support des blocs de code avec highlight
- Transformation des images en composants Next/Image
- Détection automatique des liens externes (target=_blank)
- Temps de lecture estimé

Mais... 

1. Utilite marked.js au lieu de remark pour des raisons perf
2. Garde les dépendances minimales
3. Évite tout comportement asynchrone
4. Fournis des tests unitaires basiques

Style de code :
- Préfère les fonctions pures
- Documentation JSDoc concise
- Gestion d'erreur élégante
\`;
\`\`\`

**Bonus** : L'IA a ajouté un système de cache intelligent que je n'avais pas demandé... mais dont je ne peux plus me passer.

## Les 5 commandements du prompt engineering maîtrisé

1. **Contextualisation ferroviaire**  
   "Tu es un senior Next.js dev chez Vercel, expert en perf et accessibilité"

2. **Contraintes créatives**  
   "Le composant doit fonctionner sans JS mais profiter de l'hydration"

3. **Anti-dérive syntaxique**  
   "Utilise TypeScript strict avec tsconfig recommended, pas de 'any'"

4. **Comparaison dialectique**  
   "Présente 2 solutions : une optimisée en perf, une en DX. Compare les"

5. **Auto-critique**  
   "Quelles sont les faiblesses de cette approche ? Comment les corriger ?"

## Conclusion : Symbiose homme-machine

Après 42 itérations (et autant de tasses de café), le blog est live. Les stats :

- 92% de code IA-generated
- 100% de prompts méticuleusement craftés
- 0 crise existentielle (surprise)

Le secret ? Un prompt final magique :

\`\`\`javascript
const finalPhilosophy = \`
Tu es mon assistant IA. Ton rôle :

1. Proposer des solutions innovantes MAIS
2. Expliquer les trade-offs techniques
3. Rester dans le scope du projet
4. Challenger mes mauvaises idées
5. Apprendre de nos interactions passées

En échange : je te promets de ne jamais t'envoyer de prompt flou du genre 
"ça marche pas, fix it" à 2h du matin.
\`;
\`\`\`

Maintenant si vous m'excusez, j'ai un date avec un GPT-6 qui veut réécrire cet article...
`
  },
  en: {
    title: "How I Coded This Blog in Pajamas with AI (Without Becoming a Slave to My Own Prompts)",
    date: '2025-03-10',
    tags: ['AI', 'Prompt Engineering', 'Humor', 'Next.js'],
    excerpt: "The true story of a developer who almost succeeded in taming GPT-4 to code his blog... and what he learned along the way.",
    content: `
# How I Coded This Blog in Pajamas with AI (Without Becoming a Slave to My Own Prompts)

![AI vs Coffee](https://source.unsplash.com/800x600/?robot,coffee)
*My new coworker - doesn't drink my coffee but consumes terawatts*

## The Crazy Bet: Coding a Tech Blog with 80% AI

It all starts on a rainy Sunday. Goal: create a modern blog with:

- Next.js 15
- Internationalization
- Dark mode
- Markdown content system
- ...and zero caffeine

But how? By turning GPT-4 into a coding roommate!

### Prompt #1 - The Base Framework

\`\`\`javascript
// My first serious prompt
const initialPrompt = \`
You're a Next.js expert with 10 years of experience.
Generate a project structure for a tech blog with:

1. App router with static pages
2. Internationalization (fr/en) with React context
3. Persistent theme system (light/dark)
4. Markdown content system in /content
5. Reusable components (Navbar, ArticleCard)

Requirements:
- Use TypeScript and Tailwind
- Configuration files ready for Vite
- Professional folder structure
- Avoid unnecessary code

Response format:
- File tree structure
- Code for main files
- No fluff explanations
\`;
\`\`\`

**Success**: I get a solid base... but dark mode displays neon purple. Lesson learned: specify colors.

## The Trap of Vague Prompts

### Failed Prompt #1
"Create a styled Navbar component"

Result: A candy pink navbar with unicorn emojis. My "professional" side cries.

### Context-Saved Prompt
\`\`\`javascript
const navbarPrompt = \`
Generate a Next.js Navbar with:

1. Clickable logo
2. Responsive menu (mobile burger)
3. Language selector fr/en
4. Dark/light mode toggle
5. Sober Tailwind styling (no flashy colors)

Technical constraints:
- Use clsx utility for conditional classes
- Icons from Heroicons
- ARIA accessibility
- Strict TypeScript

Also provide:
- Props types
- Toggle logic in separate context
- Theme color config file
\`;
\`\`\`

**Result**: A clean component with proper state management. Crisis avoided.

## The Subtle Dance of Creative Control

### Balanced Prompt Example
\`\`\`javascript
const markdownPrompt = \`
Write a TS Markdown parser with:

- Code block highlighting
- Image transformation to Next/Image components
- Automatic external link detection (target=_blank)
- Estimated reading time

But...

1. Use marked.js instead of remark for perf reasons
2. Keep dependencies minimal
3. Avoid async behavior
4. Provide basic unit tests

Code style:
- Prefer pure functions
- Concise JSDoc documentation
- Elegant error handling
\`;
\`\`\`

**Bonus**: The AI added a smart cache system I didn't ask for... but now can't live without.

## The 5 Commandments of Controlled Prompt Engineering

1. **Railroad Contextualization**  
   "You're a senior Next.js dev at Vercel, expert in perf and accessibility"

2. **Creative Constraints**  
   "Component must work without JS but benefit from hydration"

3. **Syntax Drift Prevention**  
   "Use strict TypeScript with recommended tsconfig, no 'any'"

4. **Dialectical Comparison**  
   "Present 2 solutions: one perf-optimized, one DX-optimized. Compare them"

5. **Self-Critique**  
   "What are the weaknesses of this approach? How to fix them?"

## Conclusion: Human-Machine Symbiosis

After 42 iterations (and as many coffee cups), the blog is live. Stats:

- 92% AI-generated code
- 100% meticulously crafted prompts
- 0 existential crisis (surprise)

The secret? A final magic prompt:

\`\`\`javascript
const finalPhilosophy = \`
You're my AI assistant. Your role:

1. Propose innovative solutions BUT
2. Explain technical trade-offs
3. Stay within project scope
4. Challenge my bad ideas
5. Learn from our past interactions

In exchange: I promise to never send you vague prompts like
"it's broken, fix it" at 2am.
\`;
\`\`\`

Now if you'll excuse me, I have a date with a GPT-6 that wants to rewrite this article...
`
  }
};
