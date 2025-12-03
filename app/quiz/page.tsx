'use client';

import {MultipleChoiceQuiz} from '@/components/MultipleChoiceQuiz';
import {TrueFalseQuiz} from '@/components/TrueFalseQuiz';
import {useApp, QuizResult} from '@/context/AppContext';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function QuizPage() {
  const {username, quizConfig, completeQuiz} = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push('/login');
    } else if (!quizConfig) {
      router.push('/setup');
    }
  }, [username, quizConfig, router]);

  const handleComplete = (result: QuizResult) => {
    completeQuiz(result);
    router.push('/results');
  };

  if (!username || !quizConfig) return null;

  return (
    <>
      {quizConfig.responseType === 'multiple-choice' ? (
        <MultipleChoiceQuiz
          config={quizConfig}
          onCompleteAction={handleComplete}
        />
      ) : (
        <TrueFalseQuiz config={quizConfig} onCompleteAction={handleComplete} />
      )}
    </>
  );
}
