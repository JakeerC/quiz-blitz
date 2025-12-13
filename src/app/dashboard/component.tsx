'use client';

import {Play, User, BarChart3, LogOut} from 'lucide-react';
import {Logo} from '@/components/ui/Logo';
import {soundManager} from '@/utils';
import {cn} from '@/utils';
import {Button} from '@/components/ui/Button';
import {Banner} from '@/components/ui/Banner';

type DashboardProps = {
  username: string;
  onNavigateAction: (screen: string) => void;
  onLogoutAction: () => void;
  userStats: {
    totalQuizzes: number;
    totalCorrect: number;
    totalQuestions: number;
    achievements: number;
  };
};

export function Dashboard({
  username,
  onNavigateAction,
  onLogoutAction,
  userStats,
}: DashboardProps) {
  const handleNavigate = (screen: string) => {
    soundManager.playClick();
    onNavigateAction(screen);
  };

  const handleLogout = () => {
    soundManager.playClick();
    onLogoutAction();
  };

  const accuracy =
    userStats.totalQuestions > 0
      ? Math.round((userStats.totalCorrect / userStats.totalQuestions) * 100)
      : 0;

  const statistics = [
    {
      label: 'Total Quizzes',
      value: userStats.totalQuizzes,
      className: 'bg-green-100 text-green-900',
    },
    {
      label: 'Accuracy',
      value: accuracy + '%',
      className: 'bg-blue-100 text-blue-900',
    },
    {
      label: 'Questions Answered',
      value: userStats.totalQuestions,
      className: 'bg-cyan-100 text-cyan-900',
    },
    {
      label: 'Achievements',
      value: userStats.achievements,
      className: 'bg-yellow-100 text-yellow-900',
    },
  ];
  const actions = [
    {
      icon: Play,
      label: 'New Quiz',
      screen: 'setup',
      className: 'bg-green-100 text-green-900',
    },
    {
      icon: BarChart3,
      label: 'Leaderboard',
      screen: 'leaderboard',
      className: 'bg-blue-100 text-blue-900',
    },
    {
      icon: User,
      label: 'Profile',
      screen: 'profile',
      className: 'bg-purple-100 text-purple-900',
    },
  ];

  return (
    <div className="min-h-screen p-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <div>
              <h1 className="tracking-tight uppercase">Welcome Back!</h1>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
                {username}
              </p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="danger">
            <LogOut size={20} strokeWidth={3} />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              className={cn('border-box p-6', stat.className)}>
              <p className="mb-2 text-sm tracking-wide uppercase">
                {stat.label}
              </p>
              <p className="tracking-tight" style={{fontSize: '2rem'}}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {actions.map((item) => (
            <button
              key={item.screen}
              onClick={() => handleNavigate(item.screen)}
              className={cn(
                'card p-8 text-left',
                'interactive-action',
                item.className
              )}>
              <div className="mb-4 flex items-center gap-4">
                <div
                  className={cn(
                    'border-box flex h-16 w-16 items-center justify-center'
                  )}>
                  <item.icon size={32} strokeWidth={3} />
                </div>
                <h2 className="font-bold tracking-tight uppercase">
                  {item.label}
                </h2>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Tip */}
        <Banner variant="info" title="Quick Tip" onDismiss={() => {}}>
          Complete quizzes to unlock achievements and climb the leaderboard!
        </Banner>
      </div>
    </div>
  );
}
