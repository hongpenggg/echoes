import React from 'react';

const School: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'tactics' | 'fallacies' | 'tips'>('tactics');

  const debateTactics = [
    {
      name: 'Socratic Method',
      description: 'Ask probing questions to expose contradictions in your opponent\'s logic. Instead of making claims, lead them to discover flaws in their own reasoning.',
      example: 'If they claim "All governments are corrupt," ask: "What makes a government corrupt? Are there any exceptions? What would an uncorrupt government look like?"',
      difficulty: 'Advanced'
    },
    {
      name: 'Steelmanning',
      description: 'Present the strongest possible version of your opponent\'s argument before refuting it. This builds credibility and shows intellectual honesty.',
      example: 'Instead of attacking a weak version of their view, say: "The best case for your position would be... However, even this strong version fails because..."',
      difficulty: 'Intermediate'
    },
    {
      name: 'Reductio ad Absurdum',
      description: 'Show that your opponent\'s premises, when taken to their logical conclusion, lead to an absurd or unacceptable outcome.',
      example: 'If they argue "No laws should restrict personal freedom," extend it: "Then laws against murder restrict freedom and should be abolished, which is clearly absurd."',
      difficulty: 'Intermediate'
    },
    {
      name: 'Appeal to Principles',
      description: 'Ground your arguments in universally accepted principles (justice, consistency, evidence) rather than personal opinion.',
      example: 'Instead of "I think this is wrong," say: "This violates the principle of equal treatment under law, which we both value."',
      difficulty: 'Beginner'
    },
    {
      name: 'Burden of Proof',
      description: 'The person making a positive claim must provide evidence. Shift the burden back to your opponent when they make unfounded assertions.',
      example: 'If they claim "Aliens built the pyramids," respond: "That\'s an extraordinary claim requiring extraordinary evidence. What concrete proof do you have?"',
      difficulty: 'Beginner'
    },
    {
      name: 'Analogy and Metaphor',
      description: 'Use compelling comparisons to make abstract concepts concrete and relatable.',
      example: 'Comparing a flawed argument to "a chain with a broken link—the whole structure collapses when one part fails."',
      difficulty: 'Intermediate'
    },
    {
      name: 'Concession and Counterattack',
      description: 'Acknowledge valid points from your opponent, then show why they don\'t undermine your position. This builds trust and appears fair.',
      example: '"You\'re right that my proposal has costs. However, the costs of inaction are far greater because..."',
      difficulty: 'Advanced'
    },
    {
      name: 'Historical Precedent',
      description: 'Use historical examples to show patterns, consequences, or validation of your argument.',
      example: 'Reference past events: "When this policy was tried in [country/era], it led to [outcome], which supports my position that..."',
      difficulty: 'Intermediate'
    }
  ];

  const logicalFallacies = [
    {
      name: 'Ad Hominem',
      description: 'Attacking the person making the argument rather than the argument itself.',
      example: '"You can\'t trust her opinion on economics because she\'s not a trained economist." (The validity of an argument doesn\'t depend on who makes it.)',
      howToCounter: 'Redirect to the argument: "Let\'s focus on the merits of the argument itself, not the person presenting it."'
    },
    {
      name: 'Straw Man',
      description: 'Misrepresenting someone\'s argument to make it easier to attack.',
      example: 'Person A: "We should have better gun regulations." Person B: "So you want to ban all guns and leave us defenseless?"',
      howToCounter: 'Clarify your position: "That\'s not what I said. My actual position is..."'
    },
    {
      name: 'False Dichotomy',
      description: 'Presenting only two options when more exist.',
      example: '"Either we ban all social media or accept that kids will be addicted to screens." (Many middle-ground options exist.)',
      howToCounter: 'Introduce alternatives: "This isn\'t binary. We could also [option 3], [option 4], or a combination."'
    },
    {
      name: 'Appeal to Authority',
      description: 'Claiming something is true simply because an authority figure said so.',
      example: '"Einstein believed in God, so atheism must be wrong." (Even experts can be wrong, especially outside their field.)',
      howToCounter: 'Ask for reasoning: "What was their evidence? Can you explain the logic rather than just citing their name?"'
    },
    {
      name: 'Slippery Slope',
      description: 'Arguing that a small first step will inevitably lead to extreme consequences.',
      example: '"If we allow gay marriage, next people will marry animals!" (No logical connection between the steps.)',
      howToCounter: 'Challenge the chain: "Why would A necessarily lead to Z? Each step requires separate justification."'
    },
    {
      name: 'Circular Reasoning',
      description: 'Using the conclusion as a premise. The argument goes in a circle.',
      example: '"The Bible is true because it says it\'s the word of God, and God wouldn\'t lie." (Assumes what it\'s trying to prove.)',
      howToCounter: 'Point out the circle: "You\'re assuming your conclusion in your premise. What independent evidence do you have?"'
    },
    {
      name: 'Red Herring',
      description: 'Introducing irrelevant information to distract from the real issue.',
      example: 'During a debate on healthcare: "But what about the crisis in education?" (Changes the subject.)',
      howToCounter: 'Refocus: "That\'s a separate issue. Let\'s finish discussing healthcare first, then we can address education."'
    },
    {
      name: 'Appeal to Emotion',
      description: 'Using emotions (fear, pity, outrage) instead of logic to persuade.',
      example: '"Think of the children!" (without explaining how the policy actually helps children.)',
      howToCounter: 'Request logic: "I understand the emotional appeal, but what\'s the logical basis? What evidence supports this?"'
    },
    {
      name: 'Hasty Generalization',
      description: 'Drawing broad conclusions from limited examples.',
      example: '"I met two rude French people, therefore all French people are rude."',
      howToCounter: 'Challenge the sample size: "Two examples aren\'t statistically significant. Do you have broader data?"'
    },
    {
      name: 'Post Hoc Ergo Propter Hoc',
      description: 'Assuming that because B followed A, A caused B.',
      example: '"After we elected this mayor, crime increased, so the mayor caused the crime." (Correlation ≠ causation.)',
      howToCounter: 'Question causation: "Just because two things happened in sequence doesn\'t mean one caused the other. What\'s the evidence of causation?"'
    },
    {
      name: 'No True Scotsman',
      description: 'Changing definitions to exclude counterexamples.',
      example: '"No true Christian would commit violence." Response to counterexample: "Well then they weren\'t a true Christian."',
      howToCounter: 'Pin down definitions: "Let\'s define our terms clearly upfront so you can\'t move the goalposts later."'
    },
    {
      name: 'Tu Quoque (Appeal to Hypocrisy)',
      description: 'Dismissing criticism by pointing out that the critic is guilty of the same thing.',
      example: '"You criticize my diet, but you\'re overweight too!" (Doesn\'t address whether the criticism is valid.)',
      howToCounter: 'Separate person from argument: "Whether I\'m hypocritical doesn\'t affect whether my point is valid. Let\'s focus on the argument itself."'
    }
  ];

  const winningTips = [
    {
      title: 'Listen Actively',
      content: 'The best debaters listen more than they speak. Identify weak points, unstated assumptions, and contradictions in your opponent\'s position. Take notes.',
      icon: 'hearing'
    },
    {
      title: 'Define Terms Early',
      content: 'Many debates dissolve once terms are clearly defined. If debating "freedom," establish what you mean by it upfront to avoid talking past each other.',
      icon: 'description'
    },
    {
      title: 'Use Evidence, Not Opinion',
      content: 'Back claims with data, studies, historical examples, or expert consensus. "I feel" is weak; "Research shows" is strong.',
      icon: 'science'
    },
    {
      title: 'Stay Calm and Respectful',
      content: 'Emotion undermines credibility. Even when provoked, maintain composure. The calmer debater usually appears more rational and trustworthy.',
      icon: 'self_improvement'
    },
    {
      title: 'Anticipate Counterarguments',
      content: 'Before they raise objections, address them yourself: "Some might argue X, but this fails because..." Shows you\'ve thought deeply.',
      icon: 'psychology'
    },
    {
      title: 'Know When to Concede',
      content: 'Admitting a point when you\'re wrong builds credibility. Say "You\'re right about that, but it doesn\'t change my core argument because..."',
      icon: 'handshake'
    },
    {
      title: 'Structure Your Arguments',
      content: 'Use clear structure: "I have three main points. First... Second... Third..." Makes your argument easier to follow and harder to dismiss.',
      icon: 'account_tree'
    },
    {
      title: 'Ask Clarifying Questions',
      content: 'Before attacking, make sure you understand their position: "Just to clarify, are you saying...?" Prevents strawman attacks.',
      icon: 'help_outline'
    },
    {
      title: 'Focus on Core Principles',
      content: 'Identify the fundamental assumptions underlying the debate. If you can challenge those, the entire opposing argument collapses.',
      icon: 'filter_center_focus'
    }
  ];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-background-dark">
      {/* Header */}
      <div className="bg-surface-darker border-b border-gray-800 py-6 md:py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-icons text-accent-gold text-3xl md:text-4xl">school</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Debate School</h1>
          </div>
          <p className="text-sm md:text-base text-gray-400 max-w-3xl">
            Master the art of argumentation. Learn tactics used by history's greatest minds, identify logical fallacies, and develop skills to win any debate.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface-dark border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex gap-2 md:gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('tactics')}
              className={`py-3 md:py-4 px-4 md:px-6 font-medium text-sm md:text-base border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'tactics'
                  ? 'border-accent-gold text-accent-gold'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-icons text-lg md:text-xl">psychology</span>
                <span>Tactics</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('fallacies')}
              className={`py-3 md:py-4 px-4 md:px-6 font-medium text-sm md:text-base border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'fallacies'
                  ? 'border-accent-gold text-accent-gold'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-icons text-lg md:text-xl">warning</span>
                <span>Fallacies</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`py-3 md:py-4 px-4 md:px-6 font-medium text-sm md:text-base border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'tips'
                  ? 'border-accent-gold text-accent-gold'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-icons text-lg md:text-xl">lightbulb</span>
                <span>Winning Tips</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8 pb-20 md:pb-8">
        {activeTab === 'tactics' && (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 md:p-6">
              <div className="flex items-start gap-3">
                <span className="material-icons text-primary text-2xl">info</span>
                <div>
                  <h3 className="font-bold text-white mb-1 text-sm md:text-base">What are Debate Tactics?</h3>
                  <p className="text-xs md:text-sm text-gray-300">
                    Debate tactics are strategic approaches to constructing and defending arguments. Mastering these techniques will help you think critically, identify weaknesses in opposing views, and present your ideas persuasively.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {debateTactics.map((tactic, idx) => (
                <div key={idx} className="bg-surface-dark border border-gray-700 rounded-xl p-4 md:p-6 hover:border-gray-600 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg md:text-xl font-bold text-white">{tactic.name}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      tactic.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      tactic.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {tactic.difficulty}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-gray-300 mb-4">{tactic.description}</p>
                  <div className="bg-background-dark border border-gray-800 rounded-lg p-3 md:p-4">
                    <p className="text-xs md:text-sm text-gray-400 font-medium mb-2">Example:</p>
                    <p className="text-xs md:text-sm text-gray-300 italic">{tactic.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fallacies' && (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 md:p-6">
              <div className="flex items-start gap-3">
                <span className="material-icons text-red-400 text-2xl">error_outline</span>
                <div>
                  <h3 className="font-bold text-white mb-1 text-sm md:text-base">Why Learn Fallacies?</h3>
                  <p className="text-xs md:text-sm text-gray-300">
                    Logical fallacies are errors in reasoning that undermine arguments. Recognizing them helps you avoid making weak arguments and exposes flaws in your opponent's logic.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {logicalFallacies.map((fallacy, idx) => (
                <div key={idx} className="bg-surface-dark border border-gray-700 rounded-xl p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">{fallacy.name}</h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4">{fallacy.description}</p>
                  
                  <div className="space-y-3">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <p className="text-xs font-bold text-red-400 mb-1">EXAMPLE:</p>
                      <p className="text-xs md:text-sm text-gray-300">{fallacy.example}</p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <p className="text-xs font-bold text-green-400 mb-1">HOW TO COUNTER:</p>
                      <p className="text-xs md:text-sm text-gray-300">{fallacy.howToCounter}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-xl p-4 md:p-6">
              <div className="flex items-start gap-3">
                <span className="material-icons text-accent-gold text-2xl">emoji_events</span>
                <div>
                  <h3 className="font-bold text-white mb-1 text-sm md:text-base">Path to Victory</h3>
                  <p className="text-xs md:text-sm text-gray-300">
                    Winning debates isn't just about being right—it's about effective communication, strategic thinking, and intellectual humility. These tips will elevate your debating prowess.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {winningTips.map((tip, idx) => (
                <div key={idx} className="bg-surface-dark border border-gray-700 rounded-xl p-4 md:p-6 hover:border-accent-gold/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent-gold/20 flex items-center justify-center">
                      <span className="material-icons text-accent-gold text-xl md:text-2xl">{tip.icon}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white flex-1">{tip.title}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-gray-300">{tip.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default School;