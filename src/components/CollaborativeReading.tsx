import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Copy, Check, Crown, MessageCircle, Send, BookOpen, Eye, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Reader {
  id: string;
  name: string;
  avatar: string;
  color: string;
  currentVerse: number;
  isReading: boolean;
}

interface ChatMessage {
  id: string;
  reader: string;
  message: string;
  timestamp: Date;
}

interface CollaborativeReadingProps {
  isOpen: boolean;
  onClose: () => void;
  currentBook: string;
  currentChapter: number;
  currentVerse: number;
}

export function CollaborativeReading({ 
  isOpen, 
  onClose, 
  currentBook, 
  currentChapter,
  currentVerse 
}: CollaborativeReadingProps) {
  const [view, setView] = useState<'choice' | 'waiting'>('choice');
  const [roomCode, setRoomCode] = useState('');
  const [generatedRoomCode, setGeneratedRoomCode] = useState('BIB123');
  const [copied, setCopied] = useState(false);
  const [readers, setReaders] = useState<Reader[]>([
    { 
      id: '1', 
      name: 'You', 
      avatar: 'Y', 
      color: 'from-purple-500 to-pink-500', 
      currentVerse: currentVerse,
      isReading: true 
    },
  ]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      reader: 'System',
      message: `📖 Reading ${currentBook} ${currentChapter} together`,
      timestamp: new Date()
    }
  ]);

  // Simulate readers joining
  useEffect(() => {
    if (view === 'waiting') {
      // Sarah joins after 2 seconds
      const timer1 = setTimeout(() => {
        setReaders(prev => {
          if (prev.find(p => p.id === '2')) return prev;
          return [
            ...prev,
            { 
              id: '2', 
              name: 'Sarah', 
              avatar: 'S', 
              color: 'from-blue-500 to-cyan-500', 
              currentVerse: 1,
              isReading: true 
            }
          ];
        });
        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            reader: 'System',
            message: '✨ Sarah joined the reading',
            timestamp: new Date()
          }
        ]);
      }, 2000);

      // Mike joins after 4 seconds
      const timer2 = setTimeout(() => {
        setReaders(prev => {
          if (prev.find(p => p.id === '3')) return prev;
          return [
            ...prev,
            { 
              id: '3', 
              name: 'Mike', 
              avatar: 'M', 
              color: 'from-green-500 to-teal-500', 
              currentVerse: 1,
              isReading: true 
            }
          ];
        });
        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now().toString() + '1',
            reader: 'System',
            message: '✨ Mike joined the reading',
            timestamp: new Date()
          }
        ]);
      }, 4000);

      // Simulate readers moving through verses
      const verseTimer = setInterval(() => {
        setReaders(prev => prev.map(reader => {
          if (reader.id === '1') return reader; // Don't update user's position
          // Random chance to advance a verse
          if (Math.random() > 0.6) {
            return { ...reader, currentVerse: reader.currentVerse + 1 };
          }
          return reader;
        }));
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearInterval(verseTimer);
      };
    }
  }, [view]);

  // Update user's current verse when it changes
  useEffect(() => {
    setReaders(prev => prev.map(r => 
      r.id === '1' ? { ...r, currentVerse } : r
    ));
  }, [currentVerse]);

  const handleCreateRoom = () => {
    // Generate random 6-character room code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedRoomCode(code);
    setView('waiting');
  };

  const handleJoinRoom = () => {
    if (roomCode.length === 6) {
      setView('waiting');
    }
  };

  const handleCopyCode = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(generatedRoomCode).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          fallbackCopy();
        });
      } else {
        fallbackCopy();
      }
    } catch (err) {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    const textarea = document.createElement('textarea');
    textarea.value = generatedRoomCode;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    
    document.body.removeChild(textarea);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: Date.now().toString(),
          reader: 'You',
          message: chatMessage,
          timestamp: new Date()
        }
      ]);
      setChatMessage('');
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

          {/* Modal/Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-[#1a2942]/95 backdrop-blur-sm border-l border-white/20 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white">Read Together</h3>
                  <p className="text-gray-400 text-xs">Collaborative Bible Study</p>
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
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Choice View */}
              {view === 'choice' && (
                <>
                  <div className="space-y-4">
                    <h4 className="text-white">Start a Reading Session</h4>
                    <p className="text-gray-400 text-sm">
                      Invite friends to read {currentBook} {currentChapter} together. See where everyone is reading in real-time.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Create Room */}
                    <button
                      onClick={handleCreateRoom}
                      className="w-full flex items-center gap-3 p-4 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 hover:border-teal-500/50 transition-all text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white">Create Reading Room</p>
                        <p className="text-xs text-gray-400">Start a new session</p>
                      </div>
                    </button>

                    {/* Join Room */}
                    <div className="space-y-2">
                      <p className="text-white text-sm">Or join with code:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={roomCode}
                          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                          placeholder="ABC123"
                          maxLength={6}
                          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-center tracking-widest placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50"
                        />
                        <button
                          onClick={handleJoinRoom}
                          disabled={roomCode.length !== 6}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Features</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Eye className="w-4 h-4 text-teal-400" />
                        <span>See where everyone is reading</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                        <span>Chat and discuss together</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span>Shared highlights & notes</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Waiting/Active View */}
              {view === 'waiting' && (
                <>
                  {/* Room Code */}
                  <div className="space-y-3">
                    <h4 className="text-white text-sm">Room Code</h4>
                    <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-xl p-4">
                      <div className="flex items-center justify-center gap-1 mb-3">
                        {generatedRoomCode.split('').map((char, i) => (
                          <div
                            key={i}
                            className="w-9 h-11 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white text-xl font-mono"
                          >
                            {char}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="w-full px-3 py-2 rounded-lg bg-teal-500/20 border border-teal-500/50 text-teal-400 hover:bg-teal-500/30 transition-all text-sm flex items-center justify-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy Code'}
                      </button>
                    </div>
                  </div>

                  {/* Current Reading */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>CURRENTLY READING</span>
                    </div>
                    <p className="text-white">{currentBook} {currentChapter}</p>
                  </div>

                  {/* Active Readers */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white text-sm">Active Readers ({readers.length})</h4>
                    </div>
                    
                    <div className="space-y-2">
                      <AnimatePresence>
                        {readers.map((reader, index) => (
                          <motion.div
                            key={reader.id}
                            initial={{ opacity: 0, x: -20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${reader.color} flex items-center justify-center text-white text-sm border-2 border-white/20 flex-shrink-0`}>
                              {reader.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-white text-sm">{reader.name}</p>
                                {reader.id === '1' && (
                                  <Crown className="w-3 h-3 text-teal-400" />
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                {reader.isReading ? (
                                  <>
                                    <motion.div
                                      animate={{ opacity: [0.5, 1, 0.5] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                      className="w-1.5 h-1.5 rounded-full bg-green-400"
                                    />
                                    <span className="text-green-400">Verse {reader.currentVerse}</span>
                                  </>
                                ) : (
                                  <span className="text-gray-500">Idle</span>
                                )}
                              </div>
                            </div>
                            {reader.id !== '1' && reader.currentVerse !== currentVerse && (
                              <button
                                className="text-teal-400 hover:text-teal-300 p-1.5 hover:bg-white/5 rounded transition-colors"
                                title={`Jump to verse ${reader.currentVerse}`}
                              >
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Chat */}
                  <div className="space-y-3">
                    <h4 className="text-white text-sm">Discussion</h4>
                    
                    {/* Messages */}
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-lg ${
                            msg.reader === 'System' 
                              ? 'bg-blue-500/10 border border-blue-500/20' 
                              : 'bg-white/5 border border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {msg.reader !== 'System' && (
                              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs">
                                {msg.reader[0]}
                              </div>
                            )}
                            <p className={`text-xs ${
                              msg.reader === 'System' ? 'text-blue-400' : 'text-gray-400'
                            }`}>
                              {msg.reader}
                            </p>
                          </div>
                          <p className="text-white text-sm">{msg.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Share your thoughts..."
                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!chatMessage.trim()}
                        className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
