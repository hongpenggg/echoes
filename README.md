# Echoes - Debate with Historical Figures

🎭 An interactive web application where users can engage in thoughtful debates and discussions with AI-powered historical figures, thinkers, and experts across various domains.

## Features

- **Diverse Thinkers**: Debate with 20 legendary minds across history:
  - **Ancient Era**: Socrates, Plato, Confucius, Julius Caesar, Sun Tzu
  - **Medieval & Renaissance**: Dante Alighieri, William Shakespeare
  - **Enlightenment**: Immanuel Kant, Adam Smith, Benjamin Franklin
  - **Romantic & Revolutionary**: Victor Hugo, Napoleon Bonaparte, Franklin D. Roosevelt
  - **Modern Era**: Friedrich Nietzsche, Ernest Hemingway, Albert Einstein, Sigmund Freud, Carl Jung, Ruth Bader Ginsburg, Alan Turing
- **📱 Fully Responsive**: Works seamlessly on phones, tablets, and desktops
- **Smart Filtering**: Filter thinkers by time period, topic, and name
- **AI-Powered Analysis**: Real-time debate performance tracking with:
  - Live argument summaries
  - Logical fallacy detection with improvement suggestions
  - Historical source citations
  - Performance scoring
- **Historical Context**: Learn about each thinker's background, era, and key contributions
- **Quick Debate Mode**: Jump into debates on 12 pre-selected topics with suggested opponents
- **Featured Challenges Carousel**: Rotating challenges from 8 different thinkers on the home page
- **Debate School**: Educational resource to master argumentation:
  - 8 debate tactics (Socratic Method, Steelmanning, Reductio ad Absurdum, etc.)
  - 12 logical fallacies with examples and counters
  - 9 winning tips for better debates
- **Results Dashboard**: Detailed performance metrics showing strengths and weaknesses

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI**: Tailwind CSS (responsive design, mobile-first)
- **Charts**: Recharts
- **AI**: OpenRouter API
- **Deployment**: GitHub Pages via GitHub Actions

## Responsive Design

Echoes is fully optimized for all devices:
- 📱 **Mobile phones** (320px+): Hamburger menu, collapsible panels, touch-optimized
- 📱 **Tablets** (768px+): Adaptive grid layouts, balanced spacing
- 💻 **Desktops** (1024px+): Full sidebar, multi-column grids, expanded content

See [RESPONSIVE_DESIGN.md](RESPONSIVE_DESIGN.md) for detailed responsive implementation.

## Setup Instructions

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- OpenRouter API key (free at [openrouter.ai](https://openrouter.ai/keys))

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/hongpenggg/echoes.git
   cd echoes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   VITE_OPENROUTER_API_KEY_1=your_openrouter_api_key_here
   ```

   Get your free API key from [OpenRouter](https://openrouter.ai/keys)

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   ```

## Deployment to GitHub Pages

The repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Add OpenRouter API Key to GitHub Secrets**
   - Go to your repository settings
   - Navigate to **Settings → Secrets and variables → Actions**
   - Add secret: `VITE_OPENROUTER_API_KEY_1`

2. **Enable GitHub Pages**
   - Go to **Settings → Pages**
   - Under **Source**, select **GitHub Actions**
   - Save

3. **Trigger Deployment**
   - Push to the `main` branch, or
   - Go to **Actions** tab and manually trigger the "Deploy to GitHub Pages" workflow

4. **Access Your App**
   - Once deployed, your app will be available at:
     `https://[your-username].github.io/echoes/`

## Featured Thinkers

### Philosophy
- **Socrates** (Ancient Greece) - The Socratic Method, ethics, virtue
- **Plato** (Ancient Greece) - Theory of Forms, Republic, metaphysics
- **Immanuel Kant** (Enlightenment) - Categorical imperative, pure reason, morality
- **Friedrich Nietzsche** (Modern) - Übermensch, will to power, existentialism
- **Confucius** (Ancient China) - Ren, li, filial piety, social harmony

### Literature & Arts
- **Dante Alighieri** (Medieval) - Divine Comedy, allegory, moral philosophy
- **William Shakespeare** (Renaissance) - Human nature, drama, tragedy and comedy
- **Victor Hugo** (Romantic) - Les Misérables, social justice, redemption
- **Ernest Hemingway** (Modern) - Minimalist prose, war, courage, authenticity

### Politics & Governance
- **Julius Caesar** (Ancient Rome) - Roman power, military strategy, leadership
- **Napoleon Bonaparte** (Revolutionary) - Empire building, Napoleonic Code, strategy
- **Franklin D. Roosevelt** (Modern) - New Deal, WWII leadership, progressive governance
- **Benjamin Franklin** (Revolutionary) - American independence, democracy, freedom

### Science & Psychology
- **Albert Einstein** (Modern) - Relativity, space-time, mysteries of the universe
- **Sigmund Freud** (Modern) - Psychoanalysis, unconscious mind, human behavior
- **Carl Jung** (Modern) - Analytical psychology, archetypes, collective unconscious
- **Alan Turing** (Modern) - Computing, artificial intelligence, Turing test

### Economics, Law & Strategy
- **Adam Smith** (Enlightenment) - Wealth of Nations, invisible hand, free markets
- **Ruth Bader Ginsburg** (Modern) - Gender equality, constitutional law, civil rights
- **Sun Tzu** (Ancient China) - Art of War, military strategy, tactics

## Quick Debate Topics (12 Total)

1. **The Morality of AI** - Technology debate with Alan Turing
2. **Universal Basic Income** - Economics with Adam Smith
3. **Stoicism in Modern Age** - Philosophy with Socrates
4. **Ethics of Gene Editing** - Science with Albert Einstein
5. **Art as Moral Force** - Literature with Victor Hugo
6. **Free Will vs Determinism** - Psychology with Sigmund Freud
7. **Democracy vs Authoritarianism** - Politics with Benjamin Franklin
8. **Just War Theory** - War with Sun Tzu
9. **Justice vs Mercy** - Law with Ruth Bader Ginsburg
10. **Meaning of Suffering** - Philosophy with Friedrich Nietzsche
11. **Leadership in Crisis** - Governance with Franklin D. Roosevelt
12. **Tragedy and Human Condition** - Literature with William Shakespeare

## Debate School Curriculum

### Tactics (8 Techniques)
- Socratic Method - Ask probing questions to expose contradictions
- Steelmanning - Present the strongest version of opposing arguments
- Reductio ad Absurdum - Show logical conclusions lead to absurdity
- Appeal to Principles - Ground arguments in universal values
- Burden of Proof - Shift responsibility for unfounded claims
- Analogy and Metaphor - Make abstract concepts concrete
- Concession and Counterattack - Acknowledge points while maintaining position
- Historical Precedent - Use past examples to support arguments

### Fallacies (12 Types)
- Ad Hominem, Straw Man, False Dichotomy, Appeal to Authority
- Slippery Slope, Circular Reasoning, Red Herring, Appeal to Emotion
- Hasty Generalization, Post Hoc, No True Scotsman, Tu Quoque

### Winning Tips (9 Strategies)
- Listen actively, define terms early, use evidence
- Stay calm and respectful, anticipate counterarguments
- Know when to concede, structure arguments clearly
- Ask clarifying questions, focus on core principles

## Mobile Features

### Phone Optimization
- Hamburger navigation menu
- Collapsible analysis panel (overlay)
- Touch-optimized buttons (44px minimum)
- Vertical stacking of content
- Readable text sizes without zoom
- Smooth animations and transitions

### Tablet Optimization
- Adaptive 2-column grids
- Balanced layout between mobile and desktop
- Both touch and mouse input support

### Desktop Optimization
- Fixed sidebar navigation
- Multi-column grids (up to 4 columns)
- Side-by-side analysis panel
- Hover effects and interactions
- Optimal use of screen real estate

## Project Structure

```
echoes/
├── components/          # React components
│   ├── DebateInterface.tsx    # Main debate UI (responsive)
│   ├── Home.tsx               # Landing page with carousel (responsive)
│   ├── Library.tsx            # Thinker exploration (responsive)
│   ├── School.tsx             # Debate education page (responsive)
│   ├── QuickDebate.tsx        # Quick debate mode (responsive)
│   ├── Results.tsx            # Performance results (responsive)
│   ├── Sidebar.tsx            # Navigation
│   └── ThinkerCard.tsx        # Thinker display card
├── services/           # API services
│   └── openrouterService.ts   # OpenRouter API integration
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment
├── App.tsx             # Main app component (responsive navigation)
├── constants.ts        # Thinker data, topics, challenges (20 thinkers, 12 topics, 8 challenges)
├── types.ts            # TypeScript type definitions
├── vite.config.ts      # Vite configuration
├── RESPONSIVE_DESIGN.md # Responsive design documentation
└── index.html          # HTML entry point
```

## How It Works

1. **Choose a Thinker**: Browse 20 historical figures organized by era and expertise
2. **Start a Debate**: Pick a topic or let the thinker suggest one
3. **Engage**: Present your arguments while the AI responds in character
4. **Learn**: Review fallacy analysis, sources, and performance metrics in real-time
5. **Improve**: Use the Debate School to master tactics and avoid fallacies
6. **Track Progress**: View detailed performance metrics showing strengths and weaknesses

## Development Notes

- The app uses OpenRouter's API with free tier models available
- All AI responses are structured with JSON to provide consistent analysis
- The debate scoring system evaluates logical strength, evidence quality, and rhetoric
- No user authentication required - runs in guest mode for all users
- Fully responsive with Tailwind CSS breakpoints (sm, md, lg, xl)
- Mobile-first design approach
- Featured challenges carousel auto-rotates every 5 seconds

## Troubleshooting

**"Rate limit exceeded"**
- OpenRouter free tier has daily request limits
- Wait 24 hours for limits to reset
- Check your OpenRouter dashboard for usage stats

**Mobile menu not working**
- Ensure viewport meta tag is present in `index.html`
- Check for JavaScript errors in console
- Verify Tailwind CSS is loading properly

**Layout issues on mobile**
- Test with Chrome DevTools device emulation
- Check `RESPONSIVE_DESIGN.md` for implementation details
- Verify Tailwind breakpoints are correct

**API key not working**
- Verify the key is correctly set in `.env.local` or GitHub Secrets
- Check that the key starts with the correct prefix
- Ensure no extra spaces or quotes around the key

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

**Areas for contribution:**
- Additional historical figures
- More debate topics
- UI/UX improvements
- Performance optimizations
- Accessibility enhancements
- PWA features
- Additional debate tactics and fallacies

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Historical figure information compiled from various public domain sources
- Powered by [OpenRouter](https://openrouter.ai) for AI capabilities
- Built with modern web technologies for optimal performance
- Responsive design inspired by mobile-first best practices
- Debate tactics and fallacies based on classical rhetoric and logic

---

**Live Demo**: [https://hongpenggg.github.io/echoes/](https://hongpenggg.github.io/echoes/)

**Version**: 3.0 (20 Thinkers + Debate School + Featured Challenges Carousel + 12 Quick Topics)
