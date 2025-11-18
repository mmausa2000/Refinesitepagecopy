import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Sparkles,
  Users,
  Zap,
  UserPlus,
  LogIn,
  X,
} from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAccount: () => void;
  onLogin: () => void;
}

export function WelcomeModal({
  isOpen,
  onClose,
  onCreateAccount,
  onLogin,
}: WelcomeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - NON-DISMISSIBLE (no onClick) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal - MANDATORY (no close button) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 bg-gradient-to-br from-[#1a2942] via-[#1e3a5f] to-[#1a2942] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-6 md:p-8">
              {/* Header with Icon */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 mb-4 shadow-lg shadow-teal-500/30">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-white text-3xl mb-2">
                  Welcome to U Bible! 🌟
                </h2>

                <p className="text-gray-300 text-lg">
                  Your interactive Bible study companion
                </p>
              </div>

              {/* Features Grid - 3 COLUMNS */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white mb-2">
                    AI-Powered Study
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Get insights with UBot AI assistant
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-teal-400" />
                  </div>
                  <h3 className="text-white mb-2">
                    Practice & Quiz
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Master verses with flashcards & challenges
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white mb-2">
                    Team Learning
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Collaborate with friends & join teams
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-md mx-auto">
                <button
                  onClick={() => {
                    onClose();
                    onCreateAccount();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Create Free Account</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login to Existing Account</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <span className="text-sm">
                    Continue as Guest
                  </span>
                </button>
              </div>

              {/* Footer Note */}
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Create an account to save your progress, earn XP, and unlock all features!
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}