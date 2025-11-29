'use client';

import { motion } from 'motion/react';
import { History, Calendar, Clock, Target, TrendingUp, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { BrutalistButton } from './ui/BrutalistButton';
import { soundManager } from '../utils/sounds';

type HistoryEntry = {
  id: number;
  date: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  grade: string;
};

type QuizHistoryProps = {
  onBack: () => void;
};

// Mock history data
const mockHistory: HistoryEntry[] = [
  {
    id: 1,
    date: '2025-11-29',
    topic: 'Science',
    difficulty: 'hard',
    score: 950,
    totalQuestions: 20,
    correctAnswers: 18,
    timeTaken: 240,
    grade: 'A'
  },
  {
    id: 2,
    date: '2025-11-28',
    topic: 'History',
    difficulty: 'medium',
    score: 820,
    totalQuestions: 15,
    correctAnswers: 13,
    timeTaken: 180,
    grade: 'A'
  },
  {
    id: 3,
    date: '2025-11-27',
    topic: 'Geography',
    difficulty: 'easy',
    score: 750,
    totalQuestions: 10,
    correctAnswers: 9,
    timeTaken: 95,
    grade: 'A'
  },
  {
    id: 4,
    date: '2025-11-26',
    topic: 'Math',
    difficulty: 'hard',
    score: 680,
    totalQuestions: 20,
    correctAnswers: 14,
    timeTaken: 310,
    grade: 'B'
  },
  {
    id: 5,
    date: '2025-11-25',
    topic: 'Literature',
    difficulty: 'medium',
    score: 720,
    totalQuestions: 15,
    correctAnswers: 12,
    timeTaken: 195,
    grade: 'B'
  },
];

export function QuizHistory({ onBack }: QuizHistoryProps) {
  const handleBack = () => {
    soundManager.playClick();
    onBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'easy') return '#00D9A3';
    if (difficulty === 'medium') return '#FFE500';
    return '#FF9500';
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A' || grade === 'A+') return '#00D9A3';
    if (grade === 'B') return '#FFE500';
    if (grade === 'C') return '#FF9500';
    return '#FF5757';
  };

  // Calculate stats
  const totalQuizzes = mockHistory.length;
  const totalQuestions = mockHistory.reduce((sum, entry) => sum + entry.totalQuestions, 0);
  const totalCorrect = mockHistory.reduce((sum, entry) => sum + entry.correctAnswers, 0);
  const avgAccuracy = Math.round((totalCorrect / totalQuestions) * 100);
  const avgScore = Math.round(mockHistory.reduce((sum, entry) => sum + entry.score, 0) / totalQuizzes);

  return (
    <div className="min-h-screen p-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#00B8D4] border-[4px] border-black dark:border-white flex items-center justify-center">
              <History size={36} strokeWidth={3} />
            </div>
            <div>
              <h1 className="uppercase tracking-tight dark:text-white">Quiz History</h1>
              <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide text-sm">
                Your Past Attempts
              </p>
            </div>
          </div>
          <BrutalistButton onClick={handleBack} variant="secondary">
            <ArrowLeft size={20} strokeWidth={3} />
            <span className="uppercase tracking-wide">Back</span>
          </BrutalistButton>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border-[4px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-6"
          >
            <p className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
              Total Quizzes
            </p>
            <p className="tracking-tight dark:text-white" style={{ fontSize: '2rem' }}>
              {totalQuizzes}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-[4px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-6"
          >
            <p className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
              Avg Accuracy
            </p>
            <p className="tracking-tight dark:text-white" style={{ fontSize: '2rem' }}>
              {avgAccuracy}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-[4px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-6"
          >
            <p className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
              Avg Score
            </p>
            <p className="tracking-tight dark:text-white" style={{ fontSize: '2rem' }}>
              {avgScore}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-[4px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-6"
          >
            <p className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
              Total Questions
            </p>
            <p className="tracking-tight dark:text-white" style={{ fontSize: '2rem' }}>
              {totalQuestions}
            </p>
          </motion.div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {mockHistory.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="border-[4px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
              {/* Header */}
              <div className="p-4 border-b-[3px] border-black dark:border-white bg-gray-50 dark:bg-[#1a1a1a]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} strokeWidth={3} className="dark:text-white" />
                    <span className="uppercase tracking-wide text-sm dark:text-white">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <div 
                    className="px-3 py-1 border-[3px] border-black dark:border-white"
                    style={{ backgroundColor: getGradeColor(entry.grade) }}
                  >
                    <span className="uppercase tracking-wide">Grade: {entry.grade}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="uppercase tracking-tight mb-2 dark:text-white">{entry.topic}</h3>
                    <div 
                      className="inline-block px-3 py-1 border-[3px] border-black dark:border-white"
                      style={{ backgroundColor: getDifficultyColor(entry.difficulty) }}
                    >
                      <span className="uppercase tracking-wide text-sm">{entry.difficulty}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="tracking-tight dark:text-white" style={{ fontSize: '2rem' }}>
                      {entry.score}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      Points
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Target size={20} strokeWidth={3} className="text-[#00D9A3]" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Score
                      </p>
                      <p className="uppercase tracking-wide dark:text-white">
                        {entry.correctAnswers}/{entry.totalQuestions}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={20} strokeWidth={3} className="text-[#FFE500]" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Time
                      </p>
                      <p className="uppercase tracking-wide dark:text-white">
                        {formatTime(entry.timeTaken)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} strokeWidth={3} className="text-[#FF9500]" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Accuracy
                      </p>
                      <p className="uppercase tracking-wide dark:text-white">
                        {Math.round((entry.correctAnswers / entry.totalQuestions) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State (if needed) */}
        {mockHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <History size={64} strokeWidth={2} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              No quiz history yet. Start a quiz to see your results here!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
