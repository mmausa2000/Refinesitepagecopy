import { Activity, Clock, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-3 md:px-8 py-3 md:py-4 border-t border-white/10 bg-[#0f1a2e]/50 gap-3 md:gap-0 mt-8 md:mt-12">
      {/* Left side - Stats */}
      <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm flex-wrap justify-center md:justify-start">
        <div className="flex items-center gap-2 text-gray-300">
          <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
          <span className="hidden sm:inline">Version <span className="text-white">2.0.0</span></span>
          <span className="sm:hidden text-white">v2.0.0</span>
        </div>
        
        <div className="hidden md:flex items-center gap-2 text-gray-300">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Last played: <span className="text-white">Today</span></span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300">
          <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
          <span className="hidden sm:inline">Players online: <span className="text-white">1</span></span>
          <span className="sm:hidden text-white">1 online</span>
        </div>
      </div>

      {/* Right side - Links */}
      <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm flex-wrap justify-center">
        <button className="text-gray-400 hover:text-white transition-colors">
          Logout
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          Help
        </button>
        <button className="hidden sm:inline text-gray-400 hover:text-white transition-colors">
          About
        </button>
        <button className="hidden md:inline text-gray-400 hover:text-white transition-colors">
          Reset Data
        </button>
      </div>
    </footer>
  );
}