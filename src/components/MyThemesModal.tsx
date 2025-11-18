import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Filter, BookOpen, Lock, Globe } from 'lucide-react';
import { useState } from 'react';

interface MyThemesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockThemes = [
  { id: 1, name: 'Love & Compassion', verses: 45, testament: 'Both', visibility: 'Public', selected: true },
  { id: 2, name: 'Faith & Trust', verses: 32, testament: 'New', visibility: 'Public', selected: false },
  { id: 3, name: 'Psalms Collection', verses: 78, testament: 'Old', visibility: 'Private', selected: true },
  { id: 4, name: 'Wisdom & Knowledge', verses: 56, testament: 'Both', visibility: 'Public', selected: false },
  { id: 5, name: 'Prayer & Worship', verses: 41, testament: 'Both', visibility: 'Private', selected: true },
  { id: 6, name: 'Hope & Encouragement', verses: 38, testament: 'New', visibility: 'Public', selected: false },
];

export function MyThemesModal({ isOpen, onClose }: MyThemesModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<number[]>([1, 3, 5]);
  const [filterTestament, setFilterTestament] = useState<'All' | 'Old' | 'New' | 'Both'>('All');
  const [filterVisibility, setFilterVisibility] = useState<'All' | 'Public' | 'Private'>('All');

  const filteredThemes = mockThemes.filter((theme) => {
    const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTestament = filterTestament === 'All' || theme.testament === filterTestament;
    const matchesVisibility = filterVisibility === 'All' || theme.visibility === filterVisibility;
    return matchesSearch && matchesTestament && matchesVisibility;
  });

  const toggleTheme = (id: number) => {
    setSelectedThemes((prev) =>
      prev.includes(id) ? prev.filter((themeId) => themeId !== id) : [...prev, id]
    );
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[80vh] bg-[#1a2942] border border-white/20 rounded-2xl shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-white">My Themes</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {selectedThemes.length} theme{selectedThemes.length !== 1 ? 's' : ''} selected
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Filters */}
            <div className="p-6 border-b border-white/10 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search themes..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-gray-400" />
                
                {/* Testament Filter */}
                <select
                  value={filterTestament}
                  onChange={(e) => setFilterTestament(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-500/50"
                >
                  <option value="All">All Testaments</option>
                  <option value="Old">Old Testament</option>
                  <option value="New">New Testament</option>
                  <option value="Both">Both</option>
                </select>

                {/* Visibility Filter */}
                <select
                  value={filterVisibility}
                  onChange={(e) => setFilterVisibility(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-500/50"
                >
                  <option value="All">All Visibility</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>

            {/* Themes List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-4">
                {filteredThemes.map((theme) => {
                  const isSelected = selectedThemes.includes(theme.id);
                  return (
                    <motion.button
                      key={theme.id}
                      onClick={() => toggleTheme(theme.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        isSelected
                          ? 'bg-teal-500/20 border-teal-500/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className={`w-4 h-4 ${isSelected ? 'text-teal-400' : 'text-gray-400'}`} />
                          <h3 className={`${isSelected ? 'text-teal-400' : 'text-white'}`}>
                            {theme.name}
                          </h3>
                        </div>
                        {theme.visibility === 'Private' ? (
                          <Lock className="w-3 h-3 text-gray-500" />
                        ) : (
                          <Globe className="w-3 h-3 text-gray-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{theme.verses} verses</span>
                        <span>•</span>
                        <span>{theme.testament}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {filteredThemes.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No themes found matching your filters
                </div>
              )}
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
                onClick={() => {
                  console.log('Selected themes:', selectedThemes);
                  onClose();
                }}
                className="px-6 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors"
              >
                Apply Selection ({selectedThemes.length})
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
