import React from 'react';
import { Thinker } from '../types';

interface ThinkerCardProps {
  thinker: Thinker;
  onSelect: (thinker: Thinker) => void;
}

const ThinkerCard: React.FC<ThinkerCardProps> = ({ thinker, onSelect }) => {
  return (
    <div 
        className="group relative bg-surface-dark rounded-xl border border-gray-800 hover:border-accent-gold/50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
        onClick={() => onSelect(thinker)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent z-10" />
        <img 
            src={thinker.imageUrl} 
            alt={thinker.name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute top-3 left-3 z-20">
             <span className="bg-black/60 backdrop-blur-sm text-gray-200 px-2 py-1 rounded text-xs font-bold border border-white/10 uppercase tracking-wide">
                {thinker.title}
             </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
            <span className="text-xs text-accent-gold uppercase tracking-wider font-semibold">{thinker.era}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{thinker.name}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">{thinker.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
            {thinker.topics.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] uppercase px-2 py-1 bg-white/5 rounded text-gray-400 border border-white/5">
                    #{tag}
                </span>
            ))}
        </div>
      </div>
      
      <div className="px-5 pb-5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
         <button className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center">
            Start Debate
            <span className="material-icons text-sm ml-2">arrow_forward</span>
         </button>
      </div>
    </div>
  );
};

export default ThinkerCard;
