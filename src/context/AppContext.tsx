'use client';

import {createContext, useContext, useState, ReactNode} from 'react';
import {Difficulty, QuestionType, AnswerMode} from '@/types';

export type QuizConfig = {
  difficulty: Difficulty;
  topic: string;
  numQuestions: number;
  responseType: QuestionType;
  answerMode: AnswerMode;
};

export type QuestionDetail = {
  question: string;
  userAnswer: string | boolean;
  correctAnswer: string | boolean;
  isCorrect: boolean;
  explanation: string;
};

export type QuizResult = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeTaken: number;
  weakTopics: string[];
  questionDetails: QuestionDetail[];
};

type UserStats = {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  achievements: number;
};

type AppContextType = {
  username: string;
  quizConfig: QuizConfig | null;
  quizResult: QuizResult | null;
  userStats: UserStats;
  login: (user: string) => void;
  logout: () => void;
  startQuiz: (config: QuizConfig) => void;
  completeQuiz: (result: QuizResult) => void;
  resetQuiz: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({children}: {children: ReactNode}) {
  const [username, setUsername] = useState<string>('');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // User stats (mock data)
  const [userStats, setUserStats] = useState<UserStats>({
    totalQuizzes: 5,
    totalCorrect: 82,
    totalQuestions: 100,
    achievements: 4,
  });

  const login = (user: string) => {
    setUsername(user);
  };

  const logout = () => {
    setUsername('');
    setQuizConfig(null);
    setQuizResult(null);
  };

  const startQuiz = (config: QuizConfig) => {
    setQuizConfig(config);
    setQuizResult(null);
  };

  const completeQuiz = (result: QuizResult) => {
    setQuizResult(result);
    setUserStats((prev) => ({
      totalQuizzes: prev.totalQuizzes + 1,
      totalCorrect: prev.totalCorrect + result.correctAnswers,
      totalQuestions: prev.totalQuestions + result.totalQuestions,
      achievements: prev.achievements, // Would check for new achievements here
    }));
  };

  const resetQuiz = () => {
    setQuizConfig(null);
    setQuizResult(null);
  };

  return (
    <AppContext.Provider
      value={{
        username,
        quizConfig,
        quizResult,
        userStats,
        login,
        logout,
        startQuiz,
        completeQuiz,
        resetQuiz,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
