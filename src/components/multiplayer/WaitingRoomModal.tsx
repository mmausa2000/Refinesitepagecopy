import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Crown, Eye, User, Play, LogOut } from 'lucide-react';
import { useState } from 'react';

interface Player {
  id: string;
  name: string;
  isReady: boolean;
  isHost: boolean;
  isSpectator: boolean;
}

interface WaitingRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomCode: string;
  isHost: boolean;
  onStartGame: () => void;
}

const mockPlayers: Player[] = [
  { id: '1', name: 'You', isReady: false, isHost: true, isSpectator: false },
  { id: '2', name: 'Sarah M.', isReady: true, isHost: false, isSpectator: false },
  { id: '3', name: 'John D.', isReady: false, isHost: false, isSpectator: false },
  { id: '4', name: 'Observer', isReady: true, isHost: false, isSpectator: true },
];

export function WaitingRoomModal({ 
  isOpen, 
  onClose, 
  roomCode, 
  isHost,
  onStartGame 
}: WaitingRoomModalProps) {
  const [copied, setCopied] = useState(false);
  const [players, setPlayers] = useState<Player[]>(mockPlayers);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleReady = () => {
    setPlayers(players.map(p => 
      p.id === '1' ? { ...p, isReady: !p.isReady } : p
    ));
  };

  const allPlayersReady = players
    .filter(p => !p.isSpectator)
    .every(p => p.isReady);

  const activePlayers = players.filter(p => !p.isSpectator);
  const spectators = players.filter(p => p.isSpectator);
  const currentPlayer = players.find(p => p.id === '1');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#1a2942] border border-white/20 rounded-2xl shadow-2xl z-50"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white">Waiting Room</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Room Code Display */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Room Code</p>
                    <p className="text-white text-2xl tracking-widest">{roomCode}</p>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Active Players */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-white">Players ({activePlayers.length})</h3>
                  {isHost && (
                    <p className="text-gray-400 text-sm">
                      {allPlayersReady ? '✓ All ready' : 'Waiting for players...'}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  {activePlayers.map((player) => (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        player.isReady 
                          ? 'bg-green-500/10 border-green-500/30' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        player.isReady ? 'bg-green-500/20' : 'bg-white/10'
                      }`}>
                        <User className={`w-5 h-5 ${player.isReady ? 'text-green-400' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-white">{player.name}</p>
                          {player.isHost && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-xs">
                              <Crown className="w-3 h-3" />
                              Host
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        player.isReady 
                          ? 'border-green-500 bg-green-500' 
                          : 'border-white/20'
                      }`}>
                        {player.isReady && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Spectators */}
              {spectators.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-white flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    Spectators ({spectators.length})
                  </h3>
                  <div className="space-y-2">
                    {spectators.map((player) => (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white">{player.name}</p>
                        </div>
                        <span className="text-gray-400 text-sm">Watching</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz Info */}
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
                  <span className="text-white">3 selected</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Leave Room
              </button>
              
              {isHost ? (
                <button
                  onClick={onStartGame}
                  disabled={!allPlayersReady}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                >
                  <Play className="w-4 h-4" />
                  Start Game
                </button>
              ) : currentPlayer?.isSpectator ? (
                <div className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Spectating
                </div>
              ) : (
                <button
                  onClick={toggleReady}
                  className={`px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-lg ${
                    currentPlayer?.isReady
                      ? 'bg-white/10 border border-white/20 text-white hover:bg-white/15'
                      : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {currentPlayer?.isReady ? 'Not Ready' : 'Ready'}
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}