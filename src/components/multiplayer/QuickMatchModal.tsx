import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface QuickMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMatchFound: () => void;
}

export function QuickMatchModal({ isOpen, onClose, onMatchFound }: QuickMatchModalProps) {
  const [searching, setSearching] = useState(false);
  const [matchTime, setMatchTime] = useState(0);

  useEffect(() => {
    if (searching) {
      const timer = setInterval(() => {
        setMatchTime((prev) => prev + 1);
      }, 1000);

      // Simulate finding a match after 3-5 seconds
      const matchTimer = setTimeout(() => {
        onMatchFound();
      }, 3000 + Math.random() * 2000);

      return () => {
        clearInterval(timer);
        clearTimeout(matchTimer);
      };
    }
  }, [searching, onMatchFound]);

  const handleStartSearch = () => {
    setSearching(true);
    setMatchTime(0);
  };

  const handleCancel = () => {
    setSearching(false);
    setMatchTime(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#1a2942] border border-white/20 rounded-2xl shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-white">Quick Match</h2>
              </div>
              <button
                onClick={handleCancel}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {!searching ? (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Users className="w-10 h-10 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white mb-2">Find an Opponent</h3>
                    <p className="text-gray-400 text-sm">
                      We'll match you with someone who has similar themes selected
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Questions:</span>
                      <span className="text-white">20</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Time per question:</span>
                      <span className="text-white">10 seconds</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Themes:</span>
                      <span className="text-white">Your selected themes</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-1 rounded-full bg-[#1a2942] flex items-center justify-center">
                      <Users className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white mb-2">Searching for opponent...</h3>
                    <p className="text-gray-400 text-sm">{matchTime}s elapsed</p>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-purple-400"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-pink-400"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-purple-400"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10">
              {!searching ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStartSearch}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Zap className="w-4 h-4" />
                    Start Searching
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleCancel}
                  className="w-full px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel Search
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
