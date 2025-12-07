'use client';

import {
  History as HistoryIcon,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';
import {BrutalistButton} from '@/components/ui/BrutalistButton';
import {soundManager} from '@/utils';
import {color} from '@/constants/colors';
import {Difficulty, Grade} from '@/types';
import {mockHistory} from '@/mocks/history';

type HistoryProps = {
  onBackAction: () => void;
};

export function History({onBackAction}: HistoryProps) {
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

  const getDifficultyColor = (difficulty: Difficulty) => {
    if (difficulty === 'easy') return '#00D9A3';
    if (difficulty === 'medium') return '#FFE500';
    return '#FF9500';
  };

  const getGradeColor = (grade: Grade) => {
    if (grade === 'A' || grade === 'A+') return color.gradeAplus;
    if (grade === 'B') return color.gradeB;
    if (grade === 'C') return color.gradeC;
    return color.gradeF;
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
            <div className="border-box flex h-16 w-16 items-center justify-center bg-[#00B8D4]">
              <HistoryIcon size={36} strokeWidth={3} />
            </div>
            <div>
              <h1 className="tracking-tight uppercase">Quiz History</h1>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
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
          <div className="border-box bg-white p-6">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
              Total Quizzes
            </p>
            <p className="tracking-tight" style={{fontSize: '2rem'}}>
              {totalQuizzes}
            </p>
          </div>

          <div className="border-box bg-white p-6">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
              Avg Accuracy
            </p>
            <p className="tracking-tight" style={{fontSize: '2rem'}}>
              {avgAccuracy}%
            </p>
          </div>

          <div className="border-box bg-white p-6">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
              Avg Score
            </p>
            <p className="tracking-tight" style={{fontSize: '2rem'}}>
              {avgScore}
            </p>
          </div>

          <div className="border-box bg-white p-6">
            <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase">
              Total Questions
            </p>
            <p className="tracking-tight" style={{fontSize: '2rem'}}>
              {totalQuestions}
            </p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {mockHistory.map((entry) => (
            <div
              key={entry.id}
              className="border-box overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {/* Header */}
              <div className="border-b-4 border-black bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} strokeWidth={3} className="" />
                    <span className="text-sm tracking-wide uppercase">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <div
                    className="border-box px-3 py-1"
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
                    <h3 className="mb-2 tracking-tight uppercase">
                      {entry.topic}
                    </h3>
                    <div
                      className="border-box inline-block px-3 py-1"
                      style={{
                        backgroundColor: getDifficultyColor(entry.difficulty),
                      }}>
                      <span className="text-sm tracking-wide uppercase">
                        {entry.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="tracking-tight" style={{fontSize: '2rem'}}>
                      {entry.score}
                    </p>
                    <p className="text-sm tracking-wide text-gray-600 uppercase">
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
                      <p className="text-sm tracking-wide text-gray-600 uppercase">
                        Score
                      </p>
                      <p className="tracking-wide uppercase">
                        {entry.correctAnswers}/{entry.totalQuestions}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={20} strokeWidth={3} className="text-primary" />
                    <div>
                      <p className="text-sm tracking-wide text-gray-600 uppercase">
                        Time
                      </p>
                      <p className="tracking-wide uppercase">
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
                      <p className="text-sm tracking-wide text-gray-600 uppercase">
                        Accuracy
                      </p>
                      <p className="tracking-wide uppercase">
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
            <HistoryIcon
              size={64}
              strokeWidth={2}
              className="mx-auto mb-4 text-gray-400"
            />
            <p className="tracking-wide text-gray-600 uppercase">
              No quiz history yet. Start a quiz to see your results here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
