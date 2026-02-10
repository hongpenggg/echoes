# Echoes - Debate with Historical Figures

🎭 An interactive web application where users can engage in thoughtful debates and discussions with AI-powered historical figures, thinkers, and experts across various domains.

## Features

- **Diverse Thinkers**: Debate with Greek philosophers (Plato, Socrates), modern thinkers (Kant, Nietzsche), tech pioneers (Tim Berners-Lee), legal experts (Ruth Bader Ginsburg), and political leaders (Lee Kuan Yew, FDR, Julius Caesar)
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
- **UI**: Tailwind CSS (via inline styles)
- **Charts**: Recharts
- **AI**: OpenRouter API (free tier)
- **Deployment**: GitHub Pages via GitHub Actions

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
   # Required: Openrouter API key
   VITE_OPENROUTER_API_KEY_1=your_api_key_here
   ```

   Get your free API keys from [OpenRouter](https://openrouter.ai/keys)

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
   - Add this secret:
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
     `https://[your-username].github.io/[repo-name]/`


## Project Structure

```
echoes/
├── components/          # React components
│   ├── DebateInterface.tsx    # Main debate UI
│   ├── Home.tsx               # Landing page
│   ├── Library.tsx            # Thinker exploration
│   ├── QuickDebate.tsx        # Quick debate mode
│   ├── Results.tsx            # Performance results
│   ├── Sidebar.tsx            # Navigation
│   └── ThinkerCard.tsx        # Thinker display card
├── services/           # API services
│   └── openrouterService.ts   # OpenRouter integration + key rotation
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment
├── App.tsx             # Main app component
├── constants.ts        # Thinker data and constants
├── types.ts            # TypeScript type definitions
├── vite.config.ts      # Vite configuration
└── index.html          # HTML entry point
```

## How It Works

1. **Choose a Thinker**: Browse and select from dozens of historical figures organized by era and expertise
2. **Start a Debate**: Pick a topic or let the thinker suggest one
3. **Engage**: Present your arguments while the AI responds in character
4. **Learn**: Review fallacy analysis, sources, and performance metrics in real-time
5. **Improve**: Use AI feedback to strengthen your argumentation skills

## Development Notes

- The app uses OpenRouter's free model router (`openrouter/free`) which doesn't require billing
- All AI responses are structured with JSON to provide consistent analysis
- The debate scoring system evaluates logical strength, evidence quality, and rhetoric
- No user authentication required - runs in guest mode for all users

## Troubleshooting

**"All API keys have been exhausted"**
- Wait 24 hours for rate limits to reset
- Add more API keys from different OpenRouter accounts
- Check your OpenRouter dashboard for usage stats

**Keys not rotating**
- Check browser console for rotation logs
- Verify all keys are properly set in `.env.local` or GitHub Secrets
- Clear localStorage: `localStorage.clear()` in browser console

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Historical figure information compiled from various public domain sources
- Powered by [OpenRouter](https://openrouter.ai) for AI capabilities
- Built with modern web technologies for optimal performance
