import React from 'react';
import { DebateSessionData, ViewState } from '../types';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface ResultsProps {
  session: DebateSessionData;
  onExit: () => void;
}

const Results: React.FC<ResultsProps> = ({ session, onExit }) => {
  const isUserWin = session.analysis.score < 45;
  const isDraw = session.analysis.score >= 45 && session.analysis.score <= 55;
  
  const performanceData = [
    { subject: 'Logic', A: isUserWin ? 90 : 70, fullMark: 100 },
    { subject: 'Rhetoric', A: isUserWin ? 85 : 60, fullMark: 100 },
    { subject: 'Evidence', A: isUserWin ? 80 : 65, fullMark: 100 },
    { subject: 'Civility', A: 95, fullMark: 100 },
    { subject: 'Strategy', A: isUserWin ? 88 : 50, fullMark: 100 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md overflow-y-auto p-4">
       <div className="relative w-full max-w-4xl bg-surface-darker border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-4 md:my-8">
            {/* Header */}
            <div className="bg-surface-dark p-4 md:p-8 border-b border-gray-800 text-center relative overflow-hidden">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 md:w-64 h-1 bg-gradient-to-r from-transparent ${isUserWin ? 'via-green-500' : isDraw ? 'via-yellow-500' : 'via-red-500'} to-transparent shadow-[0_0_20px_rgba(0,0,0,1)] shadow-${isUserWin ? 'green' : 'red'}-500`}></div>
                
                <h1 className={`text-2xl md:text-4xl font-bold mb-2 ${isUserWin ? 'text-green-400' : isDraw ? 'text-yellow-400' : 'text-red-400'}`}>
                    {isUserWin ? 'Intellectual Triumph' : isDraw ? 'Stalemate' : `${session.thinker.name} Concedes Nothing`}
                </h1>
                <p className="text-xs md:text-sm text-gray-400">Debate Topic: <span className="text-white">{session.topic}</span></p>
                
                <button onClick={onExit} className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-white">
                    <span className="material-icons text-xl md:text-2xl">close</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row">
                {/* Left: Metrics */}
                <div className="flex-1 p-4 md:p-8 md:border-r border-b md:border-b-0 border-gray-800">
                    <h3 className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Performance Matrix</h3>
                    <div className="h-48 md:h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
                                <PolarGrid stroke="#374151" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Performance"
                                    dataKey="A"
                                    stroke={isUserWin ? "#10b981" : "#ef4444"}
                                    fill={isUserWin ? "#10b981" : "#ef4444"}
                                    fillOpacity={0.3}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right: Insight */}
                <div className="flex-1 p-4 md:p-8 bg-[#0c0e18]">
                    <h3 className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Winning Insight</h3>
                    
                    <div className="mb-6 md:mb-8">
                        <div className="flex gap-3 md:gap-4 mb-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-600 flex-shrink-0">
                                <img src={session.thinker.imageUrl} alt={session.thinker.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-surface-dark border border-gray-700 p-3 md:p-4 rounded-xl rounded-tl-none flex-1">
                                <p className="text-xs md:text-sm text-gray-300 italic">
                                    "{session.analysis.winningInsight || "The debate ended before a conclusive logical checkmate could be achieved, but your arguments showed promise."}"
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                         <h4 className="text-xs md:text-sm font-bold text-white">Key Takeaways</h4>
                         <div className="flex gap-2 md:gap-3 items-start">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0">
                                <span className="material-icons text-sm">thumb_up</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Strongest Point</p>
                                <p className="text-xs md:text-sm text-gray-300 break-words">{session.analysis.summary.userPoint}</p>
                            </div>
                         </div>
                         <div className="flex gap-2 md:gap-3 items-start">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center flex-shrink-0">
                                <span className="material-icons text-sm">thumb_down</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Area for Improvement</p>
                                <p className="text-xs md:text-sm text-gray-300 break-words">
                                    {session.analysis.fallacies.length > 0 
                                        ? `Address: ${session.analysis.fallacies[0].name}` 
                                        : "Deepen historical context usage"}
                                </p>
                            </div>
                         </div>
                    </div>

                    <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-800">
                        <button 
                            onClick={onExit}
                            className="w-full py-2.5 md:py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/20 text-sm md:text-base"
                        >
                            Return to Library
                        </button>
                    </div>
                </div>
            </div>
       </div>
    </div>
  );
};

export default Results;