import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface VersionNavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: 'english' | 'swahili';
  currentVersion: string;
  onNavigate: (language: 'english' | 'swahili', version: string) => void;
  anchorRef?: React.RefObject<HTMLElement>;
}

interface LanguageVersions {
  name: string;
  key: 'english' | 'swahili';
  versions: { code: string; name: string }[];
}

const languageVersions: LanguageVersions[] = [
  {
    name: 'English',
    key: 'english',
    versions: [{ code: 'KJCV', name: 'King James Cambridge Version' }],
  },
  {
    name: 'Swahili',
    key: 'swahili',
    versions: [{ code: 'SUV', name: 'Swahili Union Version' }],
  },
];

export function VersionNavDropdown({
  isOpen,
  onClose,
  currentLanguage,
  currentVersion,
  onNavigate,
  anchorRef,
}: VersionNavDropdownProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'swahili'>(currentLanguage);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected language when current language changes
  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

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

  const selectedLangData = languageVersions.find(l => l.key === selectedLanguage);
  const versions = selectedLangData?.versions || [];

  const handleNavigate = (version: string) => {
    onNavigate(selectedLanguage, version);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 mt-2 w-[600px] max-w-[90vw] bg-[#1a2942] border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="flex max-h-[70vh]">
            {/* Left Sidebar - Languages */}
            <div className="w-48 border-r border-white/10 flex flex-col bg-[#0f1a2e]">
              {/* Header */}
              <div className="p-3 border-b border-white/10 bg-gradient-to-r from-teal-500/10 to-blue-500/10">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-400" />
                  <span className="text-white text-sm font-medium">Language</span>
                </div>
              </div>

              {/* Languages List */}
              <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-0.5">
                  {languageVersions.map((lang) => (
                    <button
                      key={lang.key}
                      onClick={() => setSelectedLanguage(lang.key)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg transition-all flex items-center justify-between text-sm ${
                        selectedLanguage === lang.key
                          ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-white border border-teal-500/30'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{lang.name}</span>
                      {lang.key === currentLanguage && (
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Versions */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Version Header */}
              <div className="p-3 border-b border-white/10 bg-gradient-to-r from-teal-500/10 to-blue-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-sm font-medium">{selectedLangData?.name}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {versions.length} {versions.length === 1 ? 'version' : 'versions'} available
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

              {/* Versions List */}
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-2">
                  {versions.map((version) => {
                    const isCurrent = version.code === currentVersion && selectedLanguage === currentLanguage;
                    
                    return (
                      <motion.button
                        key={version.code}
                        onClick={() => handleNavigate(version.code)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          w-full text-left p-3 rounded-lg
                          transition-all duration-200
                          ${isCurrent 
                            ? 'bg-gradient-to-br from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30' 
                            : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium text-sm ${isCurrent ? 'text-white' : 'text-white'}`}>
                              {version.code}
                            </div>
                            <div className={`text-xs mt-0.5 ${isCurrent ? 'text-white/80' : 'text-gray-400'}`}>
                              {version.name}
                            </div>
                          </div>
                          {isCurrent && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Footer - Status */}
              <div className="p-3 border-t border-white/10 bg-white/5">
                <div className="flex items-center gap-4 justify-center flex-wrap text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-400">Current Version</span>
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
