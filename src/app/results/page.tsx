'use client';

import {ResultsScreen} from '@/components/ResultsScreen';
import {useApp} from '@/context/AppContext';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function ResultsPage() {
  const {username, quizResult, quizConfig, resetQuiz} = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push('/login');
    } else if (!quizResult || !quizConfig) {
      router.push('/dashboard');
    }
  }, [username, quizResult, quizConfig, router]);

  const handleRetake = () => {
    // Retake means start same quiz again
    // We don't need to change config, just navigate to quiz
    router.push('/quiz');
  };

  const handleNewQuiz = () => {
    resetQuiz();
    router.push('/setup');
  };

  const handleBackToDashboard = () => {
    resetQuiz();
    router.push('/dashboard');
  };

  if (!username || !quizResult || !quizConfig) return null;

  return (
    <ResultsScreen
      result={quizResult}
      config={quizConfig}
      onRetake={handleRetake}
      onNewQuiz={handleNewQuiz}
      onBackToDashboard={handleBackToDashboard}
    />
  );
}
