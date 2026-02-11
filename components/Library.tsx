import React, { useState, useMemo } from 'react';
import { Thinker } from '../types';
import { THINKERS } from '../constants';
import ThinkerCard from './ThinkerCard';

interface LibraryProps {
  onSelectThinker: (thinker: Thinker) => void;
}

const Library: React.FC<LibraryProps> = ({ onSelectThinker }) => {
  const [search, setSearch] = useState('');
  const [eraFilter, setEraFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');
  const [selectedThinker, setSelectedThinker] = useState<Thinker | null>(null);

  const eras = ['All', ...Array.from(new Set(THINKERS.map(t => t.era.split(' • ')[0])))];
  const topics = ['All', ...Array.from(new Set(THINKERS.flatMap(t => t.topics)))];

  const filteredThinkers = useMemo(() => {
    return THINKERS.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                            t.description.toLowerCase().includes(search.toLowerCase());
      const matchesEra = eraFilter === 'All' || t.era.includes(eraFilter);
      const matchesTopic = topicFilter === 'All' || t.topics.includes(topicFilter);
      return matchesSearch && matchesEra && matchesTopic;
    });
  }, [search, eraFilter, topicFilter]);

  const handleThinkerClick = (thinker: Thinker) => {
    setSelectedThinker(thinker);
  };

  const handleCloseModal = () => {
    setSelectedThinker(null);
  };

  const handleStartDebate = () => {
    if (selectedThinker) {
      onSelectThinker(selectedThinker);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header & Filters */}
      <div className="flex-shrink-0 px-4 sm:px-6 md:px-8 py-4 md:py-6 border-b border-gray-800 bg-background-dark z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-white mb-1">Library of Minds</h1>
                <p className="text-gray-400 text-xs md:text-sm">Browse thinkers across time and space.</p>
            </div>
            <div className="relative w-full md:w-auto">
                <input 
                    type="text" 
                    placeholder="Search philosophers..." 
                    className="bg-surface-dark border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full md:w-64 pl-10 p-2.5"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="material-icons text-gray-500 text-lg">search</span>
                </div>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
             {/* Era Filter */}
             <select 
                value={eraFilter}
                onChange={(e) => setEraFilter(e.target.value)}
                className="bg-surface-dark border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 w-full sm:w-auto sm:min-w-[150px]"
             >
                {eras.map(era => <option key={era} value={era}>{era === 'All' ? 'All Eras' : era}</option>)}
             </select>

             {/* Topic Filter */}
             <select 
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="bg-surface-dark border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 w-full sm:w-auto sm:min-w-[150px]"
             >
                {topics.map(t => <option key={t} value={t}>{t === 'All' ? 'All Topics' : t}</option>)}
             </select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar">
        {filteredThinkers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredThinkers.map(thinker => (
                <ThinkerCard key={thinker.id} thinker={thinker} onSelect={handleThinkerClick} />
            ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <span className="material-icons text-4xl mb-2">sentiment_dissatisfied</span>
                <p className="text-sm text-center px-4">No thinkers found matching your criteria.</p>
            </div>
        )}
      </div>

      {/* Thinker Detail Modal */}
      {selectedThinker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-surface-darker border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slideUp">
            
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-10 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              aria-label="Close"
            >
              <span className="material-icons text-xl md:text-2xl">close</span>
            </button>

            {/* Header with Image */}
            <div className="flex-shrink-0 relative h-48 md:h-64 overflow-hidden bg-gradient-to-b from-surface-dark to-surface-darker">
              <div className="absolute inset-0">
                <img 
                  src={selectedThinker.imageUrl} 
                  alt={selectedThinker.name}
                  className="w-full h-full object-cover opacity-30 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-darker via-surface-darker/50 to-transparent"></div>
              </div>
              
              {/* Thinker Info Overlay */}
              <div className="relative h-full flex items-end p-4 md:p-8">
                <div className="flex items-end gap-4 md:gap-6 w-full">
                  {/* Portrait */}
                  <div className="flex-shrink-0 w-20 h-20 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-accent-gold/50 shadow-2xl">
                    <img 
                      src={selectedThinker.imageUrl} 
                      alt={selectedThinker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Name and Title */}
                  <div className="flex-1 pb-2">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">{selectedThinker.name}</h2>
                    <p className="text-sm md:text-base text-accent-gold font-medium mb-1">{selectedThinker.title}</p>
                    <p className="text-xs md:text-sm text-gray-400">{selectedThinker.era}</p>
                  </div>
                  
                  {/* Difficulty Badge */}
                  <div className="flex-shrink-0 pb-2">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      selectedThinker.difficulty === 'Novice' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      selectedThinker.difficulty === 'Scholar' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {selectedThinker.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
              {/* Topics */}
              <div className="mb-6">
                <h3 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedThinker.topics.map((topic, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/30 rounded-lg text-xs md:text-sm font-medium">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Biography</h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {selectedThinker.description}
                </p>
              </div>

              {/* Historical Context */}
              <div className="mb-6">
                <h3 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Historical Context</h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {selectedThinker.historicalContext}
                </p>
              </div>

              {/* Debate Style Preview */}
              <div className="bg-surface-dark border border-gray-700 rounded-xl p-4 md:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="material-icons text-accent-gold text-xl md:text-2xl">auto_awesome</span>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white mb-1">Debate Style</h3>
                    <p className="text-xs md:text-sm text-gray-400">How this thinker will engage with you</p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-300 italic leading-relaxed pl-0 md:pl-9">
                  "{selectedThinker.systemPrompt}"
                </p>
              </div>
            </div>

            {/* Footer with Action Button */}
            <div className="flex-shrink-0 border-t border-gray-800 bg-surface-dark p-4 md:p-6">
              <button 
                onClick={handleStartDebate}
                className="w-full bg-accent-gold hover:bg-yellow-500 text-black font-bold text-base md:text-lg py-3 md:py-4 px-6 rounded-xl shadow-lg shadow-accent-gold/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Start Debate with {selectedThinker.name}</span>
                <span className="material-icons text-xl md:text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
