import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, BookOpen, Eye, User } from 'lucide-react';
import { useState } from 'react';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (roomCode: string, isSpectator: boolean) => void;
}

const availableThemes = [
  { id: 1, name: 'Love & Compassion', verses: 45 },
  { id: 2, name: 'Faith & Trust', verses: 32 },
  { id: 3, name: 'Psalms Collection', verses: 78 },
  { id: 4, name: 'Wisdom & Knowledge', verses: 56 },
  { id: 5, name: 'Prayer & Worship', verses: 41 },
  { id: 6, name: 'Hope & Encouragement', verses: 38 },
  { id: 7, name: 'Strength in Trials', verses: 29 },
  { id: 8, name: 'God\'s Promises', verses: 51 },
];

export function CreateRoomModal({ isOpen, onClose, onCreateRoom }: CreateRoomModalProps) {
  const [selectedThemes, setSelectedThemes] = useState<number[]>([1, 2]);
  const [isSpectator, setIsSpectator] = useState(false);

  const toggleTheme = (id: number) => {
    if (selectedThemes.includes(id)) {
      setSelectedThemes(selectedThemes.filter((themeId) => themeId !== id));
    } else {
      if (selectedThemes.length < 10) {
        setSelectedThemes([...selectedThemes, id]);
      }
    }
  };

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateRoom = () => {
    if (selectedThemes.length === 0) return;
    const roomCode = generateRoomCode();
    onCreateRoom(roomCode, isSpectator);
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#1a2942] border border-white/20 rounded-2xl shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white">Create Private Room</h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {selectedThemes.length}/10 themes selected
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Host Role Selection */}
              <div className="space-y-3">
                <h3 className="text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">1</span>
                  Your Role
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsSpectator(false)}
                    className={`p-4 rounded-lg border transition-all ${
                      !isSpectator
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <User className={`w-5 h-5 ${!isSpectator ? 'text-blue-400' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <p className={`${!isSpectator ? 'text-blue-400' : 'text-white'}`}>Play</p>
                        <p className="text-xs text-gray-400">Participate in the quiz</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setIsSpectator(true)}
                    className={`p-4 rounded-lg border transition-all ${
                      isSpectator
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Eye className={`w-5 h-5 ${isSpectator ? 'text-blue-400' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <p className={`${isSpectator ? 'text-blue-400' : 'text-white'}`}>Spectate</p>
                        <p className="text-xs text-gray-400">Watch the quiz</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Theme Selection */}
              <div className="space-y-3">
                <h3 className="text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">2</span>
                  Select Themes (Max 10)
                </h3>
                <div className="space-y-2">
                  {availableThemes.map((theme) => {
                    const isSelected = selectedThemes.includes(theme.id);
                    const isMaxed = selectedThemes.length >= 10 && !isSelected;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => toggleTheme(theme.id)}
                        disabled={isMaxed}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-500/50'
                            : isMaxed
                            ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-white/20'
                        }`}>
                          {isSelected && <span className="text-white text-xs">✓</span>}
                        </div>
                        <BookOpen className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`} />
                        <div className="flex-1 text-left">
                          <p className={`${isSelected ? 'text-cyan-400' : 'text-white'}`}>
                            {theme.name}
                          </p>
                          <p className="text-xs text-gray-400">{theme.verses} verses</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {selectedThemes.length === 0 && (
                  <p className="text-amber-400 text-sm flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <span>⚠️</span>
                    Please select at least one theme
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRoom}
                disabled={selectedThemes.length === 0}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Create Room
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
