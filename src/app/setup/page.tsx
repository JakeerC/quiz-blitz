'use client';

import {Setup} from '@/app/setup/component';
import {useApp, QuizConfig} from '@/context/AppContext';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function SetupPage() {
  const {username, startQuiz} = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push('/login');
    }
  }, [username, router]);

  const handleStartQuiz = (config: QuizConfig) => {
    startQuiz(config);
    router.push('/quiz');
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  if (!username) return null;

  return (
    <Setup onStartQuizAction={handleStartQuiz} onBackAction={handleBack} />
  );
}
