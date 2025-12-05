'use client';

import {QuizHistory} from '@/components/QuizHistory';
import {useApp} from '@/context/AppContext';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function HistoryPage() {
  const {username} = useApp();
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

  return <QuizHistory onBackAction={handleBack} />;
}
