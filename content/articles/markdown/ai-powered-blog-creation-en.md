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

```javascript
// My first serious prompt
const initialPrompt = `
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
`;
```

**Success**: I get a solid base... but dark mode displays neon purple. Lesson learned: specify colors.

## The Trap of Vague Prompts

### Failed Prompt #1
"Create a styled Navbar component"

Result: A candy pink navbar with unicorn emojis. My "professional" side cries.

### Context-Saved Prompt
```javascript
const navbarPrompt = `
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
`;
```

**Result**: A clean component with proper state management. Crisis avoided.

## The Subtle Dance of Creative Control

### Balanced Prompt Example
```javascript
const markdownPrompt = `
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
`;
```

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

```javascript
const finalPhilosophy = `
You're my AI assistant. Your role:

1. Propose innovative solutions BUT
2. Explain technical trade-offs
3. Stay within project scope
4. Challenge my bad ideas
5. Learn from our past interactions

In exchange: I promise to never send you vague prompts like
"it's broken, fix it" at 2am.
`;
```

Now if you'll excuse me, I have a date with a GPT-6 that wants to rewrite this article...

