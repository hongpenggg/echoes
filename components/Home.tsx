import React from 'react';
import { THINKERS } from '../constants';
import { Thinker } from '../types';

interface HomeProps {
  onStartDebate: (thinker: Thinker) => void;
}

const Home: React.FC<HomeProps> = ({ onStartDebate }) => {
  const featuredThinker = THINKERS.find(t => t.id === 'caesar') || THINKERS[0];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
       {/* Hero Section */}
       <section className="relative w-full h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-surface-dark">
                <img 
                    src={featuredThinker.imageUrl} 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-20 grayscale mix-blend-overlay blur-sm" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/90 to-transparent"></div>
            </div>

            <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center justify-between">
                <div className="max-w-2xl z-20 pt-10">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-xs font-medium mb-6 backdrop-blur-sm animate-pulse">
                        <span className="material-icons text-[14px] mr-1.5">auto_awesome</span>
                        Featured Challenge
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Challenge <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-200">{featuredThinker.name}</span> on Strategy
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                        Step into the Roman Senate. Discuss the nature of power, leadership, and the Rubicon with the dictator perpetuo himself.
                    </p>
                    <button 
                        onClick={() => onStartDebate(featuredThinker)}
                        className="px-8 py-3.5 bg-accent-gold hover:bg-yellow-500 text-black font-bold rounded-lg shadow-lg shadow-accent-gold/20 transition-all flex items-center hover:scale-105"
                    >
                        <span className="material-icons mr-2">play_arrow</span>
                        Accept Challenge
                    </button>
                </div>

                {/* Featured Card */}
                <div className="hidden lg:block relative w-[320px] h-[420px] bg-surface-darker rounded-xl border border-accent-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-transform duration-500 z-10 mr-12">
                    <div className="h-3/4 w-full overflow-hidden rounded-t-xl relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-darker to-transparent z-10"></div>
                        <img className="w-full h-full object-cover grayscale-0 filter contrast-125" src={featuredThinker.imageUrl} alt={featuredThinker.name} />
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-1">{featuredThinker.name}</h3>
                        <p className="text-sm text-accent-gold uppercase tracking-widest font-medium mb-3">{featuredThinker.title}</p>
                        <div className="flex gap-2">
                             <span className="text-[10px] uppercase px-2 py-1 bg-white/5 rounded text-gray-400">#Politics</span>
                             <span className="text-[10px] uppercase px-2 py-1 bg-white/5 rounded text-gray-400">#War</span>
                        </div>
                    </div>
                </div>
            </div>
       </section>

       {/* Recent Community Activity */}
       <div className="max-w-7xl mx-auto p-8">
            <h2 className="text-xl font-bold text-white mb-6">Recent Community Debates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Mock Item 1 */}
                 <div className="bg-surface-dark rounded-xl p-5 border border-gray-800 hover:border-primary/50 transition-colors group cursor-pointer shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-400 font-bold border border-purple-500/30">JD</div>
                        <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-primary transition-colors">Ethics of Artificial Intelligence</h4>
                            <p className="text-xs text-gray-400 mb-2">vs. Plato</p>
                            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[65%]"></div>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">User Winning • Turn 12</p>
                        </div>
                    </div>
                 </div>

                 {/* Mock Item 2 */}
                 <div className="bg-surface-dark rounded-xl p-5 border border-gray-800 hover:border-primary/50 transition-colors group cursor-pointer shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30 mb-3 block float-left mr-4">AK</div>
                    <div className="flex-1">
                         <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-primary transition-colors">Corporate Strategy</h4>
                         <p className="text-xs text-gray-400 mb-2">vs. Sun Tzu</p>
                         <span className="inline-block px-2 py-1 rounded bg-red-500/10 text-red-500 text-[10px] border border-red-500/20">Defeat</span>
                    </div>
                 </div>

                 {/* New Item */}
                 <div className="bg-surface-dark rounded-xl p-5 border border-gray-800 border-dashed flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-600 transition-colors cursor-pointer" onClick={() => onStartDebate(THINKERS[0])}>
                    <div className="text-center">
                        <span className="material-icons mb-2">add_circle_outline</span>
                        <p className="text-sm font-medium">Start New Debate</p>
                    </div>
                 </div>
            </div>
       </div>
    </div>
  );
};

export default Home;
