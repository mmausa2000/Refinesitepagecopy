import { motion, AnimatePresence } from 'motion/react';
import { X, BarChart3, Search, Plus } from 'lucide-react';
import { useState } from 'react';

interface ToolsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCreator: () => void;
}

type TabType = 'stats' | 'search' | 'create';

export function ToolsSidebar({ isOpen, onClose, onNavigateToCreator }: ToolsSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>('stats');
  const [searchQuery, setSearchQuery] = useState('');
  const [bulkVerses, setBulkVerses] = useState('');

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

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1a2942] border-l border-white/20 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-white">Bible Tools</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-4 border-b border-white/10">
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'stats'
                    ? 'bg-teal-500/20 text-teal-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Stats</span>
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'search'
                    ? 'bg-teal-500/20 text-teal-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search</span>
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'create'
                    ? 'bg-teal-500/20 text-teal-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Create</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'stats' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-white mb-4">Your Statistics</h3>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Global Rank</span>
                      <span className="text-teal-400">#1,247</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Themes Created</span>
                      <span className="text-white">23</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Total Verses</span>
                      <span className="text-white">456</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">High Score</span>
                      <span className="text-green-400">9,850</span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <div className="flex-1">
                          <div className="text-white text-sm">Completed Challenge</div>
                          <div className="text-gray-500 text-xs">Speed of the Spirit - 2 hours ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <div className="flex-1">
                          <div className="text-white text-sm">Created Theme</div>
                          <div className="text-gray-500 text-xs">Psalms Collection - Yesterday</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-400" />
                        <div className="flex-1">
                          <div className="text-white text-sm">Practiced Verses</div>
                          <div className="text-gray-500 text-xs">John 3:16 - 2 days ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'search' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-white mb-4">Search Bible</h3>
                  
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for themes, verses, or topics..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50"
                  />

                  {searchQuery ? (
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="text-white mb-1">John 3:16</div>
                        <p className="text-gray-400 text-sm">For God so loved the world that he gave his one and only Son...</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="text-white mb-1">Psalms 23:1</div>
                        <p className="text-gray-400 text-sm">The Lord is my shepherd; I shall not want...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      Start typing to search the Bible
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'create' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-white mb-4">Create Theme</h3>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <label className="text-gray-400 text-sm mb-2 block">Theme Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Faith & Hope"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 mb-4"
                    />

                    <label className="text-gray-400 text-sm mb-2 block">Add Verses (Bulk Entry)</label>
                    <textarea
                      value={bulkVerses}
                      onChange={(e) => setBulkVerses(e.target.value)}
                      placeholder="Paste verses in format:&#10;John 3:16&#10;Psalms 23:1&#10;Romans 8:28"
                      rows={8}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 resize-none"
                    />
                  </div>

                  <button
                    onClick={() => {
                      onNavigateToCreator();
                      onClose();
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white transition-colors"
                  >
                    Create Theme
                  </button>

                  <button
                    onClick={() => {
                      onNavigateToCreator();
                      onClose();
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    Open Theme Creator (Manual Entry)
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
