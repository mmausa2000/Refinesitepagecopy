import { useState } from 'react';
import { Plus, X, FileText, Shuffle } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';

interface Verse {
  id: number;
  reference: string;
  text: string;
}

export function ThemeCreatorPage() {
  const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');
  const [verses, setVerses] = useState<Verse[]>([{ id: 1, reference: '', text: '' }]);
  const [themeName, setThemeName] = useState('');
  const [shuffleEnabled, setShuffleEnabled] = useState(false);

  const addVerse = () => {
    setVerses([...verses, { id: verses.length + 1, reference: '', text: '' }]);
  };

  const removeVerse = (id: number) => {
    if (verses.length > 1) {
      setVerses(verses.filter(v => v.id !== id));
    }
  };

  const updateVerse = (id: number, field: 'reference' | 'text', value: string) => {
    setVerses(verses.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  return (
    <div className="flex-1 flex flex-col min-h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-3 md:px-8 py-3 md:py-4 border-b border-white/10 gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
            </div>
            <div className="min-w-0">
              <h1 className="text-white text-lg md:text-2xl truncate">Theme Creator</h1>
              <p className="text-gray-400 text-xs md:text-sm hidden sm:block">Paste your verses below to create custom themes</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-gray-400 text-xs md:text-sm hidden md:inline">Language</span>
            <Select defaultValue="kjv">
              <SelectTrigger className="w-16 md:w-32 bg-[#1a2942] border-white/10 text-white text-xs md:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kjv">KJV</SelectItem>
                <SelectItem value="niv">NIV</SelectItem>
                <SelectItem value="esv">ESV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="hidden sm:flex items-center gap-1 md:gap-2">
            <Shuffle className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
            <span className="text-gray-400 text-xs md:text-sm hidden lg:inline">Shuffle</span>
            <Switch 
              checked={shuffleEnabled} 
              onCheckedChange={setShuffleEnabled}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Theme Name */}
          <Input
            placeholder="Theme Name: S______"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            className="bg-[#1a2942]/60 border-white/10 text-white placeholder:text-gray-500 h-12"
          />

          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-3 rounded-lg border transition-all ${
                activeTab === 'manual'
                  ? 'bg-green-500/20 border-green-500/50 text-green-400'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Manual Entry
              </span>
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`flex-1 py-3 rounded-lg border transition-all ${
                activeTab === 'bulk'
                  ? 'bg-green-500/20 border-green-500/50 text-green-400'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                📋 Bulk Paste
              </span>
            </button>
          </div>

          {/* Manual Entry Content */}
          {activeTab === 'manual' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-gray-400 text-sm">
                Verses: {verses.length}
              </div>

              {verses.map((verse, index) => (
                <motion.div
                  key={verse.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative bg-[#1a2942]/40 border border-white/10 rounded-lg p-6 space-y-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400">Verse {index + 1}</span>
                    {verses.length > 1 && (
                      <button
                        onClick={() => removeVerse(verse.id)}
                        className="w-6 h-6 rounded bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    )}
                  </div>

                  <Input
                    placeholder="Reference (e.g., John 3:16)"
                    value={verse.reference}
                    onChange={(e) => updateVerse(verse.id, 'reference', e.target.value)}
                    className="bg-[#0f1a2e]/60 border-white/10 text-white placeholder:text-gray-500"
                  />

                  <Textarea
                    placeholder="Verse text..."
                    value={verse.text}
                    onChange={(e) => updateVerse(verse.id, 'text', e.target.value)}
                    className="bg-[#0f1a2e]/60 border-white/10 text-white placeholder:text-gray-500 min-h-[120px] resize-none"
                  />
                </motion.div>
              ))}

              <button
                onClick={addVerse}
                className="w-full py-4 border-2 border-dashed border-green-500/30 rounded-lg text-green-400 hover:border-green-500/50 hover:bg-green-500/5 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Verse
              </button>
            </motion.div>
          )}

          {/* Bulk Paste Content */}
          {activeTab === 'bulk' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Textarea
                placeholder="Paste verses here in format: Reference | Verse text (one per line)"
                className="bg-[#1a2942]/60 border-white/10 text-white placeholder:text-gray-500 min-h-[400px] resize-none"
              />
            </motion.div>
          )}

          {/* Action Button */}
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white h-12">
            <FileText className="w-4 h-4 mr-2" />
            Parse & Preview Verses
          </Button>
        </div>
      </main>
    </div>
  );
}