import { Play, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  onQuickPlay: () => void;
}

// Mock theme data - replace with real data from API/Supabase
const mockThemes = [
  { id: 1, name: 'Fruits of the Spirit', verses: 12, category: 'Character' },
  { id: 2, name: 'Jesus Miracles', verses: 20, category: 'Gospels' },
  { id: 3, name: 'Psalms of Praise', verses: 15, category: 'Worship' },
  { id: 4, name: 'Armor of God', verses: 8, category: 'Spiritual Warfare' },
  { id: 5, name: 'Beatitudes', verses: 9, category: 'Teaching' },
  { id: 6, name: 'Love Chapter', verses: 13, category: 'Love' },
  { id: 7, name: 'Faith Heroes', verses: 18, category: 'Faith' },
  { id: 8, name: 'Creation Story', verses: 10, category: 'Genesis' },
  { id: 9, name: 'Ten Commandments', verses: 10, category: 'Law' },
  { id: 10, name: 'Parables of Jesus', verses: 25, category: 'Teaching' },
];

const rotatingPhrases = [
  'Master scripture through engaging practice sessions',
  'Memorize verses through powerful study tools',
  'Transform your faith through immersive challenges',
  'Understand God\'s Word through interactive learning'
];

export function HeroSection({ onQuickPlay }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Rotate phrases every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filter themes based on search query
  const filteredThemes = searchQuery.trim()
    ? mockThemes.filter(theme =>
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const showResults = isFocused && searchQuery.trim().length > 0;

  const handleSelectTheme = (theme: typeof mockThemes[0]) => {
    console.log('Selected theme:', theme);
    setSearchQuery('');
    setIsFocused(false);
    // TODO: Navigate to practice page with selected theme
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-8 pt-8"
    >
      {/* Title */}
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-5xl mb-3"
        >
          Welcome to U Bible
        </motion.h1>
        <div className="h-7 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhraseIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.5 }}
              className="text-gray-300"
            >
              {rotatingPhrases[currentPhraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Play Button with pulsing animation */}
      <motion.button 
        initial={{ scale: 0 }}
        animate={isHovering ? {
          scale: [1, 1.12, 1]
        } : {
          scale: 1
        }}
        transition={isHovering ? {
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        } : {
          duration: 0.5, delay: 0.4, type: "spring"
        }}
        whileTap={{ scale: 1.2 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
          isHovering 
            ? 'bg-orange-500 shadow-orange-500/25' 
            : 'bg-green-500 shadow-green-500/20'
        }`}
        onClick={onQuickPlay}
      >
        <motion.div 
          className={`absolute inset-0 rounded-full transition-colors duration-300 ${
            isHovering ? 'bg-orange-400' : 'bg-green-500'
          }`}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <Play className="relative w-6 h-6 text-white fill-white ml-1" />
      </motion.button>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full max-w-md relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
        <input
          type="text"
          placeholder="Search themes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full bg-[#1a2942]/60 backdrop-blur-sm border border-white/10 rounded-full px-12 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        )}

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 w-full bg-[#1a2942]/95 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/20 z-50"
            >
              {filteredThemes.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  {filteredThemes.map((theme, index) => (
                    <motion.button
                      key={theme.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelectTheme(theme)}
                      className="w-full px-4 py-3 hover:bg-white/10 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-white group-hover:text-blue-400 transition-colors">
                          {theme.name}
                        </span>
                        <span className="text-gray-500 text-xs">{theme.category}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{theme.verses} verses</span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-gray-400">No themes found</p>
                  <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}