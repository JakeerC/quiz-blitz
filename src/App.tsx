/**
 * Quiz App - New-Brutalist Design
 * 
 * Complete quiz application with:
 * - User authentication (Login/Signup)
 * - Main dashboard with user stats
 * - Quiz setup with comprehensive options
 * - Multiple quiz modes (Multiple Choice & True/False)
 * - Interactive feedback and explanations
 * - Results with detailed question review
 * - Leaderboard rankings
 * - Quiz history tracking
 * - Trophies & achievements system
 * - Progress tracking
 * - Dark mode support
 * - Sound effects
 */

import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { OnboardingScreen } from './components/OnboardingScreen';
import { QuizSetupScreen } from './components/QuizSetupScreen';
import { MultipleChoiceQuiz } from './components/MultipleChoiceQuiz';
import { TrueFalseQuiz } from './components/TrueFalseQuiz';
import { ResultsScreen } from './components/ResultsScreen';
import { Leaderboard } from './components/Leaderboard';
import { QuizHistory } from './components/QuizHistory';
import { TrophiesAchievements } from './components/TrophiesAchievements';
import { DarkModeToggle } from './components/DarkModeToggle';

export type QuizConfig = {
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  numQuestions: number;
  responseType: 'multiple-choice' | 'true-false';
  answerMode: 'interactive' | 'batch';
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

type Screen = 'login' | 'dashboard' | 'onboarding' | 'setup' | 'quiz' | 'results' | 'leaderboard' | 'history' | 'trophies';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [username, setUsername] = useState<string>('');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  
  // User stats (in a real app, this would come from a database)
  const [userStats, setUserStats] = useState({
    totalQuizzes: 5,
    totalCorrect: 82,
    totalQuestions: 100,
    achievements: 4
  });

  const handleLogin = (user: string) => {
    setUsername(user);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUsername('');
    setCurrentScreen('login');
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'setup') {
      setCurrentScreen('onboarding');
    } else {
      setCurrentScreen(screen as Screen);
    }
  };

  const handleStartFromOnboarding = () => {
    setCurrentScreen('setup');
  };

  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    // Update user stats
    setUserStats(prev => ({
      totalQuizzes: prev.totalQuizzes + 1,
      totalCorrect: prev.totalCorrect + result.correctAnswers,
      totalQuestions: prev.totalQuestions + result.totalQuestions,
      achievements: prev.achievements // Would check for new achievements here
    }));
    setCurrentScreen('results');
  };

  const handleRetakeQuiz = () => {
    setCurrentScreen('quiz');
  };

  const handleNewQuiz = () => {
    setQuizConfig(null);
    setQuizResult(null);
    setCurrentScreen('setup');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFFEF9] dark:bg-[#1a1a1a] transition-colors relative">
      
      {/* Dark Mode Toggle - Fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <DarkModeToggle />
      </div>

      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard 
          username={username} 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          userStats={userStats}
        />
      )}

      {currentScreen === 'leaderboard' && (
        <Leaderboard 
          onBack={handleBackToDashboard}
          currentUser={username}
        />
      )}

      {currentScreen === 'history' && (
        <QuizHistory onBack={handleBackToDashboard} />
      )}

      {currentScreen === 'trophies' && (
        <TrophiesAchievements onBack={handleBackToDashboard} />
      )}

      {currentScreen === 'onboarding' && (
        <OnboardingScreen onStart={handleStartFromOnboarding} />
      )}
      
      {currentScreen === 'setup' && (
        <QuizSetupScreen 
          onStartQuiz={handleStartQuiz}
          onBack={handleBackToDashboard}
        />
      )}
      
      {currentScreen === 'quiz' && quizConfig && (
        <>
          {quizConfig.responseType === 'multiple-choice' ? (
            <MultipleChoiceQuiz 
              config={quizConfig} 
              onComplete={handleQuizComplete} 
            />
          ) : (
            <TrueFalseQuiz 
              config={quizConfig} 
              onComplete={handleQuizComplete} 
            />
          )}
        </>
      )}
      
      {currentScreen === 'results' && quizResult && quizConfig && (
        <ResultsScreen 
          result={quizResult}
          config={quizConfig}
          onRetake={handleRetakeQuiz}
          onNewQuiz={handleNewQuiz}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
}