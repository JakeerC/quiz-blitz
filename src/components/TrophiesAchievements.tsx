import { motion } from 'motion/react';
import { 
  Trophy, Star, Zap, Target, Flame, Brain, Clock, TrendingUp, 
  Award, Crown, Shield, Sparkles, ArrowLeft, Lock 
} from 'lucide-react';
import { BrutalistButton } from './ui/BrutalistButton';
import { soundManager } from '../utils/sounds';

type Achievement = {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
};

type TrophiesAchievementsProps = {
  onBack: () => void;
};

// Mock achievements data
const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Complete your first quiz',
    icon: Star,
    color: '#00D9A3',
    unlocked: true,
    rarity: 'common'
  },
  {
    id: 2,
    title: 'Speed Demon',
    description: 'Complete a quiz in under 60 seconds',
    icon: Zap,
    color: '#FFE500',
    unlocked: true,
    rarity: 'rare'
  },
  {
    id: 3,
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: Target,
    color: '#FF9500',
    unlocked: true,
    rarity: 'epic'
  },
  {
    id: 4,
    title: 'Hot Streak',
    description: 'Get 10 questions correct in a row',
    icon: Flame,
    color: '#FF5757',
    unlocked: true,
    rarity: 'legendary'
  },
  {
    id: 5,
    title: 'Knowledge Seeker',
    description: 'Complete 10 quizzes',
    icon: Brain,
    color: '#00B8D4',
    unlocked: true,
    progress: 7,
    maxProgress: 10,
    rarity: 'common'
  },
  {
    id: 6,
    title: 'Marathon Runner',
    description: 'Complete a 30-question quiz',
    icon: Award,
    color: '#9C27B0',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 7,
    title: 'Quick Learner',
    description: 'Improve your score by 50% on a retake',
    icon: TrendingUp,
    color: '#4CAF50',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 8,
    title: 'Night Owl',
    description: 'Complete a quiz after midnight',
    icon: Clock,
    color: '#3F51B5',
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 9,
    title: 'Quiz Master',
    description: 'Reach the top 10 on the leaderboard',
    icon: Crown,
    color: '#FFE500',
    unlocked: false,
    rarity: 'legendary'
  },
  {
    id: 10,
    title: 'Defender',
    description: 'Maintain an 80%+ accuracy over 20 quizzes',
    icon: Shield,
    color: '#607D8B',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 11,
    title: 'Versatile',
    description: 'Complete quizzes in 5 different topics',
    icon: Sparkles,
    color: '#E91E63',
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    rarity: 'rare'
  },
  {
    id: 12,
    title: 'Legend',
    description: 'Unlock all other achievements',
    icon: Trophy,
    color: '#FFD700',
    unlocked: false,
    rarity: 'legendary'
  },
];

export function TrophiesAchievements({ onBack }: TrophiesAchievementsProps) {
  const handleBack = () => {
    soundManager.playClick();
    onBack();
  };

  const unlockedCount = mockAchievements.filter(a => a.unlocked).length;
  const totalCount = mockAchievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  const getRarityBorder = (rarity: string) => {
    if (rarity === 'legendary') return 'border-[#FFD700]';
    if (rarity === 'epic') return 'border-[#9C27B0]';
    if (rarity === 'rare') return 'border-[#00B8D4]';
    return 'border-black dark:border-white';
  };

  const getRarityGlow = (rarity: string) => {
    if (rarity === 'legendary') return 'shadow-[0_0_20px_rgba(255,215,0,0.5)]';
    if (rarity === 'epic') return 'shadow-[0_0_15px_rgba(156,39,176,0.4)]';
    if (rarity === 'rare') return 'shadow-[0_0_10px_rgba(0,184,212,0.3)]';
    return '';
  };

  return (
    <div className="min-h-screen p-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#FF9500] border-[4px] border-black dark:border-white flex items-center justify-center">
              <Trophy size={36} strokeWidth={3} />
            </div>
            <div>
              <h1 className="uppercase tracking-tight dark:text-white">Achievements</h1>
              <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide text-sm">
                Your Trophy Collection
              </p>
            </div>
          </div>
          <BrutalistButton onClick={handleBack} variant="secondary">
            <ArrowLeft size={20} strokeWidth={3} />
            <span className="uppercase tracking-wide">Back</span>
          </BrutalistButton>
        </div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="border-[6px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="uppercase tracking-tight mb-2 dark:text-white">Overall Progress</h2>
              <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide text-sm">
                {unlockedCount} of {totalCount} achievements unlocked
              </p>
            </div>
            <div className="text-right">
              <p className="tracking-tight dark:text-white" style={{ fontSize: '3rem' }}>
                {progressPercentage}%
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-8 bg-gray-200 dark:bg-[#1a1a1a] border-[4px] border-black dark:border-white">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ delay: 0.3, duration: 1 }}
              className="h-full bg-gradient-to-r from-[#00D9A3] via-[#FFE500] to-[#FF9500] flex items-center justify-end pr-2"
            >
              {progressPercentage > 10 && (
                <span className="uppercase tracking-wide">{progressPercentage}%</span>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Rarity Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          <div className="flex items-center gap-2 px-3 py-2 border-[3px] border-black dark:border-white bg-white dark:bg-[#2a2a2a]">
            <div className="w-4 h-4 bg-gray-400 border-[2px] border-black"></div>
            <span className="uppercase tracking-wide text-sm dark:text-white">Common</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border-[3px] border-[#00B8D4] bg-white dark:bg-[#2a2a2a]">
            <div className="w-4 h-4 bg-[#00B8D4] border-[2px] border-black"></div>
            <span className="uppercase tracking-wide text-sm dark:text-white">Rare</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border-[3px] border-[#9C27B0] bg-white dark:bg-[#2a2a2a]">
            <div className="w-4 h-4 bg-[#9C27B0] border-[2px] border-black"></div>
            <span className="uppercase tracking-wide text-sm dark:text-white">Epic</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border-[3px] border-[#FFD700] bg-white dark:bg-[#2a2a2a]">
            <div className="w-4 h-4 bg-[#FFD700] border-[2px] border-black"></div>
            <span className="uppercase tracking-wide text-sm dark:text-white">Legendary</span>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={achievement.unlocked ? { scale: 1.05, y: -4 } : {}}
              className={`
                border-[4px] ${getRarityBorder(achievement.rarity)} 
                bg-white dark:bg-[#2a2a2a] overflow-hidden
                ${achievement.unlocked ? getRarityGlow(achievement.rarity) : 'opacity-60'}
                ${achievement.unlocked ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]' : ''}
              `}
            >
              {/* Header */}
              <div 
                className="p-4 border-b-[3px] border-black dark:border-white flex items-center justify-center"
                style={{ backgroundColor: achievement.unlocked ? achievement.color : '#9E9E9E' }}
              >
                <div className="relative">
                  <achievement.icon 
                    size={48} 
                    strokeWidth={3}
                    className={achievement.unlocked ? '' : 'opacity-50'}
                  />
                  {!achievement.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock size={24} strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="uppercase tracking-wide dark:text-white">{achievement.title}</h3>
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <Star size={20} strokeWidth={3} fill={achievement.color} />
                    </motion.div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {achievement.description}
                </p>

                {/* Progress Bar (if applicable) */}
                {achievement.maxProgress && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs uppercase tracking-wide mb-1 dark:text-white">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-[#1a1a1a] border-[2px] border-black dark:border-white">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%` }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        style={{ backgroundColor: achievement.color }}
                        className="h-full"
                      />
                    </div>
                  </div>
                )}

                {/* Rarity Badge */}
                <div className="mt-3 pt-3 border-t-[2px] border-gray-200 dark:border-gray-700">
                  <span className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
                    {achievement.rarity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fun Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 border-[4px] border-black dark:border-white bg-[#FFE500] p-6 text-center"
        >
          <p className="uppercase tracking-wide">
            🎯 Keep playing to unlock more achievements! 🏆
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
