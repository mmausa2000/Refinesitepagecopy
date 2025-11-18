import { FileText, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { PageType } from '../App';

interface ProfileMenuProps {
  isOpen: boolean;
  onNavigate: (page: PageType) => void;
  onClose: () => void;
}

export function ProfileMenu({ isOpen, onNavigate, onClose }: ProfileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-30" 
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-20 left-4 z-40 w-80 bg-[#1a2942] border border-white/20 rounded-2xl p-6 shadow-2xl"
          >
            {/* Username */}
            <div className="text-white mb-6 pb-6 border-b border-white/10">
              @Rabbi_Mali
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  onNavigate('creator');
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-green-500/20 text-white hover:bg-green-500/30 transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span>Theme Creator</span>
              </button>

              <button
                onClick={() => {
                  // Handle logout
                  console.log('Logout clicked');
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
