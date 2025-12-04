'use client';

import { Leaderboard } from '@/components/Leaderboard';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LeaderboardPage() {
  const { username } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push('/login');
    }
  }, [username, router]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  if (!username) return null;

  return (
    <Leaderboard 
      onBack={handleBack}
      currentUser={username}
    />
  );
}
