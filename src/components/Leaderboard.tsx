import { motion } from 'motion/react';
import { Crown, Medal, TrendingUp, ArrowLeft } from 'lucide-react';
import { BrutalistButton } from './ui/BrutalistButton';
import { soundManager } from '../utils/sounds';

type LeaderboardEntry = {
  rank: number;
  username: string;
  score: number;
  quizzes: number;
  accuracy: number;
};

type LeaderboardProps = {
  onBack: () => void;
  currentUser: string;
};

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'QuizMaster', score: 9850, quizzes: 127, accuracy: 96 },
  { rank: 2, username: 'BrainBox', score: 8920, quizzes: 115, accuracy: 94 },
  { rank: 3, username: 'KnowledgeKing', score: 8450, quizzes: 108, accuracy: 92 },
  { rank: 4, username: 'SmartCookie', score: 7890, quizzes: 98, accuracy: 91 },
  { rank: 5, username: 'ThinkTank', score: 7320, quizzes: 89, accuracy: 89 },
  { rank: 6, username: 'Demo User', score: 6750, quizzes: 82, accuracy: 88 },
  { rank: 7, username: 'QuizWhiz', score: 6210, quizzes: 76, accuracy: 86 },
  { rank: 8, username: 'FactFinder', score: 5890, quizzes: 71, accuracy: 85 },
  { rank: 9, username: 'TriviaChamp', score: 5420, quizzes: 65, accuracy: 83 },
  { rank: 10, username: 'StudyBuddy', score: 4950, quizzes: 60, accuracy: 82 },
];

export function Leaderboard({ onBack, currentUser }: LeaderboardProps) {
  const handleBack = () => {
    soundManager.playClick();
    onBack();
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#FFE500';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#FFFFFF';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={28} strokeWidth={3} fill="#FFE500" />;
    if (rank === 2) return <Medal size={28} strokeWidth={3} />;
    if (rank === 3) return <Medal size={28} strokeWidth={3} />;
    return null;
  };

  return (
    <div className="min-h-screen p-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#FFE500] border-[4px] border-black dark:border-white flex items-center justify-center">
              <TrendingUp size={36} strokeWidth={3} />
            </div>
            <div>
              <h1 className="uppercase tracking-tight dark:text-white">Leaderboard</h1>
              <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide text-sm">
                Top Quiz Champions
              </p>
            </div>
          </div>
          <BrutalistButton onClick={handleBack} variant="secondary">
            <ArrowLeft size={20} strokeWidth={3} />
            <span className="uppercase tracking-wide">Back</span>
          </BrutalistButton>
        </div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-3 gap-4 items-end">
            {/* Second Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="order-1"
            >
              <div className="border-[4px] border-black dark:border-white bg-[#C0C0C0] p-6 text-center mb-2">
                <div className="flex justify-center mb-2">
                  <Medal size={32} strokeWidth={3} />
                </div>
                <p className="text-sm uppercase tracking-wide mb-1">2nd Place</p>
                <p className="uppercase tracking-tight mb-1">{mockLeaderboard[1].username}</p>
                <p className="tracking-tight">{mockLeaderboard[1].score}</p>
              </div>
              <div className="h-32 border-[4px] border-black dark:border-white bg-[#C0C0C0]"></div>
            </motion.div>

            {/* First Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="order-2"
            >
              <div className="border-[4px] border-black dark:border-white bg-[#FFE500] p-6 text-center mb-2">
                <div className="flex justify-center mb-2">
                  <Crown size={40} strokeWidth={3} fill="#000" />
                </div>
                <p className="text-sm uppercase tracking-wide mb-1">1st Place</p>
                <p className="uppercase tracking-tight mb-1">{mockLeaderboard[0].username}</p>
                <p className="tracking-tight" style={{ fontSize: '1.5rem' }}>{mockLeaderboard[0].score}</p>
              </div>
              <div className="h-48 border-[4px] border-black dark:border-white bg-[#FFE500]"></div>
            </motion.div>

            {/* Third Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="order-3"
            >
              <div className="border-[4px] border-black dark:border-white bg-[#CD7F32] p-6 text-center mb-2">
                <div className="flex justify-center mb-2">
                  <Medal size={32} strokeWidth={3} />
                </div>
                <p className="text-sm uppercase tracking-wide mb-1">3rd Place</p>
                <p className="uppercase tracking-tight mb-1">{mockLeaderboard[2].username}</p>
                <p className="tracking-tight">{mockLeaderboard[2].score}</p>
              </div>
              <div className="h-24 border-[4px] border-black dark:border-white bg-[#CD7F32]"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border-[6px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
        >
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 bg-black dark:bg-white text-white dark:text-black border-b-[4px] border-black dark:border-white">
            <p className="uppercase tracking-wide text-sm">Rank</p>
            <p className="uppercase tracking-wide text-sm col-span-2">Player</p>
            <p className="uppercase tracking-wide text-sm text-right">Score</p>
            <p className="uppercase tracking-wide text-sm text-right">Accuracy</p>
          </div>

          {/* Table Body */}
          <div className="divide-y-[3px] divide-gray-200 dark:divide-gray-700">
            {mockLeaderboard.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className={`grid grid-cols-5 gap-4 p-4 ${
                  entry.username === currentUser ? 'bg-[#FFE500]' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  {getRankIcon(entry.rank)}
                  <span className="uppercase tracking-wide dark:text-white">#{entry.rank}</span>
                </div>
                <p className="uppercase tracking-wide col-span-2 dark:text-white">{entry.username}</p>
                <p className="uppercase tracking-wide text-right dark:text-white">{entry.score}</p>
                <p className="uppercase tracking-wide text-right dark:text-white">{entry.accuracy}%</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 p-4 border-[4px] border-black dark:border-white bg-[#FFFEF9] dark:bg-[#1a1a1a]"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            💡 Score = (Correct Answers × 100) - (Time Penalty) + (Streak Bonus)
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
