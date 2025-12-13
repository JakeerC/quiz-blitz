'use client';

import {Profile} from './component';
import {useApp} from '@/context/AppContext';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function ProfilePage() {
  const {username, userStats} = useApp();
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
    <Profile
      username={username}
      onBackAction={handleBack}
      userStats={userStats}
    />
  );
}
