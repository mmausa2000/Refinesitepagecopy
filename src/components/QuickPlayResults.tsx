import { motion } from 'motion/react';
import { Trophy, Zap, Target, RotateCcw, Home } from 'lucide-react';

interface QuickPlayResultsProps {
  showConfetti: boolean;
  onPlayAgain: () => void;
  onBackToLobby: () => void;
  onClose: () => void;
}

export function QuickPlayResults({ showConfetti, onPlayAgain, onBackToLobby, onClose }: QuickPlayResultsProps) {
  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500, 
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800,
                rotate: Math.random() * 360,
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                ease: "easeIn"
              }}
              className={`absolute w-3 h-3 rounded-full ${
                ['bg-amber-400', 'bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400'][i % 5]
              }`}
            />
          ))}
        </div>
      )}

      {/* Winner Celebration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-6 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-2xl"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
          className="text-6xl mb-2"
        >
          👑
        </motion.div>
        <h3 className="text-white text-2xl mb-1">Sarah Wins!</h3>
        <p className="text-amber-400">Perfect score! 🎉</p>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-4 px-4">
        {/* 2nd Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-xl mb-2 border-4 border-gray-500/50">
            Y
          </div>
          <div className="bg-gradient-to-b from-gray-500/30 to-gray-600/30 border border-gray-500/50 rounded-t-xl px-6 py-3 flex flex-col items-center min-w-[80px]">
            <span className="text-3xl mb-1">🥈</span>
            <p className="text-white text-sm">You</p>
            <p className="text-gray-400 text-xs">8/10</p>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-2xl mb-2 border-4 border-amber-500/50 shadow-lg shadow-amber-500/50"
          >
            S
          </motion.div>
          <div className="bg-gradient-to-b from-amber-500/30 to-yellow-600/30 border border-amber-500/50 rounded-t-xl px-6 py-6 flex flex-col items-center min-w-[90px]">
            <span className="text-4xl mb-2">🥇</span>
            <p className="text-white">Sarah</p>
            <p className="text-amber-400 text-sm">10/10</p>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white mb-2 border-4 border-amber-700/50">
            M
          </div>
          <div className="bg-gradient-to-b from-amber-700/30 to-amber-800/30 border border-amber-700/50 rounded-t-xl px-4 py-2 flex flex-col items-center min-w-[70px]">
            <span className="text-2xl mb-1">🥉</span>
            <p className="text-white text-xs">Mike</p>
            <p className="text-gray-400 text-xs">7/10</p>
          </div>
        </motion.div>
      </div>

      {/* Full Leaderboard */}
      <div className="space-y-3">
        <h3 className="text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          Final Leaderboard
        </h3>
        
        <div className="space-y-2">
          {[
            { rank: 1, name: 'Sarah', score: 10, accuracy: 100, avgTime: '12s', avatar: 'S', medals: '🥇', color: 'from-amber-500 to-yellow-500' },
            { rank: 2, name: 'You', score: 8, accuracy: 80, avgTime: '15s', avatar: 'Y', medals: '🥈', color: 'from-gray-400 to-gray-500' },
            { rank: 3, name: 'Mike', score: 7, accuracy: 70, avgTime: '18s', avatar: 'M', medals: '🥉', color: 'from-amber-600 to-amber-700' },
            { rank: 4, name: 'Emma', score: 6, accuracy: 60, avgTime: '20s', avatar: 'E', medals: '', color: 'from-blue-500 to-cyan-500' },
          ].map((player, index) => (
            <motion.div
              key={player.rank}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className={`flex items-center gap-4 p-4 rounded-xl border ${
                player.rank === 1 
                  ? 'bg-amber-500/10 border-amber-500/30' 
                  : player.rank === 2
                  ? 'bg-gray-500/10 border-gray-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {/* Rank */}
              <div className="w-8 text-center">
                <span className={`text-2xl ${player.rank <= 3 ? 'text-2xl' : 'text-white'}`}>
                  {player.medals || `#${player.rank}`}
                </span>
              </div>

              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${player.color} flex items-center justify-center text-white border-2 ${
                player.rank === 1 ? 'border-amber-500/50' : 'border-white/20'
              }`}>
                {player.avatar}
              </div>

              {/* Player Info */}
              <div className="flex-1">
                <p className={`${player.rank === 1 ? 'text-amber-400' : 'text-white'}`}>
                  {player.name}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-gray-400">
                    ⚡ {player.avgTime} avg
                  </span>
                  <span className="text-xs text-gray-400">
                    🎯 {player.accuracy}% accuracy
                  </span>
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <p className={`text-xl ${player.rank === 1 ? 'text-amber-400' : 'text-white'}`}>
                  {player.score}
                </p>
                <p className="text-xs text-gray-400">points</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
          <p className="text-blue-400 text-2xl mb-1"><Zap className="w-6 h-6 mx-auto" /></p>
          <p className="text-xs text-gray-400 mb-1">Fastest Answer</p>
          <p className="text-white text-sm">Sarah - 8s</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
          <p className="text-purple-400 text-2xl mb-1">🔥</p>
          <p className="text-xs text-gray-400 mb-1">Longest Streak</p>
          <p className="text-white text-sm">Sarah - 10</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <p className="text-green-400 text-2xl mb-1"><Target className="w-6 h-6 mx-auto" /></p>
          <p className="text-xs text-gray-400 mb-1">Total Questions</p>
          <p className="text-white text-sm">10</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onPlayAgain}
          className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
        <button
          onClick={onBackToLobby}
          className="flex-1 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Lobby
        </button>
      </div>
    </>
  );
}
