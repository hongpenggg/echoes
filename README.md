# Echoes - Debate with Historical Figures

🎭 An interactive web application where users can engage in thoughtful debates and discussions with AI-powered historical figures, thinkers, and experts across various domains.

## Features

- **Diverse Thinkers**: Debate with 13 legendary minds:
  - **Ancient Era**: Socrates, Plato, Confucius, Julius Caesar, Sun Tzu
  - **Enlightenment**: Immanuel Kant, Adam Smith, Benjamin Franklin
  - **Revolutionary Era**: Napoleon Bonaparte, Franklin D. Roosevelt
  - **Modern Era**: Friedrich Nietzsche, Ruth Bader Ginsburg, Alan Turing
- **📱 Fully Responsive**: Works seamlessly on phones, tablets, and desktops
- **Smart Filtering**: Filter thinkers by time period, topic, and name
- **AI-Powered Analysis**: Real-time debate performance tracking with:
  - Live argument summaries
  - Logical fallacy detection with improvement suggestions
  - Historical source citations
  - Performance scoring
- **Historical Context**: Learn about each thinker's background, era, and key contributions
- **Quick Debate Mode**: Jump into debates on pre-selected topics
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
   # Required: OpenRouter API key
   VITE_OPENROUTER_API_KEY_1=your_first_api_key_here
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

1. **Add OpenRouter API Keys to GitHub Secrets**
   - Go to your repository settings
   - Navigate to **Settings → Secrets and variables → Actions**
   - Add these secrets:
     - `VITE_OPENROUTER_API_KEY_1` (required)

2. **Enable GitHub Pages**
   - Go to **Settings → Pages**
   - Under **Source**, select **GitHub Actions**
   - Save

3. **Trigger Deployment**
   - Push to the `main` branch, or
   - Go to **Actions** tab and manually trigger the "Deploy to GitHub Pages" workflow

4. **Access Your App**
   - Once deployed, your app will be available at:
     `https://hongpenggg.github.io/echoes/`

## Featured Thinkers

### Philosophy
- **Socrates** (Ancient Greece) - The Socratic Method, ethics, virtue
- **Plato** (Ancient Greece) - Theory of Forms, Republic, metaphysics
- **Immanuel Kant** (Enlightenment) - Categorical imperative, pure reason, morality
- **Friedrich Nietzsche** (Modern) - Übermensch, will to power, existentialism
- **Confucius** (Ancient China) - Ren, li, filial piety, social harmony

### Politics & Governance
- **Julius Caesar** (Ancient Rome) - Roman power, military strategy, leadership
- **Napoleon Bonaparte** (Revolutionary Era) - Empire building, Napoleonic Code, strategy
- **Franklin D. Roosevelt** (Modern) - New Deal, WWII leadership, progressive governance
- **Benjamin Franklin** (Revolutionary Era) - American independence, democracy, freedom

### Economics & Law
- **Adam Smith** (Enlightenment) - Wealth of Nations, invisible hand, free markets
- **Ruth Bader Ginsburg** (Modern) - Gender equality, constitutional law, civil rights

### Science & Strategy
- **Alan Turing** (Modern) - Computing, artificial intelligence, Turing test
- **Sun Tzu** (Ancient China) - Art of War, military strategy, tactics

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
│   ├── Home.tsx               # Landing page (responsive)
│   ├── Library.tsx            # Thinker exploration (responsive)
│   ├── QuickDebate.tsx        # Quick debate mode (responsive)
│   ├── Results.tsx            # Performance results (responsive)
│   ├── Sidebar.tsx            # Navigation
│   └── ThinkerCard.tsx        # Thinker display card
├── services/           # API services
│   └── openrouterService.ts   # OpenRouter integration + key rotation
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment
├── App.tsx             # Main app component (responsive navigation)
├── constants.ts        # Thinker data and constants (13 thinkers)
├── types.ts            # TypeScript type definitions
├── vite.config.ts      # Vite configuration
├── RESPONSIVE_DESIGN.md # Responsive design documentation
└── index.html          # HTML entry point
```

## How It Works

1. **Choose a Thinker**: Browse 13 historical figures organized by era and expertise
2. **Start a Debate**: Pick a topic or let the thinker suggest one
3. **Engage**: Present your arguments while the AI responds in character
4. **Learn**: Review fallacy analysis, sources, and performance metrics in real-time
5. **Improve**: Use AI feedback to strengthen your argumentation skills

## Development Notes

- The app uses OpenRouter's free model router (`openrouter/free`) which doesn't require billing
- All AI responses are structured with JSON to provide consistent analysis
- The debate scoring system evaluates logical strength, evidence quality, and rhetoric
- No user authentication required - runs in guest mode for all users
- API key rotation state persists in browser localStorage
- Fully responsive with Tailwind CSS breakpoints (sm, md, lg, xl)
- Mobile-first design approach

## Troubleshooting

**"All API keys have been exhausted"**
- Wait 24 hours for rate limits to reset
- Add more API keys from different OpenRouter accounts
- Check your OpenRouter dashboard for usage stats

**Keys not rotating**
- Check browser console for rotation logs
- Verify all keys are properly set in `.env.local` or GitHub Secrets
- Clear localStorage: `localStorage.clear()` in browser console

**Mobile menu not working**
- Ensure viewport meta tag is present in `index.html`
- Check for JavaScript errors in console
- Verify Tailwind CSS is loading properly

**Layout issues on mobile**
- Test with Chrome DevTools device emulation
- Check `RESPONSIVE_DESIGN.md` for implementation details
- Verify Tailwind breakpoints are correct

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

**Areas for contribution:**
- Additional historical figures
- More debate topics
- UI/UX improvements
- Performance optimizations
- Accessibility enhancements
- PWA features

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Historical figure information compiled from various public domain sources
- Powered by [OpenRouter](https://openrouter.ai) for AI capabilities
- Built with modern web technologies for optimal performance
- Responsive design inspired by mobile-first best practices

---

**Live Demo**: [https://hongpenggg.github.io/echoes/](https://hongpenggg.github.io/echoes/)

**Version**: 2.0 (Responsive Update + 7 New Thinkers)
