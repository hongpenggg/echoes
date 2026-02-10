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
  };

  const handleEndDebate = (finalSessionState: DebateSessionData) => {
    setSession(finalSessionState);
    setCurrentView(ViewState.RESULTS);
  };

  const handleExitResults = () => {
    setSession(null);
    setCurrentView(ViewState.HOME);
  };

  return (
    <div className="flex h-screen bg-background-dark text-white font-sans overflow-hidden">
      
      {/* Sidebar is hidden in debate mode for immersion, unless on large screens maybe? 
          For now, hiding it during debate for focus. */}
      {currentView !== ViewState.DEBATE_SESSION && currentView !== ViewState.RESULTS && (
        <Sidebar currentView={currentView} setView={setCurrentView} />
      )}

      <main className="flex-1 relative overflow-hidden">
        {currentView === ViewState.HOME && (
          <Home onStartDebate={(t) => handleStartDebate(t, t.topics[0])} />
        )}

        {currentView === ViewState.LIBRARY && (
          <Library onSelectThinker={(t) => handleStartDebate(t, t.topics[0])} />
        )}
        
        {/* Quick Debate is an overlay on top of whatever view, or a view itself. 
            We treated it as a button in sidebar usually, but let's make it a modal logic here if triggered.
            But simplified: ViewState.QUICK_DEBATE renders the modal over Home/Library */}
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
      </main>
      
      {/* Quick Action Float Button (visible only on Home/Library) */}
      {(currentView === ViewState.HOME || currentView === ViewState.LIBRARY) && (
          <button 
            onClick={() => setCurrentView(ViewState.QUICK_DEBATE)}
            className="absolute bottom-8 right-8 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg shadow-primary/40 transition-all hover:scale-110 z-50 flex items-center justify-center"
          >
             <span className="material-icons text-2xl">bolt</span>
          </button>
      )}
    </div>
  );
};

export default App;