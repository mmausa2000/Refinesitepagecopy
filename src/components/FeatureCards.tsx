import { Target, TrendingUp, Users, Sparkles, Zap, Award, ArrowRight, Trophy, Flame } from 'lucide-react';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function FeatureCards() {
  // Mock data - replace with real user data from props/API
  const cards = [
    {
      type: 'stats',
      icon: Zap,
      title: 'Practice Stats',
      badge: null,
      data: {
        versesLearned: 247,
        currentStreak: 12,
        accuracy: 94,
        trend: '+8%'
      },
      color: 'blue',
      glowColor: 'blue-500'
    },
    {
      type: 'themes',
      icon: Target,
      title: 'Recommended',
      badge: '3 NEW',
      data: {
        themes: [
          { name: 'Fruits of the Spirit', verses: 12 },
          { name: 'Jesus Miracles', verses: 20 },
          { name: 'Psalms of Praise', verses: 15 }
        ]
      },
      color: 'purple',
      glowColor: 'purple-500'
    },
    {
      type: 'teams',
      icon: Users,
      title: 'Team Activity',
      badge: null,
      data: {
        activeChallenges: 2,
        leaderboardPosition: 2,
        teamName: 'Youth Bible Study',
        recentPoints: '+150'
      },
      color: 'green',
      glowColor: 'green-500'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative bg-[#1a2942]/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-[#1a2942]/60 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all group cursor-pointer"
          >
            {card.badge && (
              <div className="absolute -top-2 -right-2">
                <div className="relative animate-pulse">
                  <Badge className="bg-red-500 text-white border-0 pr-8">
                    {card.badge}
                  </Badge>
                  <Sparkles className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-white animate-spin" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-0 rounded-full bg-red-500 blur-md opacity-50 animate-pulse" />
                </div>
              </div>
            )}
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`w-10 h-10 rounded-full bg-${card.color}-500/20 flex items-center justify-center group-hover:bg-${card.color}-500/30 transition-colors`}
              >
                <Icon className={`w-5 h-5 text-${card.color}-400`} />
              </motion.div>
              <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 className="text-white text-lg mb-3">{card.title}</h3>

            {/* Card-specific content */}
            {card.type === 'stats' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Verses Learned</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xl">{card.data.versesLearned}</span>
                    <span className="text-green-400 text-xs">{card.data.trend}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Current Streak</span>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-white">{card.data.currentStreak} days</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Accuracy</span>
                  <span className="text-white">{card.data.accuracy}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${card.data.accuracy}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                  />
                </div>
              </div>
            )}

            {card.type === 'themes' && (
              <div className="space-y-2">
                {card.data.themes.map((theme, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 + i * 0.1 }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span className="text-gray-300 text-sm">{theme.name}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{theme.verses}v</span>
                  </motion.div>
                ))}
                <button className="w-full mt-2 py-2 rounded-lg bg-purple-500/10 text-purple-400 text-sm hover:bg-purple-500/20 transition-colors">
                  Browse All Themes
                </button>
              </div>
            )}

            {card.type === 'teams' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400 text-sm">Active Challenges</span>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">{card.data.activeChallenges}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400 text-sm">Your Rank</span>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-blue-400" />
                    <span className="text-white">#{card.data.leaderboardPosition}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="text-gray-400 text-xs mb-1">{card.data.teamName}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm">Recent Activity</span>
                    <span className="text-green-400 text-sm">{card.data.recentPoints}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Hover glow effect */}
            <div className={`absolute inset-0 bg-${card.glowColor} blur-xl opacity-0 group-hover:opacity-10 transition-opacity rounded-xl pointer-events-none`} />
          </motion.div>
        );
      })}
    </div>
  );
}
