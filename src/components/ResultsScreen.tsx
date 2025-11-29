import { motion } from 'motion/react';
import { Trophy, Clock, Target, TrendingUp, RotateCcw, Plus, BookOpen, Check, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BrutalistButton } from './ui/BrutalistButton';
import { soundManager } from '../utils/sounds';
import type { QuizResult, QuizConfig } from '../App';

type ResultsScreenProps = {
  result: QuizResult;
  config: QuizConfig;
  onRetake: () => void;
  onNewQuiz: () => void;
  onBackToDashboard: () => void;
};

export function ResultsScreen({ result, config, onRetake, onNewQuiz, onBackToDashboard }: ResultsScreenProps) {
  const scorePercentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  const isPassed = scorePercentage >= 70;
  
  const chartData = [
    { name: 'Correct', value: result.correctAnswers, color: '#00D9A3' },
    { name: 'Incorrect', value: result.incorrectAnswers, color: '#FF5757' }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrade = () => {
    if (scorePercentage >= 90) return { grade: 'A+', color: '#00D9A3' };
    if (scorePercentage >= 80) return { grade: 'A', color: '#00D9A3' };
    if (scorePercentage >= 70) return { grade: 'B', color: '#FFE500' };
    if (scorePercentage >= 60) return { grade: 'C', color: '#FF9500' };
    return { grade: 'F', color: '#FF5757' };
  };

  const grade = getGrade();

  // Skills to improve
  const skillsToImprove = result.weakTopics.length > 0 
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
    <div className="min-h-screen p-6 bg-transparent py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-16 h-16 border-[4px] border-black dark:border-white flex items-center justify-center`}
               style={{ backgroundColor: grade.color }}>
            <Trophy size={32} strokeWidth={3} />
          </div>
          <div>
            <h1 className="uppercase tracking-tight dark:text-white">Quiz Complete!</h1>
            <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide text-sm">
              {isPassed ? 'Great work!' : 'Keep practicing!'}
            </p>
          </div>
        </div>

        {/* Main Results Container */}
        <div className="border-[6px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] mb-8">
          
          {/* Score Section */}
          <div className="p-8 border-b-[4px] border-black dark:border-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mb-2 uppercase tracking-tight dark:text-white">Your Score</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {result.correctAnswers} out of {result.totalQuestions} correct
                </p>
              </div>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-32 h-32 border-[4px] border-black dark:border-white flex items-center justify-center"
                style={{ backgroundColor: grade.color }}
              >
                <span className="tracking-tight" style={{ fontSize: '3rem' }}>{scorePercentage}%</span>
              </motion.div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b-[4px] border-black dark:border-white">
            
            {/* Stat: Time */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 border-b-[4px] md:border-b-0 md:border-r-[4px] border-black dark:border-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock size={24} strokeWidth={3} className="dark:text-white" />
                <h3 className="uppercase tracking-wide dark:text-white">Time</h3>
              </div>
              <p className="tracking-wide dark:text-white">{formatTime(result.timeTaken)}</p>
            </motion.div>

            {/* Stat: Accuracy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 border-b-[4px] md:border-b-0 md:border-r-[4px] border-black dark:border-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <Target size={24} strokeWidth={3} className="dark:text-white" />
                <h3 className="uppercase tracking-wide dark:text-white">Accuracy</h3>
              </div>
              <p className="tracking-wide dark:text-white">{scorePercentage}%</p>
            </motion.div>

            {/* Stat: Grade */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp size={24} strokeWidth={3} className="dark:text-white" />
                <h3 className="uppercase tracking-wide dark:text-white">Grade</h3>
              </div>
              <p className="tracking-wide dark:text-white">{grade.grade}</p>
            </motion.div>

          </div>

          {/* Chart Section */}
          <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
            
            {/* Pie Chart */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="w-48 h-48 border-[4px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-2 flex-shrink-0"
            >
              <div className="w-full h-full">
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
                      strokeWidth={3}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Legend & Breakdown */}
            <div className="flex-1">
              <h3 className="uppercase tracking-wide mb-4 dark:text-white">Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#00D9A3] border-[3px] border-black dark:border-white"></div>
                  <span className="uppercase tracking-wide dark:text-white">Correct: {result.correctAnswers}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF5757] border-[3px] border-black dark:border-white"></div>
                  <span className="uppercase tracking-wide dark:text-white">Incorrect: {result.incorrectAnswers}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Skills to Improve */}
          {skillsToImprove.length > 0 && (
            <div className="p-8 border-t-[4px] border-black dark:border-white bg-[#FFE500] dark:bg-[#FF9500]">
              <h3 className="uppercase tracking-wide mb-4">Skills To Improve</h3>
              <div className="flex flex-wrap gap-3">
                {skillsToImprove.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="px-4 py-2 bg-white dark:bg-[#2a2a2a] border-[3px] border-black dark:border-white"
                  >
                    <span className="uppercase tracking-wide text-sm dark:text-white">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Question Review Section */}
        {result.questionDetails && result.questionDetails.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen size={28} strokeWidth={3} className="dark:text-white" />
              <h2 className="uppercase tracking-tight dark:text-white">Question Review</h2>
            </div>

            <div className="space-y-4">
              {result.questionDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="border-[4px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] overflow-hidden"
                >
                  {/* Question Header */}
                  <div className={`p-4 border-b-[4px] border-black dark:border-white ${detail.isCorrect ? 'bg-[#00D9A3]' : 'bg-[#FF5757]'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {detail.isCorrect ? (
                          <Check size={24} strokeWidth={3} className="flex-shrink-0 mt-1" />
                        ) : (
                          <X size={24} strokeWidth={3} className="flex-shrink-0 mt-1" />
                        )}
                        <div>
                          <span className="uppercase tracking-wide">Question {index + 1}</span>
                          <p className="mt-1">{detail.question}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Answer Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="uppercase tracking-wide text-sm text-gray-600 dark:text-gray-400">Your Answer:</span>
                      <p className={`mt-1 uppercase tracking-wide ${detail.isCorrect ? 'text-[#00D9A3]' : 'text-[#FF5757]'}`}>
                        {detail.userAnswer}
                      </p>
                    </div>

                    {!detail.isCorrect && (
                      <div>
                        <span className="uppercase tracking-wide text-sm text-gray-600 dark:text-gray-400">Correct Answer:</span>
                        <p className="mt-1 uppercase tracking-wide text-[#00D9A3] dark:text-white">
                          {detail.correctAnswer}
                        </p>
                      </div>
                    )}

                    <div className="pt-4 border-t-[3px] border-gray-200 dark:border-gray-700">
                      <span className="uppercase tracking-wide text-sm text-gray-600 dark:text-gray-400">Explanation:</span>
                      <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {detail.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <BrutalistButton 
            onClick={handleRetake} 
            variant="secondary"
            size="large"
            className="flex items-center gap-3"
          >
            <RotateCcw size={24} strokeWidth={3} />
            <span className="uppercase tracking-widest">Retake Quiz</span>
          </BrutalistButton>

          <BrutalistButton 
            onClick={handleNewQuiz} 
            variant="primary"
            size="large"
            className="flex items-center gap-3"
          >
            <Plus size={24} strokeWidth={3} />
            <span className="uppercase tracking-widest">New Quiz</span>
          </BrutalistButton>

          <BrutalistButton 
            onClick={() => { soundManager.playClick(); onBackToDashboard(); }} 
            variant="secondary"
            size="large"
            className="flex items-center gap-3"
          >
            <span className="uppercase tracking-widest">← Dashboard</span>
          </BrutalistButton>
        </div>

      </motion.div>
    </div>
  );
}