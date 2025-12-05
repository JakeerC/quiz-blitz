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
import {BrutalistButton} from '@/components/ui/BrutalistButton';
import {soundManager} from '@/utils/sounds';
import {cn} from '@/components/ui/utils';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
type Achievement = {
  id: number;
  title: string;
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: Rarity;
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
    unlocked: true,
    rarity: 'common',
  },
  {
    id: 2,
    title: 'Speeder',
    description: 'Complete a quiz in under 60 seconds',
    icon: Zap,
    unlocked: true,
    rarity: 'rare',
  },
  {
    id: 3,
    title: 'Perfectionist',
    description: 'Get 100% on any quiz',
    icon: Target,
    unlocked: true,
    rarity: 'epic',
  },
  {
    id: 4,
    title: 'Hotshot',
    description: 'Get 10 questions correct in a row',
    icon: Flame,
    unlocked: true,
    rarity: 'legendary',
  },
  {
    id: 5,
    title: 'Knowledge Cruncher',
    description: 'Complete 10 quizzes',
    icon: Brain,
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
    unlocked: false,
    rarity: 'rare',
  },
  {
    id: 7,
    title: 'Quick Learner',
    description: 'Improve your score by 50% on a retake',
    icon: TrendingUp,
    unlocked: false,
    rarity: 'epic',
  },
  {
    id: 8,
    title: 'Night Owl',
    description: 'Complete a quiz after midnight',
    icon: Clock,
    unlocked: false,
    rarity: 'common',
  },
  {
    id: 9,
    title: 'Quiz Master',
    description: 'Reach the top 10 on the leaderboard',
    icon: Crown,
    unlocked: false,
    rarity: 'legendary',
  },
  {
    id: 10,
    title: 'Defender',
    description: 'Maintain an 80%+ accuracy over 20 quizzes',
    icon: Shield,
    unlocked: false,
    rarity: 'epic',
  },
  {
    id: 11,
    title: 'Versatile',
    description: 'Complete quizzes in 5 different topics',
    icon: Sparkles,
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

  const getRarityStyles = (rarity: Rarity) => {
    if (rarity === 'legendary') return 'bg-pink-400';
    if (rarity === 'epic') return 'bg-purple-500';
    if (rarity === 'rare') return 'bg-sky-500';
    if (rarity === 'common') return 'bg-green-500';
    return '';
  };

  return (
    <div className="min-h-screen p-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary border-box flex h-16 w-16 items-center justify-center">
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
        <div className="card mb-8 p-8">
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
          <div className="border-box h-8 bg-gray-200">
            <div
              style={{width: `${progressPercentage}%`}}
              className="via-primary flex h-full items-center justify-end bg-linear-to-r from-green-500 to-pink-400 pr-2 transition-all duration-1000">
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
          <div className="flex items-center gap-2 border-4 border-green-500 bg-white px-3 py-2">
            <div className="h-4 w-4 bg-green-500"></div>
            <span className="text-sm tracking-wide uppercase">Common</span>
          </div>
          <div className="flex items-center gap-2 border-4 border-sky-500 bg-white px-3 py-2">
            <div className="h-4 w-4 bg-sky-500"></div>
            <span className="text-sm tracking-wide uppercase">Rare</span>
          </div>
          <div className="flex items-center gap-2 border-4 border-purple-500 bg-white px-3 py-2">
            <div className="h-4 w-4 bg-purple-500"></div>
            <span className="text-sm tracking-wide uppercase">Epic</span>
          </div>
          <div className="flex items-center gap-2 border-4 border-pink-400 bg-white px-3 py-2">
            <div className="h-4 w-4 bg-pink-400"></div>
            <span className="text-sm tracking-wide uppercase">Legendary</span>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`card border-box bg-white ${achievement.unlocked ? getRarityStyles(achievement.rarity) : 'bg-[#9E9E9E]/60'} ${achievement.unlocked ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : ''} `}>
              {/* Header */}
              <div
                className={cn(
                  'flex items-center justify-center border-b-4 border-black p-4',
                  achievement.unlocked
                    ? getRarityStyles(achievement.rarity)
                    : 'bg-[#9E9E9E]/60'
                )}>
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
                      <Star size={20} strokeWidth={3} fill={'yellow'} />
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
                    <div className="h-3 border-2 border-black bg-gray-200">
                      <div
                        style={{
                          width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%`,
                        }}
                        className={cn(
                          'h-full transition-all',
                          getRarityStyles(achievement.rarity)
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Rarity Badge */}
                <div className="mt-3 border-t-2 border-gray-200 pt-3">
                  <span className="text-xs tracking-wide text-gray-600 uppercase">
                    {achievement.rarity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fun Footer Message */}
        <div className="bg-primary border-box mt-8 p-6 text-center">
          <p className="tracking-wide uppercase">
            🎯 Keep playing to unlock more achievements! 🏆
          </p>
        </div>
      </div>
    </div>
  );
}
