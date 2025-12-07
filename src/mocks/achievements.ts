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
} from 'lucide-react';
import {Rarity} from '@/types';

export type Achievement = {
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

export const mockAchievements: Achievement[] = [
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
