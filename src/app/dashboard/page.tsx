'use client';

import { Dashboard } from '@/components/Dashboard';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { username, logout, userStats } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push('/login');
    }
  }, [username, router]);

  const handleNavigate = (screen: string) => {
    // Map internal screen names to routes
    const routeMap: Record<string, string> = {
      'setup': '/setup',
      'leaderboard': '/leaderboard',
      'history': '/history',
      'trophies': '/trophies'
    };
    
    const route = routeMap[screen];
    if (route) {
      router.push(route);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!username) return null;

  return (
    <Dashboard 
      username={username} 
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      userStats={userStats}
    />
  );
}
