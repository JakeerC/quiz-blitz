'use client';

import {Play, Trophy, History, BarChart3, LogOut} from 'lucide-react';
import {Logo} from './ui/Logo';
import {soundManager} from '../utils/sounds';
import {cn} from './ui/utils';
import {color} from '@/constants/colors';

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

  const menuItems = [
    {icon: Play, label: 'New Quiz', screen: 'setup', className: 'bg-green-500'},
    {
      icon: BarChart3,
      label: 'Leaderboard',
      screen: 'leaderboard',
      className: 'bg-blue-500',
    },
    {
      icon: History,
      label: 'Quiz History',
      screen: 'history',
      className: 'bg-cyan-500',
    },
    {
      icon: Trophy,
      label: 'Achievements',
      screen: 'trophies',
      className: 'bg-orange-500',
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
          <button
            onClick={handleLogout}
            className={cn(
              'flex items-center gap-2 border-4',
              'bg-secondary hover:bg-secondary/80 border-black px-6 py-3 transition-colors'
            )}>
            <LogOut size={20} strokeWidth={3} />
            <span className="tracking-wide uppercase">Logout</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="border-4 border-black bg-white p-6">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
              Total Quizzes
            </p>
            <p className="tracking-tight" style={{fontSize: '2rem'}}>
              {userStats.totalQuizzes}
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
              Accuracy
            </p>
            <p className="tracking-tight" style={{fontSize: '2rem'}}>
              {accuracy}%
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
              Questions Answered
            </p>
            <p className="tracking-tight" style={{fontSize: '2rem'}}>
              {userStats.totalQuestions}
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
              Achievements
            </p>
            <p className="tracking-tight" style={{fontSize: '2rem'}}>
              {userStats.achievements}
            </p>
          </div>
        </div>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {menuItems.map((item) => (
            <button
              key={item.screen}
              onClick={() => handleNavigate(item.screen)}
              className={cn(
                'card p-8 text-left',
                'transition-colors hover:bg-gray-50'
              )}>
              <div className="mb-4 flex items-center gap-4">
                <div
                  className={cn(
                    'flex h-16 w-16 items-center justify-center border-4 border-black',
                    item.className
                  )}>
                  <item.icon size={32} strokeWidth={3} />
                </div>
                <h2 className="tracking-tight uppercase">{item.label}</h2>
              </div>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
                {item.screen === 'setup' && 'Start a new quiz session'}
                {item.screen === 'leaderboard' && 'See top performers'}
                {item.screen === 'history' && 'View past quiz attempts'}
                {item.screen === 'trophies' && 'Track your progress'}
              </p>
            </button>
          ))}
        </div>

        {/* Quick Tip */}
        <div className="bg-primary mt-8 border-4 border-black p-6">
          <p className="tracking-wide uppercase">
            💡 Complete quizzes to unlock achievements and climb the
            leaderboard!
          </p>
        </div>
      </div>
    </div>
  );
}
