import React, { useState, useRef, useEffect } from 'react';
import { Thinker, DebateSessionData, Message } from '../types';
import { generateDebateTurn } from '../services/openrouterService';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface DebateInterfaceProps {
  session: DebateSessionData;
  onUpdateSession: (data: DebateSessionData) => void;
  onEndDebate: (data: DebateSessionData) => void;
}

const DebateInterface: React.FC<DebateInterfaceProps> = ({ session, onUpdateSession, onEndDebate }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'context' | 'arguments' | 'tactics' | 'sources'>('context');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    const updatedMessages = [...session.messages, userMsg];
    
    onUpdateSession({
      ...session,
      messages: updatedMessages
    });
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateDebateTurn(
        session.thinker.systemPrompt,
        session.topic,
        updatedMessages.map(m => ({ role: m.role, text: m.text })),
        input
      );

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: response.reply,
        timestamp: Date.now()
      };

      const finalSessionState = {
        ...session,
        messages: [...updatedMessages, aiMsg],
        analysis: response.analysis
      };

      onUpdateSession(finalSessionState);
      
      if (response.analysis.fallacies.length > 0) {
          setActiveTab('tactics');
          setShowAnalysis(true);
      }

      if (response.analysis.status !== 'ongoing') {
        setTimeout(() => onEndDebate(finalSessionState), 2000);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-background-dark overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="h-14 lg:h-16 border-b border-gray-800 flex items-center justify-between px-4 lg:px-6 bg-surface-darker/80 backdrop-blur-md z-10 flex-shrink-0">
           <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 lg:w-10 lg:h-10 flex-shrink-0 rounded-full overflow-hidden border border-gray-600">
                <img src={session.thinker.imageUrl} className="w-full h-full object-cover" alt="Thinker" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-white font-bold text-sm lg:text-base truncate">{session.thinker.name}</h2>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-[10px] lg:text-xs text-accent-gold truncate">{session.topic}</p>
                </div>
              </div>
           </div>
           
           <div className="flex items-center gap-2">
             {/* Mobile Analysis Toggle */}
             <button 
               onClick={() => setShowAnalysis(!showAnalysis)}
               className="lg:hidden text-xs text-gray-400 hover:text-white border border-gray-700 px-2 py-1 rounded hover:bg-gray-800 transition-colors flex items-center gap-1"
              >
               <span className="material-icons text-sm">analytics</span>
               <span className="hidden sm:inline">Analysis</span>
             </button>
             <button 
               onClick={() => onEndDebate(session)}
               className="text-xs text-gray-400 hover:text-white border border-gray-700 px-2 lg:px-3 py-1 lg:py-1.5 rounded hover:bg-gray-800 transition-colors"
              >
               End
             </button>
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 lg:p-6 space-y-4 lg:space-y-6 custom-scrollbar bg-gradient-to-b from-background-dark to-[#0a0c16]">
            {session.messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50 px-4">
                    <span className="material-icons text-3xl lg:text-4xl mb-2">forum</span>
                    <p className="text-sm lg:text-base text-center">Make your opening statement to begin.</p>
                </div>
            )}
            {session.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] lg:max-w-[80%] rounded-2xl p-3 lg:p-5 shadow-lg ${
                        msg.role === 'user' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-surface-dark border border-gray-700 text-gray-200 rounded-bl-none'
                    }`}>
                        <p className="text-xs lg:text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-surface-dark border border-gray-700 rounded-2xl rounded-bl-none p-3 lg:p-4 shadow-lg flex gap-2 items-center">
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 lg:p-6 border-t border-gray-800 bg-surface-darker flex-shrink-0">
            <div className="relative">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="Construct your argument..."
                    className="w-full bg-surface-dark border border-gray-700 rounded-xl p-3 lg:p-4 pr-10 lg:pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none h-20 lg:h-24 custom-scrollbar text-sm lg:text-base"
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className={`absolute bottom-2 lg:bottom-3 right-2 lg:right-3 p-1.5 lg:p-2 rounded-lg transition-all ${
                        input.trim() ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <span className="material-icons text-lg lg:text-xl">send</span>
                </button>
            </div>
            <p className="text-[9px] lg:text-[10px] text-gray-600 mt-1 lg:mt-2 text-center">AI responses are generated based on historical texts and may interpret context creatively.</p>
        </div>
      </div>

      {/* Analysis Sidebar - Desktop: Fixed sidebar, Mobile: Overlay */}
      <div className={`
        ${showAnalysis ? 'fixed' : 'hidden'} lg:relative lg:flex
        inset-0 lg:inset-auto
        z-50 lg:z-auto
        w-full lg:w-80
        bg-[#0c0e18] 
        flex-col
        ${showAnalysis ? 'flex' : ''}
      `}>
        {/* Mobile overlay backdrop */}
        {showAnalysis && (
          <div 
            className="lg:hidden absolute inset-0 bg-black/60 -z-10" 
            onClick={() => setShowAnalysis(false)}
          />
        )}

        {/* Analysis content */}
        <div className="relative bg-[#0c0e18] border-l border-gray-800 flex flex-col h-full max-w-md lg:max-w-none mx-auto lg:mx-0 w-full">
          {/* Close button for mobile */}
          <button 
            onClick={() => setShowAnalysis(false)}
            className="lg:hidden absolute top-4 right-4 z-10 p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <span className="material-icons text-gray-400">close</span>
          </button>

          {/* Score Header */}
          <div className="p-4 lg:p-6 border-b border-gray-800">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="material-icons text-sm">analytics</span> Live Analysis
              </h3>
              
              <div className="bg-surface-dark rounded-lg p-3 border border-gray-800 mb-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>You</span>
                      <span>AI</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden flex">
                      <div 
                          className="h-full bg-blue-500 transition-all duration-1000" 
                          style={{ width: `${100 - session.analysis.score}%` }}
                      />
                      <div 
                          className="h-full bg-red-500 transition-all duration-1000" 
                          style={{ width: `${session.analysis.score}%` }}
                      />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                      <span>Dominance</span>
                      <span>{session.analysis.score > 60 ? 'AI Lead' : session.analysis.score < 40 ? 'User Lead' : 'Balanced'}</span>
                  </div>
              </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800 overflow-x-auto">
              {(['context', 'arguments', 'tactics', 'sources'] as const).map(tab => (
                  <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 lg:py-3 text-[9px] lg:text-[10px] font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${
                          activeTab === tab ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-gray-500 hover:text-gray-300'
                      }`}
                  >
                      {tab}
                  </button>
              ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-5 custom-scrollbar">
              
              {activeTab === 'context' && (
                  <div className="space-y-4 animate-fade-in">
                      <div className="relative h-28 lg:h-32 rounded-lg overflow-hidden mb-4 border border-gray-700">
                           <img src={session.thinker.imageUrl} className="w-full h-full object-cover" alt="Cover" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                              <span className="text-white font-bold text-base lg:text-lg">{session.thinker.name}</span>
                           </div>
                      </div>
                      <div className="p-3 lg:p-4 bg-surface-dark border border-gray-700 rounded-lg">
                          <h4 className="text-xs text-accent-gold font-bold uppercase mb-2">Historical Context</h4>
                          <p className="text-xs lg:text-sm text-gray-300 leading-relaxed font-light">
                              {session.thinker.historicalContext}
                          </p>
                      </div>
                      <div>
                           <h4 className="text-xs text-gray-500 font-bold uppercase mb-2">Era & Topic</h4>
                           <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400">{session.thinker.era}</span>
                              {session.thinker.topics.map(t => (
                                  <span key={t} className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs text-primary">{t}</span>
                              ))}
                           </div>
                      </div>
                  </div>
              )}

              {activeTab === 'arguments' && (
                  <div className="space-y-4 lg:space-y-6 animate-fade-in">
                      <div>
                          <h4 className="text-xs text-blue-400 font-bold uppercase mb-2">Current Synthesis</h4>
                          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs lg:text-sm text-gray-300 leading-relaxed">
                              {session.analysis.summary.synthesis || "Waiting for synthesis..."}
                          </div>
                      </div>
                      
                      <div>
                          <h4 className="text-xs text-gray-500 font-bold uppercase mb-2">Latest Points</h4>
                          <div className="space-y-3">
                              <div className="border-l-2 border-blue-500 pl-3">
                                  <p className="text-[10px] text-blue-400 font-bold mb-1">USER</p>
                                  <p className="text-xs text-gray-400">{session.analysis.summary.userPoint || "..."}</p>
                              </div>
                              <div className="border-l-2 border-red-500 pl-3">
                                  <p className="text-[10px] text-red-400 font-bold mb-1">{session.thinker.name.toUpperCase()}</p>
                                  <p className="text-xs text-gray-400">{session.analysis.summary.aiPoint || "..."}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {activeTab === 'tactics' && (
                  <div className="space-y-3 animate-fade-in">
                      <p className="text-xs text-gray-500 mb-2">AI-powered fallacy detection for argument improvement.</p>
                      {session.analysis.fallacies.length > 0 ? (
                          session.analysis.fallacies.map((fallacy, idx) => (
                              <div key={idx} className="p-3 lg:p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-slide-in">
                                  <div className="flex items-center gap-2 mb-2">
                                      <span className="material-icons text-red-400 text-sm">warning</span>
                                      <span className="text-sm font-bold text-red-400">{fallacy.name}</span>
                                  </div>
                                  <div className="mb-3">
                                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Analysis</p>
                                      <p className="text-xs lg:text-sm text-gray-300 leading-snug">{fallacy.explanation}</p>
                                  </div>
                                  <div>
                                      <p className="text-xs text-green-500 uppercase font-bold mb-1">Improvement</p>
                                      <p className="text-xs lg:text-sm text-gray-300 leading-snug italic">"{fallacy.improvement}"</p>
                                  </div>
                              </div>
                          ))
                      ) : (
                          <div className="text-center py-8 text-gray-500 bg-surface-dark border border-gray-800 rounded-lg">
                              <span className="material-icons text-3xl mb-2 opacity-50 text-green-500">check_circle</span>
                              <p className="text-sm font-medium text-gray-300">Clean Argument</p>
                              <p className="text-xs mt-1">No logical fallacies detected in your last turn.</p>
                          </div>
                      )}
                  </div>
              )}

              {activeTab === 'sources' && (
                  <div className="space-y-3 animate-fade-in">
                      <p className="text-xs text-gray-500 italic mb-2">Contextual references identified by AI:</p>
                      {session.analysis.sources.length > 0 ? (
                           session.analysis.sources.map((source, idx) => (
                              <div key={idx} className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 bg-surface-dark border border-gray-700 rounded-lg hover:border-accent-gold/50 transition-colors cursor-help group">
                                  <span className="material-icons text-gray-500 text-sm mt-0.5 group-hover:text-accent-gold">menu_book</span>
                                  <p className="text-xs text-gray-300">{source}</p>
                              </div>
                          ))
                      ) : (
                          <p className="text-xs text-gray-600 text-center py-4">No specific sources cited yet.</p>
                      )}
                  </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateInterface;