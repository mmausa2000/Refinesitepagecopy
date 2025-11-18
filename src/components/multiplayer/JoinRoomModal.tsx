import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, Hash } from 'lucide-react';
import { useState } from 'react';

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinRoom: (roomCode: string) => void;
}

export function JoinRoomModal({ isOpen, onClose, onJoinRoom }: JoinRoomModalProps) {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 6);
    setRoomCode(value);
    setError('');
  };

  const handleJoin = () => {
    if (roomCode.length !== 6) {
      setError('Room code must be 6 characters');
      return;
    }
    
    // In a real app, this would validate the room code with the server
    // For now, we'll just accept any 6-character code
    onJoinRoom(roomCode);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && roomCode.length === 6) {
      handleJoin();
    }
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
            onClick={onClose}
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <LogIn className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-white">Join Room</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Hash className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white">Enter Room Code</h3>
                <p className="text-gray-400 text-sm">
                  Get the 6-character code from your friend
                </p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={roomCode}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="ABC123"
                    maxLength={6}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      error ? 'border-red-500/50' : 'border-white/10'
                    } text-white text-center text-2xl tracking-widest uppercase focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all placeholder:text-gray-600`}
                    autoFocus
                  />
                  {roomCode.length > 0 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      {roomCode.length}/6
                    </div>
                  )}
                </div>
                
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                    <span>⚠️</span>
                    {error}
                  </motion.p>
                )}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-gray-400 text-sm">
                  💡 <span className="text-white">Tip:</span> Room codes are case-insensitive and exactly 6 characters long
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleJoin}
                disabled={roomCode.length !== 6}
                className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                Join Room
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
