import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Clock, Users, BookOpen, Flame, Zap, Heart, Brain, Trophy, Play, ChevronRight, BookMarked } from 'lucide-react';

interface FeaturedQuestionsProps {
  onQuestionClick: (themeId?: number) => void;
}

const featuredQuestions = [
  {
    id: 1,
    question: 'What does "Love is patient, love is kind" teach us?',
    theme: 'Love & Compassion',
    reference: '1 Corinthians 13:4',
    difficulty: 'easy',
    icon: '❤️',
    color: 'from-rose-500 to-pink-500',
    participants: 1247,
    tag: 'Popular',
    tagColor: 'from-amber-500 to-orange-500'
  },
  {
    id: 2,
    question: 'Who parted the Red Sea in Exodus?',
    theme: 'Old Testament',
    reference: 'Exodus 14:21',
    difficulty: 'medium',
    icon: '🌊',
    color: 'from-blue-500 to-cyan-500',
    participants: 892,
    tag: 'Trending',
    tagColor: 'from-green-500 to-teal-500'
  },
  {
    id: 3,
    question: 'What are the Fruits of the Spirit?',
    theme: 'Wisdom & Knowledge',
    reference: 'Galatians 5:22-23',
    difficulty: 'medium',
    icon: '🍇',
    color: 'from-purple-500 to-indigo-500',
    participants: 654,
    tag: 'New',
    tagColor: 'from-blue-500 to-cyan-500'
  },
  {
    id: 4,
    question: 'Complete: "The Lord is my shepherd..."',
    theme: 'Psalms Collection',
    reference: 'Psalm 23:1',
    difficulty: 'easy',
    icon: '🎵',
    color: 'from-teal-500 to-emerald-500',
    participants: 2103,
    tag: 'Popular',
    tagColor: 'from-amber-500 to-orange-500'
  }
];

const dailyChallenges = [
  {
    id: 1,
    title: 'Daily Devotion',
    description: 'Test your knowledge on today\'s verses',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'from-amber-400 to-yellow-500',
    timeLeft: '8h left',
    reward: '+50 XP'
  },
  {
    id: 2,
    title: 'Speed Round',
    description: '10 questions in 5 minutes',
    icon: <Zap className="w-5 h-5" />,
    color: 'from-orange-500 to-red-500',
    timeLeft: '2h left',
    reward: '+75 XP'
  },
  {
    id: 3,
    title: 'Wisdom Challenge',
    description: 'Master the Proverbs collection',
    icon: <Brain className="w-5 h-5" />,
    color: 'from-purple-500 to-pink-500',
    timeLeft: '12h left',
    reward: '+100 XP'
  }
];

const trendingTopics = [
  { id: 1, name: 'Miracles of Jesus', verses: 45, icon: '✨', trend: '+23%' },
  { id: 2, name: 'Parables', verses: 38, icon: '📖', trend: '+18%' },
  { id: 3, name: 'Faith & Trust', verses: 52, icon: '🙏', trend: '+15%' },
  { id: 4, name: 'Ten Commandments', verses: 28, icon: '📜', trend: '+12%' },
];

export function FeaturedQuestions({ onQuestionClick }: FeaturedQuestionsProps) {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Featured Questions Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white text-xl">Featured Questions</h2>
              <p className="text-gray-400 text-sm">Challenge yourself with popular Bible questions</p>
            </div>
          </div>
          <button 
            onClick={() => onQuestionClick()}
            className="text-teal-400 hover:text-teal-300 text-sm flex items-center gap-1 group"
          >
            View All
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredQuestions.map((question, index) => (
            <motion.button
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => onQuestionClick(question.id)}
              className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all text-left group overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${question.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${question.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {question.icon}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${question.tagColor} text-white text-xs`}>
                      {question.tag}
                    </span>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                      question.difficulty === 'easy' 
                        ? 'bg-green-500/20 text-green-400' 
                        : question.difficulty === 'medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {question.difficulty === 'easy' && '●'}
                      {question.difficulty === 'medium' && '●●'}
                      {question.difficulty === 'hard' && '●●●'}
                      <span className="ml-1 capitalize">{question.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-white mb-2 line-clamp-2 group-hover:text-teal-400 transition-colors">
                  {question.question}
                </h3>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {question.reference}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {question.participants.toLocaleString()}
                  </span>
                </div>

                {/* Theme Tag */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs">
                    {question.theme}
                  </span>
                  <Play className="w-4 h-4 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Two Column Layout for Challenges and Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Daily Challenges */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white text-xl">Daily Challenges</h2>
              <p className="text-gray-400 text-sm">Complete before time runs out!</p>
            </div>
          </div>

          <div className="space-y-3">
            {dailyChallenges.map((challenge, index) => (
              <motion.button
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => onQuestionClick()}
                className="w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all text-left group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${challenge.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${challenge.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {challenge.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white mb-1 group-hover:text-teal-400 transition-colors">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-2">
                      {challenge.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-orange-400">
                        <Clock className="w-3 h-3" />
                        {challenge.timeLeft}
                      </span>
                      <span className="text-teal-400">
                        {challenge.reward}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white text-xl">Trending Topics</h2>
              <p className="text-gray-400 text-sm">Most studied this week</p>
            </div>
          </div>

          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: -4 }}
                onClick={() => onQuestionClick(topic.id)}
                className="w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all text-left group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <BookMarked className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white mb-1 group-hover:text-teal-400 transition-colors truncate">
                        {topic.name}
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {topic.verses} verses
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      {topic.trend}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Quick Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Community Stats</span>
              <Trophy className="w-4 h-4 text-purple-400" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-white text-xl mb-1">5.2K</p>
                <p className="text-gray-400 text-xs">Active Now</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-white text-xl mb-1">128K</p>
                <p className="text-gray-400 text-xs">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-white text-xl mb-1">2.4M</p>
                <p className="text-gray-400 text-xs">Answered</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}