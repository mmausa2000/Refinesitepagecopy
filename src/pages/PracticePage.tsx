import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Volume2, Globe, BookMarked, RotateCw, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { MyThemesModal } from '../components/MyThemesModal';

type PracticeMode = 'verse-to-ref' | 'ref-to-verse' | 'both';
type Language = 'english' | 'swahili';

interface BilingualCard {
  id: string;
  bookId: number;
  book: string;
  chapter: number;
  verse: number;
  englishText: string;
  swahiliText: string;
  theme: string;
}

// Mock bilingual card data (in real app, this comes from Supabase)
const mockCards: BilingualCard[] = [
  {
    id: '1',
    bookId: 43,
    book: 'John',
    chapter: 3,
    verse: 16,
    englishText: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    swahiliText: 'Kwa maana Mungu aliupenda ulimwengu hivi hata akamtoa Mwanawe wa pekee, ili kila mtu amwaminiye asipotee, bali awe na uzima wa milele.',
    theme: 'Love & Compassion'
  },
  {
    id: '2',
    bookId: 23,
    book: 'Isaiah',
    chapter: 40,
    verse: 31,
    englishText: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    swahiliText: 'Bali wale wamngojao Bwana watafanya upya nguvu zao; watapaa juu kwa mabawa kama tai; watakimbia, wala hawatachoka; watatembea, wala hawatalegea.',
    theme: 'Faith & Trust'
  },
  {
    id: '3',
    bookId: 19,
    book: 'Psalm',
    chapter: 23,
    verse: 1,
    englishText: 'The LORD is my shepherd; I shall not want.',
    swahiliText: 'Bwana ni mchungaji wangu; sitapungukiwa na kitu.',
    theme: 'Faith & Trust'
  },
  {
    id: '4',
    bookId: 20,
    book: 'Proverbs',
    chapter: 3,
    verse: 5,
    englishText: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
    swahiliText: 'Mtumainie Bwana kwa moyo wako wote, wala usitegemee ufahamu wako mwenyewe.',
    theme: 'Faith & Trust'
  },
  {
    id: '5',
    bookId: 45,
    book: 'Romans',
    chapter: 8,
    verse: 28,
    englishText: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    swahiliText: 'Nasi tunajua ya kuwa Mungu hufanya mambo yote kwa pamoja kuwa mema kwa wale wampendao, yaani, wale walioitwa sawasawa na kusudi lake.',
    theme: 'Love & Compassion'
  }
];

export function PracticePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('verse-to-ref');
  const [language, setLanguage] = useState<Language>('english');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [isThemesModalOpen, setIsThemesModalOpen] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  // Filter cards based on selected theme
  const filteredCards = selectedTheme === 'all' 
    ? mockCards 
    : mockCards.filter(card => card.theme === selectedTheme);

  const totalCards = filteredCards.length;
  const currentCard = filteredCards[currentCardIndex];

  // Get unique themes for dropdown
  const themes = ['all', ...Array.from(new Set(mockCards.map(c => c.theme)))];

  const getReference = (card: BilingualCard) => {
    return `${card.book} ${card.chapter}:${card.verse}`;
  };

  const getVerseText = (card: BilingualCard) => {
    return language === 'english' ? card.englishText : card.swahiliText;
  };

  const getFrontContent = () => {
    if (!currentCard) return '';
    
    switch (practiceMode) {
      case 'verse-to-ref':
        return getVerseText(currentCard);
      case 'ref-to-verse':
        return getReference(currentCard);
      case 'both':
        return `${getReference(currentCard)}\n\n${getVerseText(currentCard)}`;
      default:
        return '';
    }
  };

  const getBackContent = () => {
    if (!currentCard) return '';
    
    switch (practiceMode) {
      case 'verse-to-ref':
        return getReference(currentCard);
      case 'ref-to-verse':
        return getVerseText(currentCard);
      case 'both':
        return `${getVerseText(currentCard)}\n\n${getReference(currentCard)}`;
      default:
        return '';
    }
  };

  const nextCard = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'swahili' : 'english');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLElement && 
          (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT')) {
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          flipCard();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextCard();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevCard();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentCardIndex, isFlipped, totalCards]);

  // Reset card index when theme changes
  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [selectedTheme]);

  return (
    <div className="flex-1 flex flex-col min-h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-3 md:px-8 py-3 md:py-4 border-b border-white/10 gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
              <Brain className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
            </div>
            <div className="min-w-0">
              <h1 className="text-white text-lg md:text-2xl truncate">U Bible Practice</h1>
              <p className="text-green-400 text-xs md:text-sm">Card {currentCardIndex + 1} of {totalCards}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-4 flex-shrink-0">
          <button
            onClick={() => setIsThemesModalOpen(true)}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/50 text-teal-400 transition-colors"
          >
            <BookMarked className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm hidden xl:inline">My Themes</span>
          </button>

          {/* Practice Mode Selector */}
          <Select value={practiceMode} onValueChange={(value) => setPracticeMode(value as PracticeMode)}>
            <SelectTrigger className="w-20 sm:w-24 md:w-28 lg:w-40 bg-[#1a2942] border-white/10 text-white text-xs md:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="verse-to-ref">V → R</SelectItem>
              <SelectItem value="ref-to-verse">R → V</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>

          {/* Theme Selector - Hidden on smallest screens */}
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
            <SelectTrigger className="hidden sm:flex w-20 md:w-32 lg:w-48 bg-[#1a2942] border-white/10 text-white text-xs md:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Themes</SelectItem>
              {Array.from(new Set(mockCards.map(c => c.theme))).map(theme => (
                <SelectItem key={theme} value={theme}>{theme}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Language Toggle */}
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger className="hidden lg:flex w-32 bg-[#1a2942] border-white/10 text-white text-sm">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="swahili">Swahili</SelectItem>
            </SelectContent>
          </Select>

          {/* Stats - Hidden on mobile and tablet */}
          <div className="hidden xl:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-medium">0 Mastered</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <Star className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 text-xs font-medium">284 Reviewing</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCardIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative"
              style={{ perspective: '1500px' }}
            >
              {/* 3D Card Container */}
              <div
                onClick={flipCard}
                className="relative cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease-out',
                }}
              >
                {/* Front Side - Complete Card */}
                <div
                  className="bg-[#1a2942]/60 backdrop-blur-sm border border-white/20 rounded-2xl p-12 min-h-[400px] flex flex-col items-center justify-center text-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div className="space-y-6 w-full">
                    {/* Flip hint at top */}
                    <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
                      <RotateCw className="w-4 h-4" />
                      <span className="text-sm">Flip Card (Space)</span>
                    </div>
                    
                    {practiceMode === 'verse-to-ref' || practiceMode === 'both' ? (
                      <p className="text-white text-2xl leading-relaxed whitespace-pre-line">
                        {getFrontContent()}
                      </p>
                    ) : (
                      <p className="text-blue-400 text-3xl">
                        {getFrontContent()}
                      </p>
                    )}
                    
                    {/* Card Actions - Bottom Center */}
                    <div className="flex items-center justify-center gap-3 pt-4">
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        title="Mark as favorite"
                      >
                        <Star className="w-5 h-5 text-gray-400" />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        title="Mark as mastered"
                      >
                        <CheckCircle2 className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Back Side - Complete Card */}
                <div
                  className="absolute inset-0 bg-[#1a2942]/60 backdrop-blur-sm border border-white/20 rounded-2xl p-12 min-h-[400px] flex flex-col items-center justify-center text-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="space-y-6 w-full">
                    {/* Flip hint at top */}
                    <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
                      <RotateCw className="w-4 h-4" />
                      <span className="text-sm">Flip Back</span>
                    </div>
                    
                    {practiceMode === 'verse-to-ref' ? (
                      <p className="text-blue-400 text-3xl">
                        {getBackContent()}
                      </p>
                    ) : (
                      <p className="text-white text-2xl leading-relaxed whitespace-pre-line">
                        {getBackContent()}
                      </p>
                    )}
                    
                    {/* Listen button */}
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Audio play logic here
                        }}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span className="text-sm">Listen</span>
                      </button>
                    </div>
                    
                    {/* Card Actions - Bottom Center (Back side) */}
                    <div className="flex items-center justify-center gap-3 pt-4">
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        title="Mark as favorite"
                      >
                        <Star className="w-5 h-5 text-gray-400" />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        title="Mark as mastered"
                      >
                        <CheckCircle2 className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              onClick={prevCard}
              disabled={currentCardIndex === 0}
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={nextCard}
              disabled={currentCardIndex === totalCards - 1}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-1 mt-6">
            {Array.from({ length: Math.min(15, totalCards) }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === currentCardIndex 
                    ? 'w-8 h-1.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' 
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40 hover:scale-125'
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* My Themes Modal */}
      <MyThemesModal 
        isOpen={isThemesModalOpen} 
        onClose={() => setIsThemesModalOpen(false)} 
      />
    </div>
  );
}