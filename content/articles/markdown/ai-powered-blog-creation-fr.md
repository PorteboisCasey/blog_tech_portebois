# Code en pyjama : mon duel épique contre GPT-4 pour dominer l'art du prompt

![IA vs Café](https://source.unsplash.com/800x600/?robot,coffee)
*Mon nouveau collègue de travail - il carbure aux terawatts mais snobe mon café*
## Le pari fou : coder un blog tech avec 80% d'IA
Tout commence un dimanche pluvieux, armé uniquement de mon pyjama licorne et d'une folle ambition : 

- Next.js 15° (le framework qui chauffe plus que mon micro-ondes)
- Internationalisation
- Dark mode
- Système de contenu Markdown
- ...et zéro caféine
Mais comment ? En recrutant GPT-4 comme stagiaire virtuel ! 

### Acte I : Le framework ou l'art de dompter le chaos

```javascript
// Mon premier prompt sérieux
const initialPrompt = `
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
`;
```
**Réussite relative** : La base tient debout... mais le dark mode rivalise avec les néons d'une boîte nightcore. 
Leçon n°1 : En I## Acte II : Le piège des prompts fourre-tout

### Séquence cringe : le menu licorne
**Prompt naïf :** "Crée-moi un composant Navbar stylé"

**Résultat :** Une navbar rose fluo peuplée de licornes clignotantes. Mon portfolio ressemblait à la chambre d'une ado de 2005 sur Myspace.

### Prompt sauvé par le contexte
```javascript
const navbarPrompt = `
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
`;
```

**Résultat :** Un composant sobre qui ne ferait pas rougir un CTO. Crisis avoided 🎉

## Acte III : L'équilibre subtil du contrôle créatif
### Exemple de prompt équilibré
```javascript
const markdownPrompt = `
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
`;
```
**Bonus inattendu :** L'IA a glissé un système de cache malin. Mon côté flemmard lui dit merci, mon ego de dev murmure "J'aurais pu y penser..." 😤

## Les 10 commandements du dialogue homme-machine (version abrégée)

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

```javascript
const finalPhilosophy = `
Tu es mon assistant IA. Ton rôle :

1. Proposer des solutions innovantes MAIS
2. Expliquer les trade-offs techniques
3. Rester dans le scope du projet
4. Challenger mes mauvaises idées
5. Apprendre de nos interactions passées

En échange : je te promets de ne jamais t'envoyer de prompt flou du genre 
"ça marche pas, fix it" à 2h du matin.
`;
```

Maintenant si vous m'excusez, j'ai un date avec un GPT-6 qui veut réécrire cet article...

