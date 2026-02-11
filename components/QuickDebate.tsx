import React from 'react';
import { QUICK_TOPICS, THINKERS } from '../constants';
import { Thinker } from '../types';

interface QuickDebateProps {
  onStart: (topic: string, thinker: Thinker) => void;
  onCancel: () => void;
}

const QuickDebate: React.FC<QuickDebateProps> = ({ onStart, onCancel }) => {
  const [selectedTopic, setSelectedTopic] = React.useState(QUICK_TOPICS[0]);
  
  const suggestedThinker = React.useMemo(() => {
    // Use the suggestedThinkerId from the topic if available
    if (selectedTopic.suggestedThinkerId) {
      const thinker = THINKERS.find(t => t.id === selectedTopic.suggestedThinkerId);
      if (thinker) return thinker;
    }
    // Fallback to first thinker
    return THINKERS[0];
  }, [selectedTopic]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl bg-surface-darker border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-[80vh]">
        
        {/* Close Button */}
        <button 
            onClick={onCancel}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-50 text-gray-400 hover:text-white transition-colors p-1"
        >
            <span className="material-icons text-xl md:text-2xl">close</span>
        </button>

        {/* Left: Topics */}
        <div className="flex-1 flex flex-col p-4 md:p-8 md:border-r border-gray-800 overflow-y-auto custom-scrollbar">
            <div className="mb-4 md:mb-8">
                <span className="bg-primary/20 text-primary text-[10px] md:text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Quick Debate</span>
                <h2 className="text-xl md:text-3xl font-bold text-white mt-2 mb-2">Choose Your Battleground</h2>
                <p className="text-xs md:text-sm text-gray-400">Select a topic to ignite a conversation with history's greatest minds.</p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:gap-4">
                {QUICK_TOPICS.map((topic, idx) => (
                    <div 
                        key={idx}
                        onClick={() => setSelectedTopic(topic)}
                        className={`group cursor-pointer p-3 md:p-5 rounded-xl border transition-all duration-300 ${
                            selectedTopic.title === topic.title
                            ? 'bg-surface-dark border-primary shadow-lg shadow-primary/10'
                            : 'bg-surface-dark/50 border-gray-800 hover:border-gray-600'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                             <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded ${
                                selectedTopic.title === topic.title ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'
                             }`}>
                                {topic.category}
                             </span>
                             {selectedTopic.title === topic.title && <span className="material-icons text-primary text-base md:text-lg">radio_button_checked</span>}
                        </div>
                        <h3 className={`text-sm md:text-lg font-bold mb-1 ${selectedTopic.title === topic.title ? 'text-white' : 'text-gray-300'}`}>{topic.title}</h3>
                        <p className="text-xs md:text-sm text-gray-500 line-clamp-2">{topic.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 md:mt-8 pt-4 md:pt-6 border-t border-gray-800">
                <p className="text-xs md:text-sm text-gray-500 mb-3 text-center">Have a specific question?</p>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" placeholder="Enter custom topic..." className="flex-1 bg-background-dark border border-gray-700 rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-primary" />
                    <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-medium">Set</button>
                </div>
            </div>
        </div>

        {/* Right: Opponent Preview */}
        <div className="w-full md:w-[400px] bg-[#0c0e1a] relative flex flex-col items-center justify-center p-4 md:p-8 text-center border-t md:border-t-0 md:border-l border-gray-800">
             {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-accent-gold mb-4 md:mb-8 relative z-10">Suggested Opponent</h3>
            
            <div className="relative w-28 h-28 md:w-40 md:h-40 mb-4 md:mb-6 group cursor-pointer z-10">
                <div className="absolute inset-0 rounded-full border-2 border-accent-gold border-dashed animate-[spin_10s_linear_infinite] opacity-50"></div>
                <div className="absolute inset-2 md:inset-3 rounded-full overflow-hidden border-2 border-gray-700 shadow-2xl">
                    <img src={suggestedThinker.imageUrl} alt={suggestedThinker.name} className="w-full h-full object-cover grayscale" />
                </div>
                <div className="absolute bottom-1 right-2 md:right-3 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-background-dark rounded-full"></div>
            </div>

            <h2 className="text-lg md:text-2xl font-bold text-white mb-1 relative z-10">{suggestedThinker.name}</h2>
            <p className="text-xs md:text-sm text-accent-gold font-medium mb-4 md:mb-6 relative z-10">{suggestedThinker.title}</p>
            
            <div className="relative z-10 bg-white/5 border border-white/10 rounded-lg p-3 md:p-4 mb-4 md:mb-8 text-left w-full">
                <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold mb-1">System Prompt Preview</p>
                <p className="text-xs md:text-sm text-gray-300 italic line-clamp-3">"{suggestedThinker.systemPrompt}"</p>
            </div>

            <button 
                onClick={() => onStart(selectedTopic.title, suggestedThinker)}
                className="relative z-10 w-full bg-accent-gold hover:bg-yellow-500 text-black font-bold text-base md:text-lg py-2.5 md:py-3 px-4 md:px-6 rounded-xl shadow-lg shadow-accent-gold/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
                Start Debate
                <span className="material-icons text-lg md:text-xl">bolt</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default QuickDebate;
