'use client';

import {Crown, Medal, TrendingUp, ArrowLeft} from 'lucide-react';
import {BrutalistButton} from './ui/BrutalistButton';
import {soundManager} from '../utils/sounds';

type LeaderboardEntry = {
  rank: number;
  username: string;
  score: number;
  quizzes: number;
  accuracy: number;
};

type LeaderboardProps = {
  onBackAction: () => void;
  currentUser: string;
};

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  {rank: 1, username: 'QuizMaster', score: 9850, quizzes: 127, accuracy: 96},
  {rank: 2, username: 'BrainBox', score: 8920, quizzes: 115, accuracy: 94},
  {rank: 3, username: 'KnowledgeKing', score: 8450, quizzes: 108, accuracy: 92},
  {rank: 4, username: 'SmartCookie', score: 7890, quizzes: 98, accuracy: 91},
  {rank: 5, username: 'ThinkTank', score: 7320, quizzes: 89, accuracy: 89},
  {rank: 6, username: 'Demo User', score: 6750, quizzes: 82, accuracy: 88},
  {rank: 7, username: 'QuizWhiz', score: 6210, quizzes: 76, accuracy: 86},
  {rank: 8, username: 'FactFinder', score: 5890, quizzes: 71, accuracy: 85},
  {rank: 9, username: 'TriviaChamp', score: 5420, quizzes: 65, accuracy: 83},
  {rank: 10, username: 'StudyBuddy', score: 4950, quizzes: 60, accuracy: 82},
];

export function Leaderboard({onBackAction, currentUser}: LeaderboardProps) {
  const handleBack = () => {
    soundManager.playClick();
    onBackAction();
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={28} strokeWidth={3} fill="#FFE500" />;
    if (rank === 2) return <Medal size={28} strokeWidth={3} />;
    if (rank === 3) return <Medal size={28} strokeWidth={3} />;
    return null;
  };

  return (
    <div className="min-h-screen p-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary flex h-16 w-16 items-center justify-center border-4 border-black">
              <TrendingUp size={36} strokeWidth={3} />
            </div>
            <div>
              <h1 className="tracking-tight uppercase">Leaderboard</h1>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
                Top Quiz Champions
              </p>
            </div>
          </div>
          <BrutalistButton onClick={handleBack} variant="secondary">
            <ArrowLeft size={20} strokeWidth={3} />
            <span className="tracking-wide uppercase">Back</span>
          </BrutalistButton>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8">
          <div className="grid grid-cols-3 items-end gap-4">
            {/* Second Place */}
            <div className="order-1">
              <div className="mb-2 border-4 border-black bg-[#C0C0C0] p-6 text-center">
                <div className="mb-2 flex justify-center">
                  <Medal size={32} strokeWidth={3} />
                </div>
                <p className="mb-1 text-sm tracking-wide uppercase">
                  2nd Place
                </p>
                <p className="mb-1 tracking-tight uppercase">
                  {mockLeaderboard[1].username}
                </p>
                <p className="tracking-tight">{mockLeaderboard[1].score}</p>
              </div>
              <div className="h-32 border-4 border-black bg-[#C0C0C0]"></div>
            </div>

            {/* First Place */}
            <div className="order-2">
              <div className="bg-primary mb-2 border-4 border-black p-6 text-center">
                <div className="mb-2 flex justify-center">
                  <Crown size={40} strokeWidth={3} fill="#000" />
                </div>
                <p className="mb-1 text-sm tracking-wide uppercase">
                  1st Place
                </p>
                <p className="mb-1 tracking-tight uppercase">
                  {mockLeaderboard[0].username}
                </p>
                <p className="tracking-tight" style={{fontSize: '1.5rem'}}>
                  {mockLeaderboard[0].score}
                </p>
              </div>
              <div className="bg-primary h-48 border-4 border-black"></div>
            </div>

            {/* Third Place */}
            <div className="order-3">
              <div className="mb-2 border-4 border-black bg-[#CD7F32] p-6 text-center">
                <div className="mb-2 flex justify-center">
                  <Medal size={32} strokeWidth={3} />
                </div>
                <p className="mb-1 text-sm tracking-wide uppercase">
                  3rd Place
                </p>
                <p className="mb-1 tracking-tight uppercase">
                  {mockLeaderboard[2].username}
                </p>
                <p className="tracking-tight">{mockLeaderboard[2].score}</p>
              </div>
              <div className="h-24 border-4 border-black bg-[#CD7F32]"></div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 border-b-4 border-black bg-black p-4 text-white">
            <p className="text-sm tracking-wide uppercase">Rank</p>
            <p className="col-span-2 text-sm tracking-wide uppercase">Player</p>
            <p className="text-right text-sm tracking-wide uppercase">Score</p>
            <p className="text-right text-sm tracking-wide uppercase">
              Accuracy
            </p>
          </div>

          {/* Table Body */}
          <div className="divide-y-4 divide-gray-200">
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`grid grid-cols-5 gap-4 p-4 ${
                  entry.username === currentUser ? 'bg-primary' : ''
                }`}>
                <div className="flex items-center gap-2">
                  {getRankIcon(entry.rank)}
                  <span className="tracking-wide uppercase">#{entry.rank}</span>
                </div>
                <p className="col-span-2 tracking-wide uppercase">
                  {entry.username}
                </p>
                <p className="text-right tracking-wide uppercase">
                  {entry.score}
                </p>
                <p className="text-right tracking-wide uppercase">
                  {entry.accuracy}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Legend */}
        <div className="mt-6 border-4 border-black bg-[#FFFEF9] p-4">
          <p className="text-sm tracking-wide text-gray-600 uppercase">
            💡 Score = (Correct Answers × 100) - (Time Penalty) + (Streak Bonus)
          </p>
        </div>
      </div>
    </div>
  );
}
