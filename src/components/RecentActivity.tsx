import { Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function RecentActivity() {
  const activities = [
    { title: 'Completed "Love & Compassion"', time: '2 hours ago', score: 95 },
    { title: 'Challenged @Sarah_M', time: '5 hours ago', score: 88 },
    { title: 'Practiced "Faith & Trust"', time: 'Yesterday', score: 92 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
      className="bg-[#1a2942]/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all"
    >
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-blue-400" />
        <h2 className="text-white">Recent Activity</h2>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
            className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm">{activity.title}</p>
              <p className="text-gray-400 text-xs">{activity.time}</p>
            </div>
            <div className="text-blue-400 text-sm">{activity.score}%</div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
        View All Activity →
      </button>
    </motion.div>
  );
}
