import { useState } from 'react';
import { motion } from 'motion/react';
import './styles/globals.css'; // Import global styles
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { ReaderPage } from './pages/ReaderPage';
import { PracticePage } from './pages/PracticePage';
import { ThemeCreatorPage } from './pages/ThemeCreatorPage';
import { TeamPortalPage } from './pages/TeamPortalPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { UBotPage } from './pages/UBotPage';
import { QuizPage } from './pages/QuizPage';
import { WelcomeModal } from './components/WelcomeModal';
import { CreateAccountModal } from './components/CreateAccountModal';
import { LoginModal } from './components/LoginModal';

export type PageType = 'home' | 'reader' | 'practice' | 'creator' | 'calendar' | 'challenges' | 'messages' | 'profile' | 'quiz';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [focusMode, setFocusMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  
  // Welcome modal state
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('ubible_has_visited');
    return !hasVisited;
    // TEMPORARY: Always show for testing
    // return true;
  });
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('ubible_has_visited', 'true');
  };

  const handleLogout = () => {
    // Clear the visited flag so welcome modal shows again
    localStorage.removeItem('ubible_has_visited');
    // Show the welcome modal
    setShowWelcome(true);
  };

  const handleAccountCreated = () => {
    console.log('Account created from welcome flow');
    // Handle successful account creation
  };

  const handleLoginSuccess = () => {
    console.log('Login successful from welcome flow');
    // Handle successful login
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage 
          onNavigateToQuiz={(multiplayer = false) => {
            setIsMultiplayer(multiplayer);
            setCurrentPage('quiz');
          }} 
          onLogout={handleLogout}
        />;
      case 'reader':
        return <ReaderPage focusMode={focusMode} setFocusMode={setFocusMode} />;
      case 'practice':
        return <PracticePage />;
      case 'creator':
        return <ThemeCreatorPage />;
      case 'calendar':
        return <ChallengesPage />;
      case 'challenges':
        return <TeamPortalPage />;
      case 'messages':
        return <UBotPage />;
      case 'quiz':
        return <QuizPage onNavigateHome={() => setCurrentPage('home')} isMultiplayer={isMultiplayer} />;
      default:
        return <HomePage 
          onNavigateToQuiz={(multiplayer = false) => {
            setIsMultiplayer(multiplayer);
            setCurrentPage('quiz');
          }} 
          onLogout={handleLogout}
        />;
    }
  };

  return (
    <div className="size-full flex bg-gradient-to-br from-[#1a2942] via-[#253854] to-[#2d4663] relative">
      {/* Animated starry background effect */}
      <div className={`absolute inset-0 pointer-events-none ${currentPage === 'reader' ? 'opacity-5' : 'opacity-30'}`}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Hover trigger area for focus mode */}
      {focusMode && (
        <div 
          className="absolute left-0 top-0 bottom-0 w-4 z-30"
          onMouseEnter={() => setShowSidebar(true)}
        />
      )}

      {/* Sidebar with focus mode animation */}
      <motion.div
        initial={false}
        animate={{
          x: focusMode && !showSidebar ? -56 : 0,
          opacity: focusMode && !showSidebar ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onMouseLeave={() => focusMode && setShowSidebar(false)}
        className="relative z-20"
      >
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      </motion.div>
      
      <div className="flex-1 flex flex-col relative z-10 overflow-y-auto min-h-full">
        {renderPage()}
      </div>

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcome}
        onClose={handleCloseWelcome}
        onCreateAccount={() => {
          setShowWelcome(false); // Close Welcome first to prevent stacking
          setShowCreateAccount(true);
        }}
        onLogin={() => {
          setShowWelcome(false); // Close Welcome first to prevent stacking
          setShowLogin(true);
        }}
      />

      {/* Create Account Modal */}
      <CreateAccountModal
        isOpen={showCreateAccount}
        onClose={() => setShowCreateAccount(false)}
        onSuccess={handleAccountCreated}
        onSwitchToLogin={() => {
          setShowCreateAccount(false);
          setShowLogin(true);
        }}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={handleLoginSuccess}
        onSwitchToCreate={() => {
          setShowLogin(false);
          setShowCreateAccount(true);
        }}
      />
    </div>
  );
}