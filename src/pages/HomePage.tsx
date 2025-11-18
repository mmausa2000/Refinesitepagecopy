import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { DailyVerse } from '../components/DailyVerse';
import { ProgressDashboard } from '../components/ProgressDashboard';
import { RecentActivity } from '../components/RecentActivity';
import { FeaturedQuestions } from '../components/FeaturedQuestions';
import { Footer } from '../components/Footer';
import { User, Target, Info } from 'lucide-react';
import { useState } from 'react';
import { AccountModal } from '../components/AccountModal';
import { ToolsSidebar } from '../components/ToolsSidebar';
import { HelpTutorial } from '../components/HelpTutorial';
import { QuickPlayModal } from '../components/QuickPlayModal';

interface HomePageProps {
  onNavigateToQuiz: (isMultiplayer?: boolean) => void;
  onLogout?: () => void; // Callback when user logs out
}

export function HomePage({ onNavigateToQuiz, onLogout }: HomePageProps) {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isToolsSidebarOpen, setIsToolsSidebarOpen] = useState(false);
  const [isHelpTutorialOpen, setIsHelpTutorialOpen] = useState(false);
  const [isQuickPlayModalOpen, setIsQuickPlayModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Badges */}
      <div className="flex items-center justify-end gap-2 md:gap-3 px-3 md:px-4 py-3 md:py-4">
        {/* Account Badge */}
        <button
          onClick={() => setIsAccountModalOpen(true)}
          className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 transition-colors group"
        >
          <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-white transition-colors" />
          <span className="text-white text-xs md:text-sm">Account</span>
        </button>

        {/* Bible Tools Badge */}
        <button
          onClick={() => setIsToolsSidebarOpen(true)}
          className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 transition-colors group"
        >
          <Target className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-white transition-colors" />
          <span className="text-white text-xs md:text-sm hidden sm:inline">Bible Tools</span>
          <span className="text-white text-xs md:text-sm sm:hidden">Tools</span>
        </button>

        {/* Tutorial Badge */}
        <button
          onClick={() => setIsHelpTutorialOpen(true)}
          className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 transition-colors group"
        >
          <Info className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-white transition-colors" />
          <span className="text-white text-xs md:text-sm hidden sm:inline">Tutorial</span>
          <span className="text-white text-xs md:text-sm sm:hidden">Help</span>
        </button>
      </div>

      <Header />
      
      <main className="flex-1 px-3 md:px-8 pb-6 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-12">
          <HeroSection onQuickPlay={() => setIsQuickPlayModalOpen(true)} />
          <DailyVerse />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <ProgressDashboard />
            <RecentActivity />
          </div>
          
          <FeaturedQuestions onQuestionClick={() => setIsQuickPlayModalOpen(true)} />
        </div>
      </main>
      
      <Footer />

      {/* Modals and Sidebars */}
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
        onLogout={onLogout}
      />
      
      <ToolsSidebar 
        isOpen={isToolsSidebarOpen} 
        onClose={() => setIsToolsSidebarOpen(false)}
        onNavigateToCreator={() => {
          // This would need to be passed down from App.tsx
          console.log('Navigate to creator');
        }}
      />
      
      <HelpTutorial 
        isOpen={isHelpTutorialOpen} 
        onClose={() => setIsHelpTutorialOpen(false)} 
      />
      
      <QuickPlayModal 
        isOpen={isQuickPlayModalOpen} 
        onClose={() => setIsQuickPlayModalOpen(false)}
        onStartQuiz={() => {
          setIsQuickPlayModalOpen(false);
          onNavigateToQuiz();
        }}
      />
    </div>
  );
}