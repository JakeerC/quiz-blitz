'use client';

import {useState} from 'react';
import {Play, Trophy, History, BarChart3, LogOut} from 'lucide-react';
import {Logo} from './ui/Logo';
import {soundManager} from '../utils/sounds';

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
    {icon: Play, label: 'New Quiz', screen: 'setup', color: '#00D9A3'},
    {
      icon: BarChart3,
      label: 'Leaderboard',
      screen: 'leaderboard',
      color: '#FFE500',
    },
    {icon: History, label: 'Quiz History', screen: 'history', color: '#00B8D4'},
    {icon: Trophy, label: 'Achievements', screen: 'trophies', color: '#FF9500'},
  ];

  return (
    <div className="min-h-screen p-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <div>
              <h1 className="tracking-tight uppercase dark:text-white">
                Welcome Back!
              </h1>
              <p className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
                {username}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border-4 border-black bg-[#FF5757] px-6 py-3 transition-colors hover:bg-[#FF4444] dark:border-white">
            <LogOut size={20} strokeWidth={3} />
            <span className="tracking-wide uppercase">Logout</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="border-4 border-black bg-white p-6 dark:border-white dark:bg-[#2a2a2a]">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
              Total Quizzes
            </p>
            <p
              className="tracking-tight dark:text-white"
              style={{fontSize: '2rem'}}>
              {userStats.totalQuizzes}
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6 dark:border-white dark:bg-[#2a2a2a]">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
              Accuracy
            </p>
            <p
              className="tracking-tight dark:text-white"
              style={{fontSize: '2rem'}}>
              {accuracy}%
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6 dark:border-white dark:bg-[#2a2a2a]">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
              Questions Answered
            </p>
            <p
              className="tracking-tight dark:text-white"
              style={{fontSize: '2rem'}}>
              {userStats.totalQuestions}
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6 dark:border-white dark:bg-[#2a2a2a]">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
              Achievements
            </p>
            <p
              className="tracking-tight dark:text-white"
              style={{fontSize: '2rem'}}>
              {userStats.achievements}
            </p>
          </div>
        </div>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {menuItems.map((item, index) => (
            <button
              key={item.screen}
              onClick={() => handleNavigate(item.screen)}
              className="border-[6px] border-black bg-white p-8 text-left shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-gray-50 dark:border-white dark:bg-[#2a2a2a] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:hover:bg-[#3a3a3a]">
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center border-4 border-black dark:border-white"
                  style={{backgroundColor: item.color}}>
                  <item.icon size={32} strokeWidth={3} />
                </div>
                <h2 className="tracking-tight uppercase dark:text-white">
                  {item.label}
                </h2>
              </div>
              <p className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
                {item.screen === 'setup' && 'Start a new quiz session'}
                {item.screen === 'leaderboard' && 'See top performers'}
                {item.screen === 'history' && 'View past quiz attempts'}
                {item.screen === 'trophies' && 'Track your progress'}
              </p>
            </button>
          ))}
        </div>

        {/* Quick Tip */}
        <div className="mt-8 border-4 border-black bg-[#FFE500] p-6 dark:border-white">
          <p className="tracking-wide uppercase">
            💡 Complete quizzes to unlock achievements and climb the
            leaderboard!
          </p>
        </div>
      </div>
    </div>
  );
}
