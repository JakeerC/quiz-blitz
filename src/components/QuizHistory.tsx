'use client';

import {
  History,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  ArrowLeft,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {BrutalistButton} from './ui/BrutalistButton';
import {soundManager} from '../utils/sounds';

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
  onBackAction: () => void;
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
    grade: 'A',
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
    grade: 'A',
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
    grade: 'A',
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
    grade: 'B',
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
    grade: 'B',
  },
];

export function QuizHistory({onBackAction}: QuizHistoryProps) {
  const handleBack = () => {
    soundManager.playClick();
    onBackAction();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
  const totalQuestions = mockHistory.reduce(
    (sum, entry) => sum + entry.totalQuestions,
    0
  );
  const totalCorrect = mockHistory.reduce(
    (sum, entry) => sum + entry.correctAnswers,
    0
  );
  const avgAccuracy = Math.round((totalCorrect / totalQuestions) * 100);
  const avgScore = Math.round(
    mockHistory.reduce((sum, entry) => sum + entry.score, 0) / totalQuizzes
  );

  return (
    <div className="min-h-screen p-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center border-4 border-black bg-[#00B8D4] dark:border-white">
              <History size={36} strokeWidth={3} />
            </div>
            <div>
              <h1 className="tracking-tight uppercase dark:text-white">
                Quiz History
              </h1>
              <p className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
                Your Past Attempts
              </p>
            </div>
          </div>
          <BrutalistButton onClick={handleBack} variant="secondary">
            <ArrowLeft size={20} strokeWidth={3} />
            <span className="tracking-wide uppercase">Back</span>
          </BrutalistButton>
        </div>

        {/* Summary Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="border-4 border-black bg-white p-6 dark:border-white dark:bg-[#2a2a2a]">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
              Total Quizzes
            </p>
            <p
              className="tracking-tight dark:text-white"
              style={{fontSize: '2rem'}}>
              {totalQuizzes}
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6 dark:border-white dark:bg-[#2a2a2a]">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
              Avg Accuracy
            </p>
            <p
              className="tracking-tight dark:text-white"
              style={{fontSize: '2rem'}}>
              {avgAccuracy}%
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6 dark:border-white dark:bg-[#2a2a2a]">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
              Avg Score
            </p>
            <p
              className="tracking-tight dark:text-white"
              style={{fontSize: '2rem'}}>
              {avgScore}
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6 dark:border-white dark:bg-[#2a2a2a]">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
              Total Questions
            </p>
            <p
              className="tracking-tight dark:text-white"
              style={{fontSize: '2rem'}}>
              {totalQuestions}
            </p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {mockHistory.map((entry, index) => (
            <div
              key={entry.id}
              className="overflow-hidden border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-[#2a2a2a] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              {/* Header */}
              <div className="border-b-[3px] border-black bg-gray-50 p-4 dark:border-white dark:bg-[#1a1a1a]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar
                      size={20}
                      strokeWidth={3}
                      className="dark:text-white"
                    />
                    <span className="text-sm tracking-wide uppercase dark:text-white">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <div
                    className="border-[3px] border-black px-3 py-1 dark:border-white"
                    style={{backgroundColor: getGradeColor(entry.grade)}}>
                    <span className="tracking-wide uppercase">
                      Grade: {entry.grade}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="mb-2 tracking-tight uppercase dark:text-white">
                      {entry.topic}
                    </h3>
                    <div
                      className="inline-block border-[3px] border-black px-3 py-1 dark:border-white"
                      style={{
                        backgroundColor: getDifficultyColor(entry.difficulty),
                      }}>
                      <span className="text-sm tracking-wide uppercase">
                        {entry.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className="tracking-tight dark:text-white"
                      style={{fontSize: '2rem'}}>
                      {entry.score}
                    </p>
                    <p className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
                      Points
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Target
                      size={20}
                      strokeWidth={3}
                      className="text-[#00D9A3]"
                    />
                    <div>
                      <p className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
                        Score
                      </p>
                      <p className="tracking-wide uppercase dark:text-white">
                        {entry.correctAnswers}/{entry.totalQuestions}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock
                      size={20}
                      strokeWidth={3}
                      className="text-[#FFE500]"
                    />
                    <div>
                      <p className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
                        Time
                      </p>
                      <p className="tracking-wide uppercase dark:text-white">
                        {formatTime(entry.timeTaken)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp
                      size={20}
                      strokeWidth={3}
                      className="text-[#FF9500]"
                    />
                    <div>
                      <p className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
                        Accuracy
                      </p>
                      <p className="tracking-wide uppercase dark:text-white">
                        {Math.round(
                          (entry.correctAnswers / entry.totalQuestions) * 100
                        )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if needed) */}
        {mockHistory.length === 0 && (
          <div className="py-20 text-center">
            <History
              size={64}
              strokeWidth={2}
              className="mx-auto mb-4 text-gray-400"
            />
            <p className="tracking-wide text-gray-600 uppercase dark:text-gray-400">
              No quiz history yet. Start a quiz to see your results here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
