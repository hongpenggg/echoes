import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const NavItem = ({ view, icon, label }: { view: ViewState; icon: string; label: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setView(view)}
        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 ${
          isActive
            ? 'bg-primary/10 text-primary border-l-4 border-primary'
            : 'text-gray-400 hover:bg-surface-dark hover:text-gray-200'
        }`}
      >
        <span className="material-icons mr-3 text-lg">{icon}</span>
        {label}
      </button>
    );
  };

  return (
    <aside className="w-64 bg-surface-darker border-r border-gray-800 flex flex-col h-full flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mr-3 shadow-lg shadow-primary/20">
          <span className="material-icons text-white text-sm">school</span>
        </div>
        <span className="text-lg font-bold text-white tracking-tight">Echoes</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <NavItem view={ViewState.HOME} icon="home" label="Home" />
        <NavItem view={ViewState.LIBRARY} icon="library_books" label="Library" />
      </nav>
      
      <div className="p-6 text-xs text-gray-600 text-center border-t border-gray-800">
        <p>Guest Mode Active</p>
        <p className="mt-1">Echoes of Wisdom v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;