'use client';

import {
  Trophy,
  Star,
  Zap,
  Target,
  Flame,
  Brain,
  Clock,
  TrendingUp,
  Award,
  Crown,
  Shield,
  Sparkles,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import {BrutalistButton} from './ui/BrutalistButton';
import {soundManager} from '../utils/sounds';

type Achievement = {
  id: number;
  title: string;
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
};

type TrophiesAchievementsProps = {
  onBackAction: () => void;
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
    rarity: 'common',
  },
  {
    id: 2,
    title: 'Speed Demon',
    description: 'Complete a quiz in under 60 seconds',
    icon: Zap,
    color: '#FFE500',
    unlocked: true,
    rarity: 'rare',
  },
  {
    id: 3,
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: Target,
    color: '#FF9500',
    unlocked: true,
    rarity: 'epic',
  },
  {
    id: 4,
    title: 'Hot Streak',
    description: 'Get 10 questions correct in a row',
    icon: Flame,
    color: '#FF5757',
    unlocked: true,
    rarity: 'legendary',
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
    rarity: 'common',
  },
  {
    id: 6,
    title: 'Marathon Runner',
    description: 'Complete a 30-question quiz',
    icon: Award,
    color: '#9C27B0',
    unlocked: false,
    rarity: 'rare',
  },
  {
    id: 7,
    title: 'Quick Learner',
    description: 'Improve your score by 50% on a retake',
    icon: TrendingUp,
    color: '#4CAF50',
    unlocked: false,
    rarity: 'epic',
  },
  {
    id: 8,
    title: 'Night Owl',
    description: 'Complete a quiz after midnight',
    icon: Clock,
    color: '#3F51B5',
    unlocked: false,
    rarity: 'common',
  },
  {
    id: 9,
    title: 'Quiz Master',
    description: 'Reach the top 10 on the leaderboard',
    icon: Crown,
    color: '#FFE500',
    unlocked: false,
    rarity: 'legendary',
  },
  {
    id: 10,
    title: 'Defender',
    description: 'Maintain an 80%+ accuracy over 20 quizzes',
    icon: Shield,
    color: '#607D8B',
    unlocked: false,
    rarity: 'epic',
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
    rarity: 'rare',
  },
  {
    id: 12,
    title: 'Legend',
    description: 'Unlock all other achievements',
    icon: Trophy,
    color: '#FFD700',
    unlocked: false,
    rarity: 'legendary',
  },
];

export function TrophiesAchievements({
  onBackAction,
}: TrophiesAchievementsProps) {
  const handleBack = () => {
    soundManager.playClick();
    onBackAction();
  };

  const unlockedCount = mockAchievements.filter((a) => a.unlocked).length;
  const totalCount = mockAchievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  const getRarityBorder = (rarity: string) => {
    if (rarity === 'legendary') return 'border-[#FFD700]';
    if (rarity === 'epic') return 'border-[#9C27B0]';
    if (rarity === 'rare') return 'border-[#00B8D4]';
    return 'border-black ';
  };

  const getRarityGlow = (rarity: string) => {
    if (rarity === 'legendary') return 'shadow-[0_0_20px_rgba(255,215,0,0.5)]';
    if (rarity === 'epic') return 'shadow-[0_0_15px_rgba(156,39,176,0.4)]';
    if (rarity === 'rare') return 'shadow-[0_0_10px_rgba(0,184,212,0.3)]';
    return '';
  };

  return (
    <div className="min-h-screen p-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center border-4 border-black bg-[#FF9500]">
              <Trophy size={36} strokeWidth={3} />
            </div>
            <div>
              <h1 className="tracking-tight uppercase">Achievements</h1>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
                Your Trophy Collection
              </p>
            </div>
          </div>
          <BrutalistButton onClick={handleBack} variant="secondary">
            <ArrowLeft size={20} strokeWidth={3} />
            <span className="tracking-wide uppercase">Back</span>
          </BrutalistButton>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 border-[6px] border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="mb-2 tracking-tight uppercase">
                Overall Progress
              </h2>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
                {unlockedCount} of {totalCount} achievements unlocked
              </p>
            </div>
            <div className="text-right">
              <p className="tracking-tight" style={{fontSize: '3rem'}}>
                {progressPercentage}%
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-8 border-4 border-black bg-gray-200">
            <div
              style={{width: `${progressPercentage}%`}}
              className="flex h-full items-center justify-end bg-gradient-to-r from-[#00D9A3] via-[#FFE500] to-[#FF9500] pr-2 transition-all duration-1000">
              {progressPercentage > 10 && (
                <span className="tracking-wide uppercase">
                  {progressPercentage}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Rarity Legend */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 border-[3px] border-black bg-white px-3 py-2">
            <div className="h-4 w-4 border-[2px] border-black bg-gray-400"></div>
            <span className="text-sm tracking-wide uppercase">Common</span>
          </div>
          <div className="flex items-center gap-2 border-[3px] border-[#00B8D4] bg-white px-3 py-2">
            <div className="h-4 w-4 border-[2px] border-black bg-[#00B8D4]"></div>
            <span className="text-sm tracking-wide uppercase">Rare</span>
          </div>
          <div className="flex items-center gap-2 border-[3px] border-[#9C27B0] bg-white px-3 py-2">
            <div className="h-4 w-4 border-[2px] border-black bg-[#9C27B0]"></div>
            <span className="text-sm tracking-wide uppercase">Epic</span>
          </div>
          <div className="flex items-center gap-2 border-[3px] border-[#FFD700] bg-white px-3 py-2">
            <div className="h-4 w-4 border-[2px] border-black bg-[#FFD700]"></div>
            <span className="text-sm tracking-wide uppercase">Legendary</span>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`border-4 ${getRarityBorder(achievement.rarity)} overflow-hidden bg-white ${achievement.unlocked ? getRarityGlow(achievement.rarity) : 'opacity-60'} ${achievement.unlocked ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : ''} `}>
              {/* Header */}
              <div
                className="flex items-center justify-center border-b-[3px] border-black p-4"
                style={{
                  backgroundColor: achievement.unlocked
                    ? achievement.color
                    : '#9E9E9E',
                }}>
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
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="tracking-wide uppercase">
                    {achievement.title}
                  </h3>
                  {achievement.unlocked && (
                    <div>
                      <Star
                        size={20}
                        strokeWidth={3}
                        fill={achievement.color}
                      />
                    </div>
                  )}
                </div>

                <p className="mb-3 text-sm text-gray-600">
                  {achievement.description}
                </p>

                {/* Progress Bar (if applicable) */}
                {achievement.maxProgress && (
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-xs tracking-wide uppercase">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <div className="h-3 border-[2px] border-black bg-gray-200">
                      <div
                        style={{
                          width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%`,
                          backgroundColor: achievement.color,
                        }}
                        className="h-full transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Rarity Badge */}
                <div className="mt-3 border-t-[2px] border-gray-200 pt-3">
                  <span className="text-xs tracking-wide text-gray-600 uppercase">
                    {achievement.rarity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fun Footer Message */}
        <div className="mt-8 border-4 border-black bg-[#FFE500] p-6 text-center">
          <p className="tracking-wide uppercase">
            🎯 Keep playing to unlock more achievements! 🏆
          </p>
        </div>
      </div>
    </div>
  );
}
