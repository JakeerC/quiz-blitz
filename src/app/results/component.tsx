import {
  Trophy,
  Clock,
  Target,
  TrendingUp,
  RotateCcw,
  Plus,
  BookOpen,
  Check,
  X,
} from 'lucide-react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import {BrutalistButton} from '@/components/ui/BrutalistButton';
import {soundManager} from '@/utils';
import type {QuizResult, QuizConfig, Grade} from '@/types';
import {color} from '@/constants/colors';

type ResultsProps = {
  result: QuizResult;
  config: QuizConfig;
  onRetake: () => void;
  onNewQuiz: () => void;
  onBackToDashboard: () => void;
};

export function Results({
  result,
  config,
  onRetake,
  onNewQuiz,
  onBackToDashboard,
}: ResultsProps) {
  const scorePercentage = Math.round(
    (result.correctAnswers / result.totalQuestions) * 100
  );
  const isPassed = scorePercentage >= 70;

  const chartData = [
    {name: 'Correct', value: result.correctAnswers, color: color.correct},
    {name: 'Incorrect', value: result.incorrectAnswers, color: color.incorrect},
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrade = (): {grade: Grade; color: string} => {
    if (scorePercentage >= 90) return {grade: 'A+', color: color.gradeAplus};
    if (scorePercentage >= 80) return {grade: 'A', color: color.gradeA};
    if (scorePercentage >= 70) return {grade: 'B', color: color.gradeB};
    if (scorePercentage >= 60) return {grade: 'C', color: color.gradeC};
    return {grade: 'F', color: color.gradeF};
  };

  const grade = getGrade();

  // Skills to improve
  const skillsToImprove =
    result.weakTopics.length > 0
      ? result.weakTopics
      : scorePercentage < 70
        ? [config.topic, 'Time Management']
        : [];

  const handleRetake = () => {
    soundManager.playClick();
    onRetake();
  };

  const handleNewQuiz = () => {
    soundManager.playClick();
    onNewQuiz();
  };

  return (
    <div className="min-h-screen bg-transparent p-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div
            className={`border-box flex h-16 w-16 items-center justify-center`}
            style={{backgroundColor: grade.color}}>
            <Trophy size={32} strokeWidth={3} />
          </div>
          <div>
            <h1 className="tracking-tight uppercase">Quiz Complete!</h1>
            <p className="text-sm tracking-wide text-gray-600 uppercase">
              {isPassed ? 'Great work!' : 'Keep practicing!'}
            </p>
          </div>
        </div>

        {/* Main Results Container */}
        <div className="card mb-8">
          {/* Score Section */}
          <div className="border-b-4 border-black p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mb-2 tracking-tight uppercase">Your Score</h2>
                <p className="text-gray-600">
                  {result.correctAnswers} out of {result.totalQuestions} correct
                </p>
              </div>
              <div
                className="border-box flex h-32 w-32 items-center justify-center"
                style={{backgroundColor: grade.color}}>
                <span className="tracking-tight" style={{fontSize: '3rem'}}>
                  {scorePercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 border-b-4 border-black md:grid-cols-3">
            {/* Stat: Time */}
            <div className="border-b-4 border-black p-6 md:border-r-4 md:border-b-0">
              <div className="mb-2 flex items-center gap-3">
                <Clock size={24} strokeWidth={3} className="" />
                <h3 className="tracking-wide uppercase">Time</h3>
              </div>
              <p className="tracking-wide">{formatTime(result.timeTaken)}</p>
            </div>

            {/* Stat: Accuracy */}
            <div className="border-b-4 border-black p-6 md:border-r-4 md:border-b-0">
              <div className="mb-2 flex items-center gap-3">
                <Target size={24} strokeWidth={3} className="" />
                <h3 className="tracking-wide uppercase">Accuracy</h3>
              </div>
              <p className="tracking-wide">{scorePercentage}%</p>
            </div>

            {/* Stat: Grade */}
            <div className="p-6">
              <div className="mb-2 flex items-center gap-3">
                <TrendingUp size={24} strokeWidth={3} className="" />
                <h3 className="tracking-wide uppercase">Grade</h3>
              </div>
              <p className="tracking-wide">{grade.grade}</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex flex-col items-center gap-8 p-8 md:flex-row">
            {/* Pie Chart */}
            <div className="border-box h-48 w-48 shrink-0 bg-white p-2">
              <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      dataKey="value"
                      stroke="#000"
                      strokeWidth={3}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Legend & Breakdown */}
            <div className="flex-1">
              <h3 className="mb-4 tracking-wide uppercase">Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="border-box h-6 w-6 bg-[#00D9A3]"></div>
                  <span className="tracking-wide uppercase">
                    Correct: {result.correctAnswers}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="border-box h-6 w-6 bg-[#FF5757]"></div>
                  <span className="tracking-wide uppercase">
                    Incorrect: {result.incorrectAnswers}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills to Improve */}
          {skillsToImprove.length > 0 && (
            <div className="bg-primary border-t-4 border-black p-8">
              <h3 className="mb-4 tracking-wide uppercase">
                Skills To Improve
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillsToImprove.map((skill, index) => (
                  <div key={index} className="border-box bg-white px-4 py-2">
                    <span className="text-sm tracking-wide uppercase">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Question Review Section */}
        {result.questionDetails && result.questionDetails.length > 0 && (
          <div className="mb-8">
            <div className="mb-6 flex items-center gap-3">
              <BookOpen size={28} strokeWidth={3} className="" />
              <h2 className="tracking-tight uppercase">Question Review</h2>
            </div>

            <div className="space-y-4">
              {result.questionDetails.map((detail, index) => (
                <div
                  key={index}
                  className="border-box overflow-hidden bg-white">
                  {/* Question Header */}
                  <div
                    className={`border-b-4 border-black p-4 ${detail.isCorrect ? 'bg-[#00D9A3]' : 'bg-[#FF5757]'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {detail.isCorrect ? (
                          <Check
                            size={24}
                            strokeWidth={3}
                            className="mt-1 shrink-0"
                          />
                        ) : (
                          <X
                            size={24}
                            strokeWidth={3}
                            className="mt-1 shrink-0"
                          />
                        )}
                        <div>
                          <span className="tracking-wide uppercase">
                            Question {index + 1}
                          </span>
                          <p className="mt-1">{detail.question}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Answer Details */}
                  <div className="space-y-4 p-6">
                    <div>
                      <span className="text-sm tracking-wide text-gray-600 uppercase">
                        Your Answer:
                      </span>
                      <p
                        className={`mt-1 tracking-wide uppercase ${detail.isCorrect ? 'text-[#00D9A3]' : 'text-[#FF5757]'}`}>
                        {detail.userAnswer}
                      </p>
                    </div>

                    {!detail.isCorrect && (
                      <div>
                        <span className="text-sm tracking-wide text-gray-600 uppercase">
                          Correct Answer:
                        </span>
                        <p className="mt-1 tracking-wide text-[#00D9A3] uppercase">
                          {detail.correctAnswer}
                        </p>
                      </div>
                    )}

                    <div className="border-t-4 border-gray-200 pt-4">
                      <span className="text-sm tracking-wide text-gray-600 uppercase">
                        Explanation:
                      </span>
                      <p className="mt-2 leading-relaxed text-gray-700">
                        {detail.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <BrutalistButton
            onClick={handleRetake}
            variant="secondary"
            size="large"
            className="flex items-center gap-3">
            <RotateCcw size={24} strokeWidth={3} />
            <span className="tracking-widest uppercase">Retake Quiz</span>
          </BrutalistButton>

          <BrutalistButton
            onClick={handleNewQuiz}
            variant="primary"
            size="large"
            className="flex items-center gap-3">
            <Plus size={24} strokeWidth={3} />
            <span className="tracking-widest uppercase">New Quiz</span>
          </BrutalistButton>

          <BrutalistButton
            onClick={() => {
              soundManager.playClick();
              onBackToDashboard();
            }}
            variant="secondary"
            size="large"
            className="flex items-center gap-3">
            <span className="tracking-widest uppercase">← Dashboard</span>
          </BrutalistButton>
        </div>
      </div>
    </div>
  );
}
