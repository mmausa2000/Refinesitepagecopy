import { TrendingUp, Flame, Target, Award } from 'lucide-react';
import { motion } from 'motion/react';

export function ProgressDashboard() {
  const stats = [
    { icon: Flame, label: 'Day Streak', value: '7', color: 'orange' },
    { icon: Target, label: 'Accuracy', value: '94%', color: 'green' },
    { icon: Award, label: 'Total XP', value: '2,450', color: 'purple' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
      className="bg-[#1a2942]/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all"
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-400" />
        <h2 className="text-white">Your Progress</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            orange: 'bg-orange-500/20 text-orange-400',
            green: 'bg-green-500/20 text-green-400',
            purple: 'bg-purple-500/20 text-purple-400',
          };
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Weekly Goal</span>
          <span>28/40 verses</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden bg-[rgba(255,255,255,0.1)]">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '70%' }}
            transition={{ duration: 1, delay: 1.5 }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
