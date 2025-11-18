import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Search, Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface BibleNavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentBook: string;
  currentChapter: number;
  books: string[];
  bookChapters: Record<string, number>;
  onNavigate: (book: string, chapter: number) => void;
  completedChapters?: Record<string, number[]>;
  anchorRef?: React.RefObject<HTMLElement>;
}

export function BibleNavDropdown({
  isOpen,
  onClose,
  currentBook,
  currentChapter,
  books,
  bookChapters,
  onNavigate,
  completedChapters = {},
  anchorRef,
}: BibleNavDropdownProps) {
  const [selectedBook, setSelectedBook] = useState(currentBook);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected book when current book changes
  useEffect(() => {
    setSelectedBook(currentBook);
  }, [currentBook]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, anchorRef]);

  const filteredBooks = books.filter(book =>
    book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalChapters = bookChapters[selectedBook] || 50;
  const completed = completedChapters[selectedBook] || [];

  const handleNavigate = (chapter: number) => {
    onNavigate(selectedBook, chapter);
    onClose();
  };

  const isCompleted = (chapter: number) => completed.includes(chapter);
  const isCurrent = (chapter: number) => chapter === currentChapter && selectedBook === currentBook;

  // Organize books into Old Testament and New Testament
  const oldTestament = books.slice(0, 39);
  const newTestament = books.slice(39);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 mt-2 w-[800px] max-w-[90vw] bg-[#1a2942] border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="flex max-h-[70vh]">
            {/* Left Sidebar - Books */}
            <div className="w-64 border-r border-white/10 flex flex-col bg-[#0f1a2e]">
              {/* Header */}
              <div className="p-3 border-b border-white/10 bg-gradient-to-r from-teal-500/10 to-blue-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <span className="text-white text-sm font-medium">Select Book</span>
                </div>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-2 py-1.5 text-white text-xs focus:outline-none focus:border-teal-500/50"
                  />
                </div>
              </div>

              {/* Books List */}
              <div className="flex-1 overflow-y-auto p-2">
                {searchQuery ? (
                  // Filtered results
                  <div className="space-y-0.5">
                    {filteredBooks.map((book) => (
                      <button
                        key={book}
                        onClick={() => setSelectedBook(book)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between text-sm ${
                          selectedBook === book
                            ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-white border border-teal-500/30'
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{book}</span>
                        {book === currentBook && (
                          <Check className="w-3.5 h-3.5 text-teal-400" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  // Organized by Testament
                  <>
                    {/* Old Testament */}
                    <div className="mb-4">
                      <div className="px-2 py-1.5 text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                        <span>Old Testament</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                      </div>
                      <div className="space-y-0.5 mt-1">
                        {oldTestament.map((book) => (
                          <button
                            key={book}
                            onClick={() => setSelectedBook(book)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between text-xs ${
                              selectedBook === book
                                ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-white border border-teal-500/30'
                                : 'text-gray-300 hover:bg-white/5'
                            }`}
                          >
                            <span>{book}</span>
                            {book === currentBook && (
                              <Check className="w-3 h-3 text-teal-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* New Testament */}
                    <div>
                      <div className="px-2 py-1.5 text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                        <span>New Testament</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                      </div>
                      <div className="space-y-0.5 mt-1">
                        {newTestament.map((book) => (
                          <button
                            key={book}
                            onClick={() => setSelectedBook(book)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between text-xs ${
                              selectedBook === book
                                ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-white border border-teal-500/30'
                                : 'text-gray-300 hover:bg-white/5'
                            }`}
                          >
                            <span>{book}</span>
                            {book === currentBook && (
                              <Check className="w-3 h-3 text-teal-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Side - Chapters */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Chapter Header */}
              <div className="p-3 border-b border-white/10 bg-gradient-to-r from-teal-500/10 to-blue-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-sm font-medium">{selectedBook}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {totalChapters} {totalChapters === 1 ? 'chapter' : 'chapters'}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chapter Grid - with padding to prevent tooltip cutoff */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-3">
                <div className="grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1.5 pt-12 pb-12">
                  {Array.from({ length: totalChapters }, (_, i) => i + 1).map((chapter) => {
                    const completed = isCompleted(chapter);
                    const current = isCurrent(chapter);
                    const hovered = hoveredChapter === chapter;

                    return (
                      <motion.button
                        key={chapter}
                        onClick={() => handleNavigate(chapter)}
                        onMouseEnter={() => setHoveredChapter(chapter)}
                        onMouseLeave={() => setHoveredChapter(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          relative aspect-square rounded-lg flex items-center justify-center
                          transition-all duration-200 text-xs
                          ${current 
                            ? 'bg-gradient-to-br from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30 font-semibold' 
                            : completed
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20'
                          }
                        `}
                      >
                        {completed && !current && (
                          <Check className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-green-400" />
                        )}
                        <span>{chapter}</span>
                        
                        {/* Hover tooltip - positioned absolutely relative to button */}
                        <AnimatePresence>
                          {hovered && !current && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0f1a2e] border border-white/20 rounded-md px-2 py-1 text-[10px] text-white whitespace-nowrap shadow-xl z-[100] pointer-events-none"
                            >
                              {selectedBook} {chapter}
                              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0f1a2e] border-r border-b border-white/20 rotate-45" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Footer - Legend */}
              <div className="p-3 border-t border-white/10 bg-white/5">
                <div className="flex items-center gap-4 justify-center flex-wrap text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-br from-teal-500 to-blue-500" />
                    <span className="text-gray-400">Current</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-green-400" />
                    </div>
                    <span className="text-gray-400">Read</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10" />
                    <span className="text-gray-400">Unread</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}