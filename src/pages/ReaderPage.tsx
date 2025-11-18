import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, BookOpen, X, Menu, StickyNote, Copy, Share2, Plus, Bookmark, Highlighter, HelpCircle, Star, Eraser, ExternalLink, Filter, Check, Maximize2, Minimize2, Users, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { CollaborativeReading } from '../components/CollaborativeReading';
import { BibleNavDropdown } from '../components/BibleNavDropdown';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

type HighlightColor = 'gold' | 'blue' | 'green' | 'orange' | 'red' | null;

interface Verse {
  number: number;
  text: string;
  highlights?: HighlightColor;
  bookmarked?: boolean;
  note?: string;
}

interface CrossReference {
  verse: string;
  text: string;
  quality: number;
  type: 'prophecy' | 'parallel' | 'quotation' | 'thematic' | 'cross-reference';
  testament: 'OT-NT' | 'NT-OT' | 'OT-OT' | 'NT-NT';
}

interface Annotation {
  word: string;
  type: 'hebrew' | 'greek' | 'alternate' | 'implied' | 'scholarly';
  pronunciation?: string;
  meaning: string;
  context?: string;
}

const mockVerses: Verse[] = [
  { number: 1, text: "In the beginning God created the heaven and the earth." },
  { number: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
  { number: 3, text: "And God said, Let there be light: and there was light." },
  { number: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
  { number: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
];

const mockCrossReferences: CrossReference[] = [
  { verse: "John 1:1", text: "In the beginning was the Word, and the Word was with God...", quality: 5, type: 'parallel', testament: 'OT-NT' },
  { verse: "Hebrews 11:3", text: "Through faith we understand that the worlds were framed...", quality: 4, type: 'thematic', testament: 'OT-NT' },
  { verse: "Psalm 33:6", text: "By the word of the LORD were the heavens made...", quality: 4, type: 'cross-reference', testament: 'OT-OT' },
  { verse: "Colossians 1:16", text: "For by him were all things created, that are in heaven...", quality: 5, type: 'quotation', testament: 'OT-NT' },
  { verse: "Isaiah 40:26", text: "Lift up your eyes on high, and behold who hath created...", quality: 3, type: 'prophecy', testament: 'OT-OT' },
];

const mockAnnotations: Annotation[] = [
  { 
    word: "beginning", 
    type: 'hebrew', 
    pronunciation: "rê'shîyth", 
    meaning: "The first, in place, time, order or rank",
    context: "Also appears in: Proverbs 8:23, Psalm 111:10"
  },
  { 
    word: "created", 
    type: 'hebrew', 
    pronunciation: "bārā'", 
    meaning: "To create, shape, form. Used exclusively for divine creation",
    context: "Also appears in: Genesis 1:27, Isaiah 45:18"
  },
  { 
    word: "God", 
    type: 'hebrew', 
    pronunciation: "Elohim", 
    meaning: "Plural form suggesting majesty and power. The supreme God",
    context: "Used 2,600+ times in the Old Testament"
  },
];

// List of books in the Bible
const books = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
  '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah',
  'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
  'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah',
  'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
  'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
  '1 John', '2 John', '3 John', 'Jude', 'Revelation'
];

// Chapter counts for each book of the Bible
const bookChapters: Record<string, number> = {
  'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
  'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
  '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
  'Ezra': 10, 'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150,
  'Proverbs': 31, 'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66,
  'Jeremiah': 52, 'Lamentations': 5, 'Ezekiel': 48, 'Daniel': 12,
  'Hosea': 14, 'Joel': 3, 'Amos': 9, 'Obadiah': 1, 'Jonah': 4, 'Micah': 7,
  'Nahum': 3, 'Habakkuk': 3, 'Zephaniah': 3, 'Haggai': 2, 'Zechariah': 14,
  'Malachi': 4, 'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28,
  'Romans': 16, '1 Corinthians': 16, '2 Corinthians': 13, 'Galatians': 6,
  'Ephesians': 6, 'Philippians': 4, 'Colossians': 4, '1 Thessalonians': 5,
  '2 Thessalonians': 3, '1 Timothy': 6, '2 Timothy': 4, 'Titus': 3,
  'Philemon': 1, 'Hebrews': 13, 'James': 5, '1 Peter': 5, '2 Peter': 3,
  '1 John': 5, '2 John': 1, '3 John': 1, 'Jude': 1, 'Revelation': 22
};

const highlightColors = [
  { color: 'gold' as const, bgColor: '#ca8a04' },
  { color: 'blue' as const, bgColor: '#2563eb' },
  { color: 'green' as const, bgColor: '#16a34a' },
  { color: 'orange' as const, bgColor: '#ea580c' },
  { color: 'red' as const, bgColor: '#dc2626' },
];

interface ReaderPageProps {
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
}

export function ReaderPage({ focusMode, setFocusMode }: ReaderPageProps) {
  const [language, setLanguage] = useState<'english' | 'swahili'>('english');
  const [version, setVersion] = useState<'KJV' | 'SUV'>('KJV');
  const [currentBook, setCurrentBook] = useState('Genesis');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [verses, setVerses] = useState<Verse[]>(mockVerses);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [toolsSidebarOpen, setToolsSidebarOpen] = useState(false);
  const [toolsTab, setToolsTab] = useState<'saved' | 'themes' | 'search'>('saved');
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [currentVerseForAction, setCurrentVerseForAction] = useState<number | null>(null);
  const [showAnnotationHelp, setShowAnnotationHelp] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [crossRefFilter, setCrossRefFilter] = useState<'all' | CrossReference['type']>('all');
  const [navigationHistory, setNavigationHistory] = useState<{ book: string; chapter: number; verse: number }[]>([]);
  const [collaborativeReadingOpen, setCollaborativeReadingOpen] = useState(false);
  const [chapterNavModalOpen, setChapterNavModalOpen] = useState(false);
  
  const navButtonRef = useRef<HTMLButtonElement>(null);

  const getConnectionTypeStyle = (type: CrossReference['type']) => {
    switch (type) {
      case 'prophecy': return { bg: 'bg-yellow-600/20', text: 'text-yellow-400', label: 'Prophecy/Type' };
      case 'parallel': return { bg: 'bg-blue-600/20', text: 'text-blue-400', label: 'Parallel' };
      case 'quotation': return { bg: 'bg-purple-600/20', text: 'text-purple-400', label: 'Quotation' };
      case 'thematic': return { bg: 'bg-green-600/20', text: 'text-green-400', label: 'Thematic' };
      case 'cross-reference': return { bg: 'bg-gray-600/20', text: 'text-gray-400', label: 'Cross Ref' };
    }
  };

  const getAnnotationTypeStyle = (type: Annotation['type']) => {
    switch (type) {
      case 'hebrew': return { bg: 'bg-green-600/20', border: 'border-green-600', text: 'text-green-400', label: 'Hebrew' };
      case 'greek': return { bg: 'bg-blue-600/20', border: 'border-blue-600', text: 'text-blue-400', label: 'Greek' };
      case 'alternate': return { bg: 'bg-yellow-600/20', border: 'border-yellow-600', text: 'text-yellow-400', label: 'Alternate Reading' };
      case 'implied': return { bg: 'bg-gray-600/20', border: 'border-gray-600', text: 'text-gray-400', label: 'Implied Word' };
      case 'scholarly': return { bg: 'bg-purple-600/20', border: 'border-purple-600', text: 'text-purple-400', label: 'Scholarly Note' };
    }
  };

  const handleHighlight = (verseNum: number, color: HighlightColor) => {
    setVerses(verses.map(v => 
      v.number === verseNum ? { ...v, highlights: v.highlights === color ? null : color } : v
    ));
    if (verses.find(v => v.number === verseNum)?.highlights === color) {
      toast.success('Highlight removed');
    } else {
      toast.success(`Verse highlighted as ${color}`);
    }
  };

  const handleBookmark = (verseNum: number) => {
    setVerses(verses.map(v => 
      v.number === verseNum ? { ...v, bookmarked: !v.bookmarked } : v
    ));
  };

  const handleOpenNoteModal = (verseNum: number) => {
    const verse = verses.find(v => v.number === verseNum);
    setNoteText(verse?.note || '');
    setCurrentVerseForAction(verseNum);
    setNoteModalOpen(true);
  };

  const handleSaveNote = () => {
    if (currentVerseForAction !== null) {
      setVerses(verses.map(v => 
        v.number === currentVerseForAction ? { ...v, note: noteText } : v
      ));
      toast.success('Note saved successfully');
      setNoteModalOpen(false);
      setNoteText('');
    }
  };

  const handleCopyVerse = (verse: Verse) => {
    navigator.clipboard.writeText(verse.text);
    toast.success('Verse copied to clipboard');
  };

  const handleShare = (verseNum: number) => {
    setCurrentVerseForAction(verseNum);
    setShareModalOpen(true);
  };

  const handleAddToTheme = (verseNum: number) => {
    toast.success('Verse added to theme builder');
  };

  const getHighlightClass = (color: HighlightColor) => {
    switch (color) {
      case 'gold': return 'bg-yellow-500/30';
      case 'blue': return 'bg-blue-500/30';
      case 'green': return 'bg-green-500/30';
      case 'orange': return 'bg-orange-500/30';
      case 'red': return 'bg-red-500/30';
      default: return '';
    }
  };

  const handleNavigateToCrossRef = (ref: CrossReference) => {
    // Save current position to history
    if (selectedVerse) {
      setNavigationHistory([...navigationHistory, { book: currentBook, chapter: currentChapter, verse: selectedVerse }]);
    }
    
    // Parse the cross-reference (e.g., "John 1:1")
    const [bookPart, versePart] = ref.verse.split(' ').join('').match(/([A-Za-z\s]+)(\d+):(\d+)/)?.slice(1, 4) || [];
    
    // For demo, just show a toast with navigation
    toast.success(`Navigating to ${ref.verse}`, {
      description: 'This will jump to the verse in your Bible reader'
    });
    
    // In real app, this would update currentBook, currentChapter, and scroll to verse
    // setCurrentBook(bookName);
    // setCurrentChapter(chapterNum);
    // setSelectedVerse(verseNum);
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 0) {
      const previous = navigationHistory[navigationHistory.length - 1];
      setCurrentBook(previous.book);
      setCurrentChapter(previous.chapter);
      setSelectedVerse(previous.verse);
      setNavigationHistory(navigationHistory.slice(0, -1));
      toast.success('Returned to previous verse');
    }
  };

  const handleReturnToMainVerse = () => {
    // Close the annotation/cross-ref panel and return focus to the verse
    const verseToFocus = selectedVerse;
    setSelectedVerse(null);
    
    // Scroll to the verse in the main reader
    setTimeout(() => {
      const verseElement = document.getElementById(`verse-${verseToFocus}`);
      if (verseElement) {
        verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    toast.success(`Returned to verse ${verseToFocus}`);
  };

  const filteredCrossReferences = crossRefFilter === 'all' 
    ? mockCrossReferences 
    : mockCrossReferences.filter(ref => ref.type === crossRefFilter);

  // Handle chapter navigation from modal
  const handleChapterSelect = (chapter: number) => {
    setCurrentChapter(chapter);
    toast.success(`Jumped to ${currentBook} ${chapter}`);
  };

  const handleBookChange = (direction: 'prev' | 'next') => {
    const currentIndex = books.indexOf(currentBook);
    if (direction === 'prev' && currentIndex > 0) {
      const newBook = books[currentIndex - 1];
      setCurrentBook(newBook);
      setCurrentChapter(1);
      toast.success(`Opened ${newBook}`);
    } else if (direction === 'next' && currentIndex < books.length - 1) {
      const newBook = books[currentIndex + 1];
      setCurrentBook(newBook);
      setCurrentChapter(1);
      toast.success(`Opened ${newBook}`);
    }
  };

  // Spacebar to toggle focus mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input/textarea
      if (e.code === 'Space' && e.target instanceof HTMLElement && 
          e.target.tagName !== 'INPUT' && 
          e.target.tagName !== 'TEXTAREA' &&
          e.target.tagName !== 'SELECT') {
        e.preventDefault();
        setFocusMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setFocusMode]);

  return (
    <div className="flex-1 flex flex-col relative min-h-full">
      {/* Top Bar */}
      <motion.div
        initial={false}
        animate={{
          y: focusMode ? -100 : 0,
          opacity: focusMode ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex items-center px-3 md:px-8 py-3 md:py-4 border-b border-white/10 gap-2"
      >
        {/* Book Navigator Dropdown */}
        <div className="relative">
          <button
            ref={navButtonRef}
            onClick={() => setChapterNavModalOpen(!chapterNavModalOpen)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            <span>{currentBook} {currentChapter}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          
          {/* Bible Navigator Dropdown */}
          <BibleNavDropdown
            isOpen={chapterNavModalOpen}
            onClose={() => setChapterNavModalOpen(false)}
            currentBook={currentBook}
            currentChapter={currentChapter}
            books={books}
            bookChapters={bookChapters}
            onNavigate={(book, chapter) => {
              setCurrentBook(book);
              setCurrentChapter(chapter);
              toast.success(`Opened ${book} ${chapter}`);
            }}
            completedChapters={{}} // TODO: Track completed chapters per book
            anchorRef={navButtonRef}
          />
        </div>

        {/* Previous Chapter Arrow */}
        <button
          onClick={() => setCurrentChapter(Math.max(1, currentChapter - 1))}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Next Chapter Arrow */}
        <button
          onClick={() => setCurrentChapter(currentChapter + 1)}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Globe Icon (Standalone) */}
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
          <Globe className="w-4 h-4" />
        </div>

        {/* Language Dropdown */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'english' | 'swahili')}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
        >
          <option value="english">English</option>
          <option value="swahili">Swahili</option>
        </select>

        {/* Version Dropdown */}
        <select
          value={version}
          onChange={(e) => setVersion(e.target.value as 'KJV' | 'SUV')}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
        >
          {language === 'english' ? (
            <>
              <option value="KJV">KJV</option>
              <option value="NIV">NIV</option>
              <option value="ESV">ESV</option>
            </>
          ) : (
            <option value="SUV">SUV</option>
          )}
        </select>

        {/* Spacer to push right controls to the end */}
        <div className="flex-1" />

        {/* Collaborative Reading Icon */}
        <button
          onClick={() => setCollaborativeReadingOpen(true)}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          title="Read Together"
        >
          <Users className="w-4 h-4" />
        </button>

        {/* Focus Mode Icon */}
        <button
          onClick={() => setFocusMode(!focusMode)}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          title={focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Menu Icon */}
        <button
          onClick={() => setToolsSidebarOpen(!toolsSidebarOpen)}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>
      </motion.div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Understudy Notes */}
        <AnimatePresence>
          {!focusMode && (selectedVerse || selectedAnnotation) && (
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              className="w-96 bg-[#0f1a2e] border-r border-white/10 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-white">Understudy Notes</h2>
                <button
                  onClick={() => {
                    setSelectedVerse(null);
                    setSelectedAnnotation(null);
                  }}
                  className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Cross References Section */}
                {selectedVerse && (
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white">Cross References</h3>
                      <div className="flex items-center gap-2">
                        {navigationHistory.length > 0 && (
                          <button
                            onClick={handleGoBack}
                            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            <ChevronLeft className="w-3 h-3" />
                            Back
                          </button>
                        )}
                        <span className="text-xs text-gray-400">{filteredCrossReferences.length} found</span>
                      </div>
                    </div>
                    <div 
                      onClick={handleReturnToMainVerse}
                      className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm cursor-pointer hover:bg-blue-500/30 hover:border-blue-500/50 transition-all group"
                      title="Click to return to this verse in the main reader"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{currentBook} {currentChapter}:{selectedVerse}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    {/* Cross-Ref Filter Bar */}
                    <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Filter className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-400">Filter by type:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setCrossRefFilter('all')}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            crossRefFilter === 'all'
                              ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                              : 'bg-white/5 text-gray-400 hover:bg-white/10'
                          }`}
                        >
                          All ({mockCrossReferences.length})
                        </button>
                        {(['prophecy', 'parallel', 'quotation', 'thematic', 'cross-reference'] as const).map((type) => {
                          const style = getConnectionTypeStyle(type);
                          const count = mockCrossReferences.filter(r => r.type === type).length;
                          return (
                            <button
                              key={type}
                              onClick={() => setCrossRefFilter(type)}
                              className={`px-2 py-1 rounded text-xs transition-colors ${
                                crossRefFilter === type
                                  ? `${style.bg} ${style.text} border border-current`
                                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                              }`}
                            >
                              {style.label} ({count})
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {filteredCrossReferences.map((ref, idx) => {
                        const typeStyle = getConnectionTypeStyle(ref.type);
                        return (
                          <div
                            key={idx}
                            className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-blue-400">{ref.verse}</span>
                              <div className="flex items-center gap-2">
                                {ref.testament.includes('OT-NT') || ref.testament.includes('NT-OT') ? (
                                  <span className="px-1.5 py-0.5 rounded text-xs bg-purple-500/20 text-purple-400">
                                    {ref.testament}
                                  </span>
                                ) : null}
                                <div className="flex gap-0.5">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-2.5 h-2.5 ${
                                        i < ref.quality ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-0.5 rounded text-xs ${typeStyle.bg} ${typeStyle.text}`}>
                                {typeStyle.label}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{ref.text}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavigateToCrossRef(ref);
                              }}
                              className="w-full mt-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-blue-400 text-xs flex items-center justify-center gap-1 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Navigate
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Annotations Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white">Annotations</h3>
                    <button
                      onClick={() => setShowAnnotationHelp(!showAnnotationHelp)}
                      className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5"
                      title="Show annotation types"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Annotation Help Legend */}
                  <AnimatePresence>
                    {showAnnotationHelp && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-4 bg-white/5 border border-white/10 rounded-lg p-3 space-y-2 overflow-hidden"
                      >
                        <p className="text-gray-400 text-xs mb-2">Annotation Types:</p>
                        {[
                          { type: 'hebrew' as const, desc: 'Original Hebrew word' },
                          { type: 'greek' as const, desc: 'Original Greek word' },
                          { type: 'alternate' as const, desc: 'Alternative reading' },
                          { type: 'implied' as const, desc: 'Added for clarity' },
                          { type: 'scholarly' as const, desc: 'Expert commentary' },
                        ].map((item) => {
                          const style = getAnnotationTypeStyle(item.type);
                          return (
                            <div key={item.type} className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-xs ${style.bg} ${style.text}`}>
                                {style.label}
                              </span>
                              <span className="text-gray-400 text-xs">{item.desc}</span>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Annotations List */}
                  {selectedAnnotation ? (
                    <div className="space-y-3">
                      {mockAnnotations.map((annotation, idx) => {
                        const style = getAnnotationTypeStyle(annotation.type);
                        return (
                          <div
                            key={idx}
                            className={`border-l-4 ${style.border} ${style.bg} border border-white/10 rounded-lg p-3`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`px-2 py-0.5 rounded text-xs ${style.bg} ${style.text}`}>
                                {style.label}
                              </span>
                            </div>
                            <p className="text-white mb-1">{annotation.word}</p>
                            {annotation.pronunciation && (
                              <p className="text-gray-400 text-sm italic mb-2">/{annotation.pronunciation}/</p>
                            )}
                            <p className="text-gray-300 text-sm mb-2">{annotation.meaning}</p>
                            {annotation.context && (
                              <p className="text-gray-400 text-xs pt-2 border-t border-white/10">
                                {annotation.context}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-sm">
                        Click on underlined words to see scholarly notes and explanations
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center - Reading Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12 pb-24">
            {/* Chapter Title */}
            <h1 className="text-white text-2xl text-center mb-12">
              {currentBook} {currentChapter}
            </h1>

            {/* Verses */}
            <div className="space-y-6">
              {verses.map((verse) => (
                <motion.div
                  key={verse.number}
                  id={`verse-${verse.number}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: verse.number * 0.05 }}
                  onMouseEnter={() => setHoveredVerse(verse.number)}
                  onMouseLeave={() => setHoveredVerse(null)}
                  onClick={() => setSelectedVerse(selectedVerse === verse.number ? null : verse.number)}
                  className={`relative group cursor-pointer ${getHighlightClass(verse.highlights)} rounded-lg p-4 transition-all ${
                    verse.highlights 
                      ? (selectedVerse === verse.number ? 'ring-2 ring-white/30' : '') 
                      : (selectedVerse === verse.number ? 'bg-white/5' : 'hover:bg-white/5')
                  }`}
                >
                  <div className="flex gap-4">
                    <span className="text-blue-400 select-none flex-shrink-0">
                      {verse.number}
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-200 leading-relaxed">
                        {verse.text}
                      </p>
                      {verse.note && (
                        <div className="mt-2 flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
                          <StickyNote className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <p className="text-blue-300 text-sm italic">{verse.note}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Verse Action Toolbar */}
                  {selectedVerse === verse.number && !focusMode && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1a2942] border border-white/20 rounded-lg p-2 flex items-center gap-1 shadow-xl z-10"
                    >
                      {/* Highlight Colors with Active Indicator */}
                      {highlightColors.map((option) => {
                        const isActive = verse.highlights === option.color;
                        return (
                          <button
                            key={option.color}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHighlight(verse.number, option.color);
                            }}
                            className={`w-6 h-6 rounded flex items-center justify-center hover:scale-110 transition-all relative ${
                              isActive ? 'ring-2 ring-white ring-offset-1 ring-offset-[#1a2942]' : ''
                            }`}
                            style={{ backgroundColor: option.bgColor }}
                            title={`Highlight ${option.color}${isActive ? ' (active)' : ''}`}
                          >
                            {isActive ? (
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            ) : (
                              <Highlighter className="w-3 h-3 text-white" />
                            )}
                          </button>
                        );
                      })}
                      
                      {/* Clear Highlight Button */}
                      {verse.highlights && (
                        <>
                          <div className="w-px h-6 bg-white/10 mx-1" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHighlight(verse.number, verse.highlights);
                            }}
                            className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            title="Remove highlight"
                          >
                            <Eraser className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      
                      <div className="w-px h-6 bg-white/10 mx-1" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmark(verse.number);
                        }}
                        className={`w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors ${
                          verse.bookmarked ? 'text-yellow-400' : 'text-gray-400'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenNoteModal(verse.number);
                        }}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Add Note"
                      >
                        <StickyNote className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyVerse(verse);
                        }}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Copy"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(verse.number);
                        }}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToTheme(verse.number);
                        }}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Add to Theme"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Chapter Navigation */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/10">
              <button
                onClick={() => setCurrentChapter(Math.max(1, currentChapter - 1))}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Chapter
              </button>
              <button
                onClick={() => setCurrentChapter(currentChapter + 1)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                Next Chapter
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Tools Sidebar */}
        <AnimatePresence>
          {toolsSidebarOpen && !focusMode && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="w-96 bg-[#0f1a2e] border-l border-white/10 flex flex-col"
            >
              {/* Tabs */}
              <div className="border-b border-white/10 flex">
                {[
                  { id: 'saved', label: 'Saved Verses' },
                  { id: 'themes', label: 'Theme Builder' },
                  { id: 'search', label: 'Search' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setToolsTab(tab.id as typeof toolsTab)}
                    className={`flex-1 px-4 py-3 text-sm transition-colors ${
                      toolsTab === tab.id
                        ? 'text-white border-b-2 border-blue-500 bg-white/5'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {toolsTab === 'saved' && (
                  <div className="space-y-3">
                    <h3 className="text-white mb-4">Your Saved Verses</h3>
                    {verses.filter(v => v.highlights || v.note || v.bookmarked).length === 0 ? (
                      <p className="text-gray-400 text-sm">No saved verses yet</p>
                    ) : (
                      verses.filter(v => v.highlights || v.note || v.bookmarked).map((verse) => (
                        <div
                          key={verse.number}
                          className={`border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer ${getHighlightClass(verse.highlights)}`}
                          onClick={() => setSelectedVerse(verse.number)}
                        >
                          <p className="text-blue-400 text-sm mb-2">
                            {currentBook} {currentChapter}:{verse.number}
                          </p>
                          <p className="text-gray-300 text-sm">{verse.text}</p>
                          {verse.note && (
                            <p className="text-blue-300 text-sm italic mt-2 pt-2 border-t border-white/10">
                              Note: {verse.note}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {toolsTab === 'themes' && (
                  <div>
                    <h3 className="text-white mb-4">Theme Builder</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Hover over verses and click + to add them to your theme
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                      <p className="text-gray-400 text-sm">
                        0 verses added to current theme
                      </p>
                      <button className="mt-3 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm">
                        Save Theme
                      </button>
                    </div>
                  </div>
                )}

                {toolsTab === 'search' && (
                  <div>
                    <h3 className="text-white mb-4">Search</h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search verses..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500/50">
                        <option>All Testaments</option>
                        <option>Old Testament</option>
                        <option>New Testament</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Note Modal */}
      <AnimatePresence>
        {noteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setNoteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a2942] border border-white/20 rounded-xl p-6 max-w-lg w-full"
            >
              <h3 className="text-white mb-4">Add Note</h3>
              <p className="text-gray-400 text-sm mb-4">
                {currentBook} {currentChapter}:{currentVerseForAction}
              </p>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your note here..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white resize-none focus:outline-none focus:border-blue-500/50 min-h-32"
                autoFocus
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSaveNote}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                >
                  Save Note
                </button>
                <button
                  onClick={() => setNoteModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a2942] border border-white/20 rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-white mb-4">Share Verse</h3>
              <p className="text-gray-400 text-sm mb-6">
                {currentBook} {currentChapter}:{currentVerseForAction}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    toast.success('Link copied to clipboard');
                    setShareModalOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors text-left"
                >
                  Copy Shareable Link
                </button>
                <button
                  onClick={() => {
                    toast.success('Shared to Twitter');
                    setShareModalOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors text-left"
                >
                  Share on Twitter
                </button>
                <button
                  onClick={() => {
                    toast.success('Shared to Facebook');
                    setShareModalOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors text-left"
                >
                  Share on Facebook
                </button>
              </div>
              <button
                onClick={() => setShareModalOpen(false)}
                className="w-full mt-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focus Mode Exit */}
      {focusMode && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setFocusMode(false)}
          className="fixed top-4 right-4 w-10 h-10 rounded-lg bg-[#1a2942] border border-white/20 text-white hover:bg-white/5 transition-colors z-50 flex items-center justify-center"
          title="Exit Focus Mode"
        >
          <Minimize2 className="w-4 h-4" />
        </motion.button>
      )}

      {/* Collaborative Reading Modal */}
      <CollaborativeReading
        isOpen={collaborativeReadingOpen}
        onClose={() => setCollaborativeReadingOpen(false)}
        currentBook={currentBook}
        currentChapter={currentChapter}
        currentVerse={selectedVerse || 1}
      />
    </div>
  );
}