import { motion } from 'motion/react';
import { Users, Trophy, Zap, CheckCircle2, XCircle, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
  score: number;
  answered: boolean;
  isCorrect?: boolean;
  responseTime?: number;
}

interface MultiplayerLeaderboardProps {
  currentQuestion: number;
  totalQuestions: number;
  yourScore: number;
  showResult: boolean;
}

export function MultiplayerLeaderboard({ currentQuestion, totalQuestions, yourScore, showResult }: MultiplayerLeaderboardProps) {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'You', avatar: 'Y', color: 'from-purple-500 to-pink-500', score: yourScore, answered: false },
    { id: '2', name: 'Sarah', avatar: 'S', color: 'from-amber-500 to-yellow-500', score: 0, answered: false },
    { id: '3', name: 'Mike', avatar: 'M', color: 'from-blue-500 to-cyan-500', score: 0, answered: false },
    { id: '4', name: 'Emma', avatar: 'E', color: 'from-green-500 to-teal-500', score: 0, answered: false },
  ]);

  // Update your score when it changes
  useEffect(() => {
    setPlayers(prev => prev.map(p => p.id === '1' ? { ...p, score: yourScore, answered: showResult } : p));
  }, [yourScore, showResult]);

  // Simulate other players answering after you
  useEffect(() => {
    if (showResult) {
      // Mark you as answered
      setPlayers(prev => prev.map(p => 
        p.id === '1' ? { ...p, answered: true, isCorrect: true, responseTime: Math.floor(Math.random() * 10) + 10 } : p
      ));

      // Simulate other players answering
      const delays = [1200, 2000, 2800];
      const otherPlayers = ['2', '3', '4'];
      
      otherPlayers.forEach((playerId, index) => {
        setTimeout(() => {
          const isCorrect = Math.random() > 0.3; // 70% chance of being correct
          
          setPlayers(prev => prev.map(p => {
            if (p.id === playerId) {
              return {
                ...p,
                answered: true,
                isCorrect,
                score: isCorrect ? p.score + 1 : p.score,
                responseTime: Math.floor(Math.random() * 10) + 15 + (index * 3)
              };
            }
            return p;
          }));
        }, delays[index]);
      });
    }
  }, [showResult, currentQuestion]);

  // Reset answered status when moving to next question
  useEffect(() => {
    if (!showResult) {
      setPlayers(prev => prev.map(p => ({ ...p, answered: false, isCorrect: undefined, responseTime: undefined })));
    }
  }, [currentQuestion, showResult]);

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#1a2942]/95 backdrop-blur-sm border-l border-white/20 flex flex-col z-30 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white">Live Leaderboard</h3>
            <p className="text-gray-400 text-xs">{players.length} players</p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Question Progress</span>
            <span className="text-teal-400">{currentQuestion + 1}/{totalQuestions}</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              className="h-full bg-gradient-to-r from-green-500 to-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Players List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sortedPlayers.map((player, index) => {
          const rank = index + 1;
          const isFirst = rank === 1;
          const answeredCount = players.filter(p => p.answered).length;

          return (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border transition-all ${
                isFirst
                  ? 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {/* Player Header */}
              <div className="flex items-center gap-3 mb-2">
                {/* Rank */}
                <div className="w-8 text-center flex-shrink-0">
                  {isFirst ? (
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Crown className="w-5 h-5 text-amber-400 mx-auto" />
                    </motion.div>
                  ) : (
                    <span className="text-gray-400">#{rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${player.color} flex items-center justify-center text-white flex-shrink-0 border-2 ${
                  isFirst ? 'border-amber-500/50' : 'border-white/20'
                }`}>
                  {player.avatar}
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <p className={`truncate ${isFirst ? 'text-amber-400' : 'text-white'}`}>
                    {player.name}
                  </p>
                  {showResult && player.answered && (
                    <div className="flex items-center gap-2 mt-0.5">
                      {player.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span className="text-xs text-green-400">
                            Correct • {player.responseTime}s
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                          <span className="text-xs text-red-400">Wrong</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Score */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-xl ${isFirst ? 'text-amber-400' : 'text-white'}`}>
                    {player.score}
                  </p>
                  <p className="text-xs text-gray-400">points</p>
                </div>
              </div>

              {/* Answer Status Indicator */}
              {!showResult && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                  {player.answered ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
                      />
                      <span className="text-xs text-green-400">Answered</span>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-4 h-4 rounded-full border-2 border-gray-500 border-t-teal-400 animate-spin flex-shrink-0"
                        style={{ borderTopColor: '#14b8a6' }}
                      />
                      <span className="text-xs text-gray-400">Thinking...</span>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-white/10 bg-[#152238]/50">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <Zap className="w-4 h-4 text-orange-400 mx-auto mb-1" />
            <p className="text-white text-sm">{sortedPlayers[0]?.name || 'N/A'}</p>
            <p className="text-xs text-gray-400">Leading</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <Trophy className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-white text-sm">{sortedPlayers[0]?.score || 0}</p>
            <p className="text-xs text-gray-400">Top Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
