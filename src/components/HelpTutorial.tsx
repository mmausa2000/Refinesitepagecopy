import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HelpTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: 'Welcome to U Bible',
    content: 'U Bible is your interactive platform for Bible study, memorization, and collaboration. Let\'s walk through the key features!',
    pointer: null,
  },
  {
    title: 'Quick Play Button',
    content: 'Click this glowing button to start a quiz instantly! Choose solo or multiplayer mode to test your Bible knowledge.',
    pointer: { position: 'center', arrow: 'down' },
  },
  {
    title: 'Practice Mode',
    content: 'Click the Book icon in the sidebar to enter Practice mode. Study verses with flashcards that hide and reveal text to test your memory.',
    pointer: { position: 'left-sidebar', arrow: 'right' },
  },
  {
    title: 'Theme Creator',
    content: 'Click the Document icon to create custom study themes. Add verses manually or paste them in bulk format.',
    pointer: { position: 'left-sidebar', arrow: 'right' },
  },
  {
    title: 'Daily Challenges',
    content: 'Click the Calendar icon to view daily challenges. Test your knowledge and earn points with timed scripture quizzes.',
    pointer: { position: 'left-sidebar', arrow: 'right' },
  },
  {
    title: 'Team Portal',
    content: 'Click the Trophy icon to join teams, compete on leaderboards, and participate in group challenges with friends.',
    pointer: { position: 'left-sidebar', arrow: 'right' },
  },
  {
    title: 'UBot AI Assistant',
    content: 'Click the Message icon to chat with UBot, your AI Bible study assistant. Ask questions and get instant scripture guidance.',
    pointer: { position: 'left-sidebar', arrow: 'right' },
  },
  {
    title: 'Bible Reader',
    content: 'Click the Bible icon to open the full Bible reader with highlighting, notes, annotations, and cross-references.',
    pointer: { position: 'left-sidebar', arrow: 'right' },
  },
  {
    title: 'Top Badges',
    content: 'These three badges at the top give you quick access to your Account, Bible Tools, and this Tutorial.',
    pointer: { position: 'top-badges', arrow: 'down' },
  },
  {
    title: 'Bible Tools Sidebar',
    content: 'Click the "Bible Tools" badge to access your stats, search the Bible, and quickly create new themes.',
    pointer: { position: 'top-right', arrow: 'up' },
  },
  {
    title: 'Progress Tracking',
    content: 'Your progress is automatically saved. Track verses memorized, challenges completed, and maintain your daily streak!',
    pointer: null,
  },
  {
    title: 'You\'re Ready!',
    content: 'That\'s it! Start your journey by practicing verses, creating themes, or joining a challenge. Happy studying!',
    pointer: null,
  },
];

export function HelpTutorial({ isOpen, onClose }: HelpTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('ubible-tutorial-completed', 'true');
    onClose();
  };

  const getPointerPosition = () => {
    const pointer = tutorialSteps[currentStep].pointer;
    if (!pointer) return null;

    switch (pointer.position) {
      case 'center':
        return { top: '45%', left: '50%', transform: 'translate(-50%, -50%)' };
      case 'left-sidebar':
        return { top: '50%', left: '80px', transform: 'translateY(-50%)' };
      case 'top-badges':
        return { top: '60px', left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { top: '60px', right: '100px' };
      default:
        return null;
    }
  };

  const getSpotlightPosition = () => {
    const pointer = tutorialSteps[currentStep].pointer;
    if (!pointer) return null;

    switch (pointer.position) {
      case 'center':
        return { top: '50%', left: '50%', width: '200px', height: '200px', transform: 'translate(-50%, -50%)' };
      case 'left-sidebar':
        return { top: '50%', left: '16px', width: '64px', height: '400px', transform: 'translateY(-50%)' };
      case 'top-badges':
        return { top: '16px', left: '50%', width: '400px', height: '60px', transform: 'translateX(-50%)' };
      case 'top-right':
        return { top: '16px', right: '16px', width: '300px', height: '60px' };
      default:
        return null;
    }
  };

  const pointerStyle = getPointerPosition();
  const spotlightStyle = getSpotlightPosition();
  const currentPointer = tutorialSteps[currentStep].pointer;

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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Spotlight Overlay - highlights the target area */}
          <AnimatePresence>
            {spotlightStyle && (
              <motion.div
                key={`spotlight-${currentStep}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={spotlightStyle}
                className="fixed z-[51] pointer-events-none"
              >
                {/* Glowing border */}
                <div className="absolute inset-0 rounded-xl border-4 border-teal-400 shadow-[0_0_30px_rgba(45,212,191,0.6)]" />
                {/* Pulsing glow effect */}
                <motion.div
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 rounded-xl bg-teal-400/20"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Arrow Pointer - points to the target */}
          <AnimatePresence>
            {pointerStyle && currentPointer && (
              <motion.div
                key={`pointer-${currentStep}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                style={pointerStyle}
                className="fixed z-[52] pointer-events-none"
              >
                {/* Animated Arrow */}
                <motion.div
                  animate={{
                    y: currentPointer.arrow === 'down' ? [0, 10, 0] : 
                       currentPointer.arrow === 'up' ? [0, -10, 0] : 0,
                    x: currentPointer.arrow === 'right' ? [0, 10, 0] : 
                       currentPointer.arrow === 'left' ? [0, -10, 0] : 0,
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="relative"
                >
                  {/* Arrow with glow */}
                  <div className="relative">
                    {currentPointer.arrow === 'down' && (
                      <ArrowDown className="w-16 h-16 text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]" strokeWidth={2.5} />
                    )}
                    {currentPointer.arrow === 'up' && (
                      <ArrowUp className="w-16 h-16 text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]" strokeWidth={2.5} />
                    )}
                    {currentPointer.arrow === 'right' && (
                      <ArrowRight className="w-16 h-16 text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]" strokeWidth={2.5} />
                    )}
                    {currentPointer.arrow === 'left' && (
                      <ArrowLeft className="w-16 h-16 text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]" strokeWidth={2.5} />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tutorial Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#1a2942] border border-white/20 rounded-2xl shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <span className="text-teal-400">?</span>
                </div>
                <div>
                  <h2 className="text-white">Interactive Tutorial</h2>
                  <p className="text-gray-400 text-sm">
                    Step {currentStep + 1} of {tutorialSteps.length}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-white text-xl mb-4">
                  {tutorialSteps[currentStep].title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {tutorialSteps[currentStep].content}
                </p>
              </motion.div>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2 px-6 pb-4">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-8 bg-teal-400'
                      : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-white/10">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentStep === 0
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep === tutorialSteps.length - 1 ? (
                <button
                  onClick={handleComplete}
                  className="px-6 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors"
                >
                  Complete Tutorial
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}