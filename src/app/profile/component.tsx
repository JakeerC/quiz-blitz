'use client';

import {useState} from 'react';
import {
  User,
  History as HistoryIcon,
  Trophy,
  Calendar,
  Clock,
  Target,
  ArrowLeft,
  Crosshair,
  Star,
  Lock,
} from 'lucide-react';
import {Button} from '@/components/ui/Button';
import {cn, soundManager} from '@/utils';
import {Difficulty, Grade, Rarity} from '@/types';
import {mockHistory} from '@/mocks/history';
import {mockAchievements} from '@/mocks/achievements';
import {Badge} from '@/components/ui/Badge';

type ProfileProps = {
  username: string;
  onBackAction: () => void;
  userStats: {
    totalQuizzes: number;
    totalCorrect: number;
    totalQuestions: number;
    achievements: number;
  };
};

export function Profile({username, onBackAction, userStats}: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'history' | 'achievements'>(
    'history'
  );

  const handleBack = () => {
    soundManager.playClick();
    onBackAction();
  };

  const handleTabChange = (tab: 'history' | 'achievements') => {
    soundManager.playClick();
    setActiveTab(tab);
  };

  // --- History Logic ---
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const difficultyColor: Record<Difficulty, string> = {
    easy: 'bg-green-300 text-green-800',
    medium: 'bg-yellow-200 text-yellow-600',
    hard: 'bg-red-200 text-red-600',
    mixed: 'bg-blue-200 text-blue-600',
  };

  const gradeColor: Record<Grade, string> = {
    'A+': 'bg-green-300 text-green-800',
    A: 'bg-green-300 text-green-800',
    B: 'bg-yellow-200 text-yellow-600',
    C: 'bg-red-200 text-red-600',
    D: 'bg-red-200 text-red-600',
    F: 'bg-red-200 text-red-600',
  };

  const totalQuizzes = mockHistory.length;
  const totalQuestions = mockHistory.reduce(
    (sum, entry) => sum + entry.totalQuestions,
    0
  );
  const totalCorrect = mockHistory.reduce(
    (sum, entry) => sum + entry.correctAnswers,
    0
  );
  const avgAccuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const avgScore =
    totalQuizzes > 0
      ? Math.round(
          mockHistory.reduce((sum, entry) => sum + entry.score, 0) /
            totalQuizzes
        )
      : 0;

  // --- Achievements Logic ---
  const unlockedCount = mockAchievements.filter((a) => a.unlocked).length;
  const totalAchievementsCount = mockAchievements.length;
  const progressPercentage = Math.round(
    (unlockedCount / totalAchievementsCount) * 100
  );

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
            <div className="border-box flex h-16 w-16 items-center justify-center bg-indigo-500 text-white">
              <User size={36} strokeWidth={3} />
            </div>
            <div>
              <h1 className="tracking-tight uppercase">
                {username}&apos;s Profile
              </h1>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
                Level 1 • {userStats.achievements} Achievements Unlocked
              </p>
            </div>
          </div>
          <Button onClick={handleBack} variant="secondary">
            <ArrowLeft size={20} strokeWidth={3} />
            <span className="tracking-wide uppercase">Back</span>
          </Button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex border-b-2 border-gray-200">
          <button
            onClick={() => handleTabChange('history')}
            className={cn(
              'flex items-center gap-2 border-b-4 px-6 py-3 font-bold tracking-wide uppercase transition-colors',
              activeTab === 'history'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            )}>
            <HistoryIcon size={20} />
            History
          </button>
          <button
            onClick={() => handleTabChange('achievements')}
            className={cn(
              'flex items-center gap-2 border-b-4 px-6 py-3 font-bold tracking-wide uppercase transition-colors',
              activeTab === 'achievements'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            )}>
            <Trophy size={20} />
            Achievements
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'history' && (
            <div className="space-y-8">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="border-box bg-white p-6">
                  <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
                    Total Quizzes
                  </p>
                  <p className="tracking-tight" style={{fontSize: '2rem'}}>
                    {totalQuizzes}
                  </p>
                </div>

                <div className="border-box bg-white p-6">
                  <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
                    Avg Accuracy
                  </p>
                  <p className="tracking-tight" style={{fontSize: '2rem'}}>
                    {avgAccuracy}%
                  </p>
                </div>

                <div className="border-box bg-white p-6">
                  <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
                    Avg Score
                  </p>
                  <p className="tracking-tight" style={{fontSize: '2rem'}}>
                    {avgScore}
                  </p>
                </div>

                <div className="border-box bg-white p-6">
                  <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
                    Total Questions
                  </p>
                  <p className="tracking-tight" style={{fontSize: '2rem'}}>
                    {totalQuestions}
                  </p>
                </div>
              </div>

              {/* History List */}
              <div className="space-y-4">
                {mockHistory.map((entry) => (
                  <div key={entry.id} className="card">
                    {/* Header */}
                    <div className="border-b-4 border-black bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar size={20} strokeWidth={3} className="" />
                          <span className="tracking-wide uppercase">
                            {formatDate(entry.date)}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(gradeColor[entry.grade], 'text-md')}>
                          Grade: {entry.grade}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex content-center items-center gap-3">
                          <h3 className="tracking-tight uppercase">
                            {entry.topic}
                          </h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              'tracking-wide uppercase',
                              difficultyColor[entry.difficulty]
                            )}>
                            {entry.difficulty}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p
                            className="tracking-tight"
                            style={{fontSize: '2rem'}}>
                            {entry.score}
                          </p>
                          <p className="text-sm tracking-wide text-gray-600 uppercase">
                            Points
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Target
                            size={20}
                            strokeWidth={3}
                            className="text-[#00D9A3]"
                          />
                          <div>
                            <p className="text-sm tracking-wide text-gray-600 uppercase">
                              Score
                            </p>
                            <p className="tracking-wide uppercase">
                              {entry.correctAnswers}/{entry.totalQuestions}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock
                            size={20}
                            strokeWidth={3}
                            className="text-primary"
                          />
                          <div>
                            <p className="text-sm tracking-wide text-gray-600 uppercase">
                              Time
                            </p>
                            <p className="tracking-wide uppercase">
                              {formatTime(entry.timeTaken)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Crosshair
                            size={20}
                            strokeWidth={3}
                            className={cn('text-orange-300')}
                          />
                          <div>
                            <p className="text-sm tracking-wide text-gray-600 uppercase">
                              Accuracy
                            </p>
                            <p className="tracking-wide uppercase">
                              {Math.round(
                                (entry.correctAnswers / entry.totalQuestions) *
                                  100
                              )}
                              %
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {mockHistory.length === 0 && (
                <div className="py-20 text-center">
                  <HistoryIcon
                    size={64}
                    strokeWidth={2}
                    className="mx-auto mb-4 text-gray-400"
                  />
                  <p className="tracking-wide text-gray-600 uppercase">
                    No quiz history yet. Start a quiz to see your results here!
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-8">
              {/* Progress Overview */}
              <div className="card p-8">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="mb-2 tracking-tight uppercase">
                      Overall Progress
                    </h2>
                    <p className="text-sm tracking-wide text-gray-600 uppercase">
                      {unlockedCount} of {totalAchievementsCount} achievements
                      unlocked
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
                  <span className="text-sm tracking-wide uppercase">
                    Common
                  </span>
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
                  <span className="text-sm tracking-wide uppercase">
                    Legendary
                  </span>
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`card border-box bg-white ${
                      achievement.unlocked
                        ? getRarityStyles(achievement.rarity)
                        : 'bg-[#9E9E9E]/60'
                    } ${
                      achievement.unlocked
                        ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                        : ''
                    } `}>
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
                                width: `${
                                  ((achievement.progress || 0) /
                                    achievement.maxProgress) *
                                  100
                                }%`,
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
