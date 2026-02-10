import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Library from './components/Library';
import QuickDebate from './components/QuickDebate';
import DebateInterface from './components/DebateInterface';
import Results from './components/Results';
import { ViewState, Thinker, DebateSessionData } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [session, setSession] = useState<DebateSessionData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleStartDebate = (thinker: Thinker, topic: string = "General Philosophy") => {
    setSession({
      thinker,
      topic,
      messages: [],
      analysis: {
        summary: {
            userPoint: '',
            aiPoint: '',
            synthesis: 'The debate has just begun.'
        },
        fallacies: [],
        sources: [],
        score: 50,
        status: 'ongoing'
      }
    });
    setCurrentView(ViewState.DEBATE_SESSION);
    setIsMobileMenuOpen(false);
  };

  const handleEndDebate = (finalSessionState: DebateSessionData) => {
    setSession(finalSessionState);
    setCurrentView(ViewState.RESULTS);
  };

  const handleExitResults = () => {
    setSession(null);
    setCurrentView(ViewState.HOME);
  };

  const handleViewChange = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const showSidebar = currentView !== ViewState.DEBATE_SESSION && currentView !== ViewState.RESULTS;

  return (
    <div className="flex h-screen bg-background-dark text-white font-sans overflow-hidden">
      
      {/* Desktop Sidebar - Hidden on mobile */}
      {showSidebar && (
        <div className="hidden lg:block">
          <Sidebar currentView={currentView} setView={handleViewChange} />
        </div>
      )}

      {/* Mobile Header with Hamburger - Shown on mobile when sidebar would be visible */}
      {showSidebar && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-surface-darker/95 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-icons text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <h1 className="text-lg font-bold text-accent-gold">Echoes</h1>
          </div>
          <button 
            onClick={() => handleViewChange(ViewState.QUICK_DEBATE)}
            className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
          >
            <span className="material-icons text-sm">bolt</span>
            <span className="hidden sm:inline">Quick</span>
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && showSidebar && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-16 left-0 bottom-0 w-64 bg-surface-darker z-50 shadow-2xl transform transition-transform">
            <Sidebar currentView={currentView} setView={handleViewChange} />
          </div>
        </>
      )}

      <main className="flex-1 relative overflow-hidden">
        {/* Add padding top on mobile when header is visible */}
        <div className={`h-full ${showSidebar ? 'pt-16 lg:pt-0' : ''}`}>
          {currentView === ViewState.HOME && (
            <Home onStartDebate={(t) => handleStartDebate(t, t.topics[0])} />
          )}

          {currentView === ViewState.LIBRARY && (
            <Library onSelectThinker={(t) => handleStartDebate(t, t.topics[0])} />
          )}
          
          {currentView === ViewState.QUICK_DEBATE && (
              <>
                  <div className="absolute inset-0 z-0 blur-sm pointer-events-none">
                      <Home onStartDebate={() => {}} /> 
                  </div>
                  <QuickDebate 
                      onStart={(topic, thinker) => handleStartDebate(thinker, topic)}
                      onCancel={() => setCurrentView(ViewState.HOME)}
                  />
              </>
          )}

          {currentView === ViewState.DEBATE_SESSION && session && (
            <DebateInterface 
              session={session} 
              onUpdateSession={setSession} 
              onEndDebate={handleEndDebate}
            />
          )}

          {currentView === ViewState.RESULTS && session && (
              <Results session={session} onExit={handleExitResults} />
          )}
        </div>
      </main>
      
      {/* Quick Action Float Button (visible only on Home/Library, hidden on mobile) */}
      {(currentView === ViewState.HOME || currentView === ViewState.LIBRARY) && (
          <button 
            onClick={() => setCurrentView(ViewState.QUICK_DEBATE)}
            className="hidden lg:flex absolute bottom-8 right-8 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg shadow-primary/40 transition-all hover:scale-110 z-50 items-center justify-center"
          >
             <span className="material-icons text-2xl">bolt</span>
          </button>
      )}
    </div>
  );
};

export default App;