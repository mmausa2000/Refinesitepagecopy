import { Home, BookOpen, Brain, FileText, Calendar, Trophy, MessageSquare, User, Users } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProfileMenu } from './ProfileMenu';
import type { PageType } from '../App';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const navItems: { icon: typeof Home; page: PageType; label: string }[] = [
    { icon: Home, page: 'home', label: 'Home' },
    { icon: BookOpen, page: 'reader', label: 'Reader' },
    { icon: Brain, page: 'practice', label: 'Practice' },
    { icon: FileText, page: 'creator', label: 'Theme Creator' },
    { icon: Calendar, page: 'calendar', label: 'Challenges' },
    { icon: Users, page: 'challenges', label: 'Team Portal' },
    { icon: MessageSquare, page: 'messages', label: 'UBot' },
  ];

  return (
    <div className="w-14 bg-[#0f1a2e] flex flex-col items-center py-4 gap-6 border-r border-white/10 relative z-20">
      {/* Logo */}
      <div className="w-10 h-10 rounded-full bg-[#1a2942] border-2 border-white/20 flex items-center justify-center mb-2">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1589998059171-988d887df646?w=40&h=40&fit=crop"
          alt="Logo"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>

      {/* Navigation Icons */}
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = currentPage === item.page;
        
        // Special animated home icon
        if (item.page === 'home') {
          return (
            <button
              key={index}
              onClick={() => {
                console.log('Clicked:', item.page);
                onNavigate(item.page);
              }}
              onMouseEnter={() => setHoveredIcon('home')}
              onMouseLeave={() => setHoveredIcon(null)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isActive
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.g
                  animate={hoveredIcon === 'home' ? {
                    scale: [1, 1.1, 1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 2.5,
                    repeat: hoveredIcon === 'home' ? Infinity : 0,
                    repeatDelay: 2.5,
                    ease: "easeInOut"
                  }}
                  style={{ originX: "12px", originY: "12px" }}
                >
                  {/* House outline */}
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  {/* Door - animated on hover */}
                  <motion.path
                    d="M9 22 L9 12 L15 12 L15 22"
                    animate={hoveredIcon === 'home' ? {
                      d: [
                        "M9 22 L9 12 L15 12 L15 22",
                        "M9 22 L9 12 Q9 12 9 22",
                        "M9 22 L9 12 L15 12 L15 22",
                      ]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: hoveredIcon === 'home' ? Infinity : 0,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                    fill="currentColor"
                    fillOpacity="0.3"
                  />
                </motion.g>
              </svg>
            </button>
          );
        }
        
        // Special animated book icon for Reader
        if (item.page === 'reader') {
          return (
            <button
              key={index}
              onClick={() => {
                console.log('Clicked:', item.page);
                onNavigate(item.page);
              }}
              onMouseEnter={() => setHoveredIcon('reader')}
              onMouseLeave={() => setHoveredIcon(null)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isActive
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.g
                  animate={hoveredIcon === 'reader' ? {
                    scale: [1, 1.1, 1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 2.5,
                    repeat: hoveredIcon === 'reader' ? Infinity : 0,
                    repeatDelay: 2.5,
                    ease: "easeInOut"
                  }}
                  style={{ originX: "12px", originY: "12px" }}
                >
                  {/* Book spine */}
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  {/* Left page */}
                  <motion.path
                    d="M12 2 L12 22"
                    animate={hoveredIcon === 'reader' ? {
                      d: [
                        "M12 2 L12 22",
                        "M12 2 Q8 12 12 22",
                        "M12 2 L12 22",
                      ]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: hoveredIcon === 'reader' ? Infinity : 0,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Right page */}
                  <motion.path
                    d="M12 2 L20 2 L20 22 L12 22"
                    animate={hoveredIcon === 'reader' ? {
                      d: [
                        "M12 2 L20 2 L20 22 L12 22",
                        "M12 2 L20 2 L20 22 Q16 12 12 22",
                        "M12 2 L20 2 L20 22 L12 22",
                      ]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: hoveredIcon === 'reader' ? Infinity : 0,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  />
                </motion.g>
              </svg>
            </button>
          );
        }
        
        // Special animated brain icon for Practice
        if (item.page === 'practice') {
          return (
            <button
              key={index}
              onClick={() => {
                console.log('Clicked:', item.page);
                onNavigate(item.page);
              }}
              onMouseEnter={() => setHoveredIcon('practice')}
              onMouseLeave={() => setHoveredIcon(null)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isActive
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.g
                  animate={hoveredIcon === 'practice' ? {
                    scale: [1, 1.1, 1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 2.5,
                    repeat: hoveredIcon === 'practice' ? Infinity : 0,
                    repeatDelay: 2.5,
                    ease: "easeInOut"
                  }}
                  style={{ originX: "12px", originY: "12px" }}
                >
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                  <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                  <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                  <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                  <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                  <path d="M6 18a4 4 0 0 1-1.967-.516" />
                  <path d="M19.967 17.484A4 4 0 0 1 18 18" />
                </motion.g>
              </svg>
            </button>
          );
        }
        
        // Special animated document icon for Theme Creator
        if (item.page === 'creator') {
          return (
            <button
              key={index}
              onClick={() => {
                console.log('Clicked:', item.page);
                onNavigate(item.page);
              }}
              onMouseEnter={() => setHoveredIcon('creator')}
              onMouseLeave={() => setHoveredIcon(null)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isActive
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.g
                  animate={hoveredIcon === 'creator' ? {
                    scale: [1, 1.1, 1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 2.5,
                    repeat: hoveredIcon === 'creator' ? Infinity : 0,
                    repeatDelay: 2.5,
                    ease: "easeInOut"
                  }}
                  style={{ originX: "12px", originY: "12px" }}
                >
                  {/* Document outline */}
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  {/* Text lines - animated */}
                  <motion.path
                    d="M8 13h2"
                    animate={hoveredIcon === 'creator' ? {
                      d: [
                        "M8 13h2",
                        "M8 13h8",
                        "M8 13h2",
                      ]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredIcon === 'creator' ? Infinity : 0,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.path
                    d="M8 17h2"
                    animate={hoveredIcon === 'creator' ? {
                      d: [
                        "M8 17h2",
                        "M8 17h8",
                        "M8 17h2",
                      ]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      delay: 0.3,
                      repeat: hoveredIcon === 'creator' ? Infinity : 0,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  />
                </motion.g>
              </svg>
            </button>
          );
        }
        
        // Special animated trophy icon for Challenges
        if (item.page === 'calendar') {
          return (
            <button
              key={index}
              onClick={() => {
                console.log('Clicked:', item.page);
                onNavigate(item.page);
              }}
              onMouseEnter={() => setHoveredIcon('trophy')}
              onMouseLeave={() => setHoveredIcon(null)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isActive
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.g
                  animate={hoveredIcon === 'trophy' ? {
                    scale: [1, 1.1, 1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 2.5,
                    repeat: hoveredIcon === 'trophy' ? Infinity : 0,
                    repeatDelay: 2.5,
                    ease: "easeInOut"
                  }}
                  style={{ originX: "12px", originY: "12px" }}
                >
                  {/* Trophy cup */}
                  <motion.g
                    animate={hoveredIcon === 'trophy' ? {
                      y: [-1, 0, -1],
                      rotate: [-3, 3, -3]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: hoveredIcon === 'trophy' ? Infinity : 0,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                    style={{ originX: "12px", originY: "12px" }}
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </motion.g>
                  {/* Star on trophy */}
                  <motion.g
                    animate={hoveredIcon === 'trophy' ? {
                      scale: [1, 1.4, 1],
                      opacity: [0.8, 1, 0.8]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: hoveredIcon === 'trophy' ? Infinity : 0,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                    style={{ originX: "12px", originY: "6px" }}
                  >
                    <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                  </motion.g>
                </motion.g>
              </svg>
            </button>
          );
        }
        
        // Special animated users icon for Team Portal
        if (item.page === 'challenges') {
          return (
            <button
              key={index}
              onClick={() => {
                console.log('Clicked:', item.page);
                onNavigate(item.page);
              }}
              onMouseEnter={() => setHoveredIcon('challenges')}
              onMouseLeave={() => setHoveredIcon(null)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isActive
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.g
                  animate={hoveredIcon === 'challenges' ? {
                    scale: [1, 1.1, 1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 2.5,
                    repeat: hoveredIcon === 'challenges' ? Infinity : 0,
                    repeatDelay: 2.5,
                    ease: "easeInOut"
                  }}
                  style={{ originX: "12px", originY: "12px" }}
                >
                  {/* Left person */}
                  <motion.g
                    animate={hoveredIcon === 'challenges' ? {
                      x: [-0.5, 0, -0.5],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: hoveredIcon === 'challenges' ? Infinity : 0,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </motion.g>
                  {/* Right person */}
                  <motion.g
                    animate={hoveredIcon === 'challenges' ? {
                      x: [0.5, 0, 0.5],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: hoveredIcon === 'challenges' ? Infinity : 0,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </motion.g>
                </motion.g>
              </svg>
            </button>
          );
        }
        
        // Special animated message icon for UBot
        if (item.page === 'messages') {
          return (
            <button
              key={index}
              onClick={() => {
                console.log('Clicked:', item.page);
                onNavigate(item.page);
              }}
              onMouseEnter={() => setHoveredIcon('messages')}
              onMouseLeave={() => setHoveredIcon(null)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isActive
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.g
                  animate={hoveredIcon === 'messages' ? {
                    scale: [1, 1.1, 1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 2.5,
                    repeat: hoveredIcon === 'messages' ? Infinity : 0,
                    repeatDelay: 2.5,
                    ease: "easeInOut"
                  }}
                  style={{ originX: "12px", originY: "12px" }}
                >
                  {/* Message bubble */}
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  {/* Typing dots - animated */}
                  <motion.circle
                    cx="8"
                    cy="10"
                    r="1"
                    fill="currentColor"
                    animate={hoveredIcon === 'messages' ? {
                      opacity: [0.3, 1, 0.3],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredIcon === 'messages' ? Infinity : 0,
                      ease: "easeInOut",
                      delay: 0
                    }}
                  />
                  <motion.circle
                    cx="12"
                    cy="10"
                    r="1"
                    fill="currentColor"
                    animate={hoveredIcon === 'messages' ? {
                      opacity: [0.3, 1, 0.3],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredIcon === 'messages' ? Infinity : 0,
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                  />
                  <motion.circle
                    cx="16"
                    cy="10"
                    r="1"
                    fill="currentColor"
                    animate={hoveredIcon === 'messages' ? {
                      opacity: [0.3, 1, 0.3],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredIcon === 'messages' ? Infinity : 0,
                      ease: "easeInOut",
                      delay: 0.6
                    }}
                  />
                </motion.g>
              </svg>
            </button>
          );
        }
        
        return (
          <button
            key={index}
            onClick={() => {
              console.log('Clicked:', item.page);
              onNavigate(item.page);
            }}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
              isActive
                ? 'bg-green-500/20 text-green-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}

      {/* User Profile at bottom */}
      <div className="mt-auto">
        <motion.button 
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isProfileMenuOpen
              ? 'bg-green-500/20 text-green-400'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.circle
              cx="12"
              cy="8"
              r="5"
              animate={{
                scale: [1, 1.15, 1, 1.15, 1],
                rotate: [0, -8, 8, -8, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              style={{ originX: "12px", originY: "8px" }}
            />
            <path d="M20 21a8 8 0 1 0-16 0" />
          </svg>
        </motion.button>
      </div>
      
      {/* Profile Menu */}
      <ProfileMenu 
        isOpen={isProfileMenuOpen} 
        onNavigate={onNavigate}
        onClose={() => setIsProfileMenuOpen(false)}
      />
    </div>
  );
}