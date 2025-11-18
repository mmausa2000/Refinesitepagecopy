import { BookOpen, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

export function DailyVerse() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 overflow-hidden group hover:border-blue-400/40 transition-all"
    >
      {/* Decorative element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400">Verse of the Day</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <Volume2 className="w-4 h-4 text-gray-300" />
          </button>
        </div>
        
        <blockquote className="text-white text-xl italic mb-4 leading-relaxed">
          "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
        </blockquote>
        
        <p className="text-gray-400">— John 3:16 (NIV)</p>
      </div>
    </motion.div>
  );
}
