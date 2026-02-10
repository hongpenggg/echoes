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

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header & Filters */}
      <div className="flex-shrink-0 px-8 py-6 border-b border-gray-800 bg-background-dark z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-white mb-1">Library of Minds</h1>
                <p className="text-gray-400 text-sm">Browse thinkers across time and space.</p>
            </div>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search philosophers..." 
                    className="bg-surface-dark border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-64 pl-10 p-2.5"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="material-icons text-gray-500 text-lg">search</span>
                </div>
            </div>
        </div>

        <div className="flex flex-wrap gap-4">
             {/* Era Filter */}
             <select 
                value={eraFilter}
                onChange={(e) => setEraFilter(e.target.value)}
                className="bg-surface-dark border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 min-w-[150px]"
             >
                {eras.map(era => <option key={era} value={era}>{era === 'All' ? 'All Eras' : era}</option>)}
             </select>

             {/* Topic Filter */}
             <select 
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="bg-surface-dark border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 min-w-[150px]"
             >
                {topics.map(t => <option key={t} value={t}>{t === 'All' ? 'All Topics' : t}</option>)}
             </select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {filteredThinkers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredThinkers.map(thinker => (
                <ThinkerCard key={thinker.id} thinker={thinker} onSelect={onSelectThinker} />
            ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <span className="material-icons text-4xl mb-2">sentiment_dissatisfied</span>
                <p>No thinkers found matching your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Library;
