import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Clock, Hash, Globe, BookOpen, Users, Copy, Check, Crown, ArrowLeft, Search, Heart, Sparkles, Brain, Zap, Smile, MessageCircle, UserX, Trophy, BookMarked } from 'lucide-react';
import { useState, useEffect } from 'react';
import { QuickPlayResults } from './QuickPlayResults';
import { MultiplayerGameplay } from './MultiplayerGameplay';

interface QuickPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
}

const availableThemes = [
  { id: 1, name: 'Love & Compassion', verses: 45, selected: true, difficulty: 'easy', tag: 'popular', color: 'from-rose-500 to-pink-500' },
  { id: 2, name: 'Faith & Trust', verses: 32, selected: true, difficulty: 'medium', tag: 'popular', color: 'from-blue-500 to-cyan-500' },
  { id: 3, name: 'Psalms Collection', verses: 78, selected: false, difficulty: 'hard', tag: null, color: 'from-purple-500 to-indigo-500' },
  { id: 4, name: 'Wisdom & Knowledge', verses: 56, selected: true, difficulty: 'medium', tag: 'new', color: 'from-amber-500 to-orange-500' },
  { id: 5, name: 'Prayer & Worship', verses: 41, selected: false, difficulty: 'easy', tag: null, color: 'from-teal-500 to-emerald-500' },
];

const sampleQuestions = [
  { theme: 'Love & Compassion', question: 'Complete the verse: "Love is patient, love is..."', answer: 'kind', reference: '1 Corinthians 13:4' },
  { theme: 'Faith & Trust', question: 'Who said: "I can do all things through Christ who strengthens me"?', answer: 'Paul', reference: 'Philippians 4:13' },
  { theme: 'Wisdom & Knowledge', question: 'What is the beginning of wisdom according to Proverbs?', answer: 'Fear of the Lord', reference: 'Proverbs 9:10' },
];

type GameMode = 'solo' | 'multiplayer';
type MultiplayerView = 'choice' | 'create' | 'join' | 'waiting' | 'playing' | 'results';

export function QuickPlayModal({ isOpen, onClose, onStartQuiz }: QuickPlayModalProps) {
  const [gameMode, setGameMode] = useState<GameMode>('solo');
  const [multiplayerView, setMultiplayerView] = useState<MultiplayerView>('choice');
  
  // Solo settings
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [language, setLanguage] = useState('English');
  const [selectedThemes, setSelectedThemes] = useState<number[]>([1, 2, 4]);
  const [themeSearchQuery, setThemeSearchQuery] = useState('');

  // Multiplayer settings
  const [roomName, setRoomName] = useState('Bible Quiz Night');
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [roomCode, setRoomCode] = useState('');
  const [generatedRoomCode, setGeneratedRoomCode] = useState('ABC123');
  const [copied, setCopied] = useState(false);
  const [connectedPlayers, setConnectedPlayers] = useState([
    { id: '1', name: 'You', isHost: true, isReady: false, avatar: 'Y', color: 'from-purple-500 to-pink-500' },
  ]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ id: string, player: string, message: string }>>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate total verses from selected themes
  const totalVerses = availableThemes
    .filter(theme => selectedThemes.includes(theme.id))
    .reduce((sum, theme) => sum + theme.verses, 0);

  // Filter themes based on search
  const filteredThemes = availableThemes.filter(theme =>
    theme.name.toLowerCase().includes(themeSearchQuery.toLowerCase())
  );

  // Get random sample question from selected themes
  const selectedThemeNames = availableThemes
    .filter(theme => selectedThemes.includes(theme.id))
    .map(theme => theme.name);
  
  const sampleQuestion = sampleQuestions.find(q => 
    selectedThemeNames.includes(q.theme)
  ) || sampleQuestions[0];

  // Simulate players joining one by one
  useEffect(() => {
    if (multiplayerView === 'waiting') {
      // Sarah joins after 2 seconds
      const timer1 = setTimeout(() => {
        setConnectedPlayers(prev => {
          if (prev.find(p => p.id === '2')) return prev; // Already joined
          return [
            ...prev,
            { id: '2', name: 'Sarah', isHost: false, isReady: false, avatar: 'S', color: 'from-blue-500 to-cyan-500' }
          ];
        });
        // Add join message to chat
        setChatMessages(prev => [
          ...prev,
          { id: Date.now().toString(), player: 'System', message: '✨ Sarah joined the room!' }
        ]);
      }, 2000);

      // Mike joins after 4 seconds
      const timer2 = setTimeout(() => {
        setConnectedPlayers(prev => {
          if (prev.find(p => p.id === '3')) return prev; // Already joined
          return [
            ...prev,
            { id: '3', name: 'Mike', isHost: false, isReady: false, avatar: 'M', color: 'from-green-500 to-teal-500' }
          ];
        });
        // Add join message to chat
        setChatMessages(prev => [
          ...prev,
          { id: Date.now().toString() + '1', player: 'System', message: '✨ Mike joined the room!' }
        ]);
      }, 4000);

      // Emma joins after 6 seconds
      const timer3 = setTimeout(() => {
        setConnectedPlayers(prev => {
          if (prev.find(p => p.id === '4')) return prev; // Already joined
          return [
            ...prev,
            { id: '4', name: 'Emma', isHost: false, isReady: false, avatar: 'E', color: 'from-amber-500 to-yellow-500' }
          ];
        });
        // Add join message to chat
        setChatMessages(prev => [
          ...prev,
          { id: Date.now().toString() + '2', player: 'System', message: '✨ Emma joined the room!' }
        ]);
      }, 6000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [multiplayerView]);

  const toggleTheme = (id: number) => {
    setSelectedThemes((prev) =>
      prev.includes(id) ? prev.filter((themeId) => themeId !== id) : [...prev, id]
    );
  };

  const handleStartQuiz = () => {
    const settings = {
      timePerQuestion,
      numberOfQuestions,
      language,
      selectedThemes,
    };
    console.log('Solo Quiz settings:', settings);
    onStartQuiz();
  };

  const handleCreateRoom = () => {
    // Generate random 6-character room code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedRoomCode(code);
    
    // In real app: POST /api/multiplayer/create
    const roomSettings = {
      name: roomName,
      max_players: maxPlayers,
      question_count: numberOfQuestions,
      theme_ids: selectedThemes,
      language,
      room_code: code,
    };
    console.log('Create room:', roomSettings);
    setMultiplayerView('waiting');
  };

  const handleJoinRoom = () => {
    // In real app: POST /api/multiplayer/join
    console.log('Join room:', roomCode);
    setMultiplayerView('waiting');
  };

  const handleCopyCode = () => {
    // Fallback copy method for environments where Clipboard API is blocked
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(generatedRoomCode).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          // Fallback to older method
          fallbackCopy();
        });
      } else {
        // Use fallback immediately
        fallbackCopy();
      }
    } catch (err) {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    // Create temporary textarea
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

  const handleStartMultiplayerGame = () => {
    // In real app: POST /api/multiplayer/start
    console.log('Starting multiplayer game...');
    onStartQuiz(); // Navigate to quiz page in multiplayer mode
    onClose();
  };

  const resetToChoice = () => {
    setMultiplayerView('choice');
    setRoomCode('');
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#1a2942] border border-white/20 rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                {gameMode === 'multiplayer' && multiplayerView !== 'choice' && (
                  <button
                    onClick={resetToChoice}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white">Quick Play Quiz</h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {gameMode === 'solo' ? 'Solo Mode' : 'Multiplayer Mode'}
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
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Game Mode Selection */}
              <div className="space-y-4">
                <h3 className="text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">1</span>
                  Game Mode
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Solo Mode */}
                  <button
                    onClick={() => {
                      setGameMode('solo');
                      setMultiplayerView('choice');
                    }}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      gameMode === 'solo'
                        ? 'bg-teal-500/20 border-teal-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Play className={`w-5 h-5 ${gameMode === 'solo' ? 'text-teal-400' : 'text-gray-400'}`} />
                    <div className="flex-1 text-left">
                      <p className={`${gameMode === 'solo' ? 'text-teal-400' : 'text-white'}`}>
                        Solo Mode
                      </p>
                      <p className="text-xs text-gray-400">Play alone</p>
                    </div>
                  </button>

                  {/* Multiplayer Mode */}
                  <button
                    onClick={() => {
                      setGameMode('multiplayer');
                      setMultiplayerView('choice');
                    }}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      gameMode === 'multiplayer'
                        ? 'bg-orange-500/20 border-orange-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Users className={`w-5 h-5 ${gameMode === 'multiplayer' ? 'text-orange-400' : 'text-gray-400'}`} />
                    <div className="flex-1 text-left">
                      <p className={`${gameMode === 'multiplayer' ? 'text-orange-400' : 'text-white'}`}>
                        Multiplayer Mode
                      </p>
                      <p className="text-xs text-gray-400">Play with friends</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Solo Settings */}
              {gameMode === 'solo' && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">2</span>
                      Quiz Settings
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {/* Time Per Question */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          Time per Question
                        </label>
                        <select
                          value={timePerQuestion}
                          onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
                        >
                          <option value={15}>15 seconds</option>
                          <option value={30}>30 seconds</option>
                          <option value={45}>45 seconds</option>
                          <option value={60}>60 seconds</option>
                          <option value={90}>90 seconds</option>
                        </select>
                      </div>

                      {/* Number of Questions */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-400">
                          <Hash className="w-4 h-4" />
                          Number of Questions
                        </label>
                        <select
                          value={numberOfQuestions}
                          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
                        >
                          <option value={5}>5 questions</option>
                          <option value={10}>10 questions</option>
                          <option value={15}>15 questions</option>
                          <option value={20}>20 questions</option>
                          <option value={25}>25 questions</option>
                          <option value={50}>50 questions</option>
                        </select>
                      </div>

                      {/* Language */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-400">
                          <Globe className="w-4 h-4" />
                          Language
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">3</span>
                        Select Themes
                      </h3>
                      <p className="text-xs text-teal-400">{totalVerses} verses total</p>
                    </div>
                    
                    {/* Search bar */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                      <Search className="w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={themeSearchQuery}
                        onChange={(e) => setThemeSearchQuery(e.target.value)}
                        placeholder="Search themes..."
                        className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                      />
                    </div>

                    <motion.div layout className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      <AnimatePresence>
                        {filteredThemes.map((theme, index) => {
                          const isSelected = selectedThemes.includes(theme.id);
                          return (
                            <motion.label
                              key={theme.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ delay: index * 0.05 }}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-teal-500/20 border-teal-500/50 shadow-lg shadow-teal-500/10'
                                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleTheme(theme.id)}
                                className="w-4 h-4 rounded border-white/20 text-teal-500 focus:ring-teal-500/50"
                              />
                              
                              {/* Theme Icon with Gradient */}
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${theme.color} flex items-center justify-center flex-shrink-0`}>
                                <BookMarked className="w-5 h-5 text-white" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className={`truncate ${isSelected ? 'text-teal-400' : 'text-white'}`}>
                                    {theme.name}
                                  </p>
                                  {/* Tag */}
                                  {theme.tag && (
                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wide ${
                                      theme.tag === 'popular' 
                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    }`}>
                                      {theme.tag}
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <p className="text-xs text-gray-400">{theme.verses} verses</p>
                                  
                                  {/* Difficulty Badge */}
                                  <div className="flex items-center gap-1">
                                    {theme.difficulty === 'easy' && (
                                      <>
                                        <div className="w-1 h-2 rounded-full bg-green-400" />
                                        <div className="w-1 h-2 rounded-full bg-gray-600" />
                                        <div className="w-1 h-2 rounded-full bg-gray-600" />
                                        <span className="text-[10px] text-green-400 ml-1">Easy</span>
                                      </>
                                    )}
                                    {theme.difficulty === 'medium' && (
                                      <>
                                        <div className="w-1 h-2 rounded-full bg-amber-400" />
                                        <div className="w-1 h-2 rounded-full bg-amber-400" />
                                        <div className="w-1 h-2 rounded-full bg-gray-600" />
                                        <span className="text-[10px] text-amber-400 ml-1">Medium</span>
                                      </>
                                    )}
                                    {theme.difficulty === 'hard' && (
                                      <>
                                        <div className="w-1 h-2 rounded-full bg-red-400" />
                                        <div className="w-1 h-2 rounded-full bg-red-400" />
                                        <div className="w-1 h-2 rounded-full bg-red-400" />
                                        <span className="text-[10px] text-red-400 ml-1">Hard</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.label>
                          );
                        })}
                      </AnimatePresence>
                    </motion.div>

                    {selectedThemes.length === 0 && (
                      <p className="text-amber-400 text-sm flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                        <span>⚠️</span>
                        Please select at least one theme to start
                      </p>
                    )}
                    
                    {/* Preview Sample Question */}
                    {selectedThemes.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4"
                      >
                        <p className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                          <Sparkles className="w-3 h-3" />
                          Sample Question
                        </p>
                        <p className="text-white text-sm mb-2">{sampleQuestion.question}</p>
                        <p className="text-xs text-purple-400">{sampleQuestion.reference}</p>
                      </motion.div>
                    )}
                  </div>
                </>
              )}

              {/* Multiplayer: Choice */}
              {gameMode === 'multiplayer' && multiplayerView === 'choice' && (
                <div className="space-y-4">
                  <h3 className="text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">2</span>
                    Choose an Option
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Create Room */}
                    <button
                      onClick={() => setMultiplayerView('create')}
                      className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 hover:border-teal-500/50 transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-white mb-1">Create Room</p>
                        <p className="text-xs text-gray-400">Host a new game</p>
                      </div>
                    </button>

                    {/* Join Room */}
                    <button
                      onClick={() => setMultiplayerView('join')}
                      className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 hover:border-teal-500/50 transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-white mb-1">Join Room</p>
                        <p className="text-xs text-gray-400">Enter room code</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Multiplayer: Create Room */}
              {gameMode === 'multiplayer' && multiplayerView === 'create' && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">2</span>
                      Room Settings
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Room Name */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-400">
                          <BookOpen className="w-4 h-4" />
                          Room Name
                        </label>
                        <input
                          type="text"
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                          placeholder="Bible Quiz Night"
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50"
                        />
                      </div>

                      {/* Max Players */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-400">
                          <Users className="w-4 h-4" />
                          Max Players
                        </label>
                        <select
                          value={maxPlayers}
                          onChange={(e) => setMaxPlayers(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
                        >
                          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <option key={n} value={n}>{n} players</option>
                          ))}
                        </select>
                      </div>

                      {/* Number of Questions */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-400">
                          <Hash className="w-4 h-4" />
                          Questions
                        </label>
                        <select
                          value={numberOfQuestions}
                          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
                        >
                          <option value={5}>5 questions</option>
                          <option value={10}>10 questions</option>
                          <option value={15}>15 questions</option>
                          <option value={20}>20 questions</option>
                        </select>
                      </div>

                      {/* Language */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-400">
                          <Globe className="w-4 h-4" />
                          Language
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div className="space-y-4">
                    <h3 className="text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">3</span>
                      Select Themes
                    </h3>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {availableThemes.map((theme) => {
                        const isSelected = selectedThemes.includes(theme.id);
                        return (
                          <label
                            key={theme.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-teal-500/20 border-teal-500/50'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleTheme(theme.id)}
                              className="w-4 h-4 rounded border-white/20 text-teal-500 focus:ring-teal-500/50"
                            />
                            <BookOpen className={`w-4 h-4 ${isSelected ? 'text-teal-400' : 'text-gray-400'}`} />
                            <div className="flex-1">
                              <p className={`${isSelected ? 'text-teal-400' : 'text-white'}`}>
                                {theme.name}
                              </p>
                              <p className="text-xs text-gray-400">{theme.verses} verses</p>
                            </div>
                          </label>
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
                </>
              )}

              {/* Multiplayer: Join Room */}
              {gameMode === 'multiplayer' && multiplayerView === 'join' && (
                <div className="space-y-4">
                  <h3 className="text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">2</span>
                    Enter Room Code
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                      <Hash className="w-4 h-4" />
                      Room Code
                    </label>
                    <input
                      type="text"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      placeholder="ABC123"
                      maxLength={6}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-center text-2xl tracking-widest placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50"
                    />
                    <p className="text-xs text-gray-400 text-center">Enter the 6-character room code from your friend</p>
                  </div>
                </div>
              )}

              {/* Multiplayer: Waiting Room */}
              {gameMode === 'multiplayer' && multiplayerView === 'waiting' && (
                <>
                  {/* Room Code Display */}
                  <div className="space-y-4">
                    <h3 className="text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">2</span>
                      Room Code
                    </h3>
                    
                    <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-xl p-6">
                      <p className="text-gray-300 text-sm mb-4 text-center">Share this code with friends</p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        {generatedRoomCode.split('').map((char, i) => (
                          <div
                            key={i}
                            className="w-12 h-14 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white text-2xl font-mono"
                          >
                            {char}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="w-full px-4 py-2.5 rounded-lg bg-orange-500/20 border border-orange-500/50 text-orange-400 hover:bg-orange-500/30 transition-all flex items-center justify-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied to Clipboard!' : 'Copy Room Code'}
                      </button>
                    </div>
                  </div>

                  {/* Connected Players */}
                  <div className="space-y-4">
                    <h3 className="text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">3</span>
                      Players ({connectedPlayers.length}/{maxPlayers})
                    </h3>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      <AnimatePresence>
                        {connectedPlayers.map((player, index) => (
                          <motion.div
                            key={player.id}
                            initial={{ opacity: 0, x: -20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${player.color} flex items-center justify-center text-white text-sm border-2 border-white/20`}>
                              {player.avatar}
                            </div>
                            <div className="flex-1">
                              <p className="text-white">{player.name}</p>
                              {player.isHost && (
                                <p className="text-xs text-teal-400 flex items-center gap-1">
                                  <Crown className="w-3 h-3" />
                                  Host
                                </p>
                              )}
                            </div>
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-green-400" 
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* Empty slots */}
                      {Array.from({ length: maxPlayers - connectedPlayers.length }).map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 border-dashed opacity-50"
                        >
                          <div className="w-8 h-8 rounded-full bg-white/10" />
                          <div className="flex-1">
                            <p className="text-gray-500">Waiting for player...</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat */}
                  <div className="space-y-4">
                    <h3 className="text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">4</span>
                      Chat
                    </h3>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">
                            {msg.player[0]}
                          </div>
                          <div className="flex-1">
                            <p className="text-white">{msg.player}: {msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50"
                      />
                      <button
                        onClick={() => {
                          if (chatMessage.trim()) {
                            setChatMessages([
                              ...chatMessages,
                              { id: Date.now().toString(), player: 'You', message: chatMessage }
                            ]);
                            setChatMessage('');
                          }
                        }}
                        className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Send
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Multiplayer: Playing */}
              {gameMode === 'multiplayer' && multiplayerView === 'playing' && (
                <MultiplayerGameplay
                  onGameEnd={() => {
                    setMultiplayerView('results');
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 3000);
                  }}
                />
              )}

              {/* Multiplayer: Results */}
              {gameMode === 'multiplayer' && multiplayerView === 'results' && (
                <QuickPlayResults
                  showConfetti={showConfetti}
                  onPlayAgain={() => {
                    setMultiplayerView('waiting');
                    // Reset game state
                  }}
                  onBackToLobby={() => {
                    setMultiplayerView('choice');
                  }}
                  onClose={onClose}
                />
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between flex-shrink-0">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              
              {gameMode === 'solo' && (
                <button
                  onClick={handleStartQuiz}
                  disabled={selectedThemes.length === 0}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                >
                  <Play className="w-4 h-4" />
                  Start Quiz
                </button>
              )}

              {gameMode === 'multiplayer' && multiplayerView === 'create' && (
                <button
                  onClick={handleCreateRoom}
                  disabled={selectedThemes.length === 0 || !roomName}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                >
                  <Play className="w-4 h-4" />
                  Create Room
                </button>
              )}

              {gameMode === 'multiplayer' && multiplayerView === 'join' && (
                <button
                  onClick={handleJoinRoom}
                  disabled={roomCode.length !== 6}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                >
                  <Users className="w-4 h-4" />
                  Join Room
                </button>
              )}

              {gameMode === 'multiplayer' && multiplayerView === 'waiting' && (
                <button
                  onClick={handleStartMultiplayerGame}
                  disabled={connectedPlayers.length < 2}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                >
                  <Play className="w-4 h-4" />
                  Start Game ({connectedPlayers.length}/{maxPlayers})
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}