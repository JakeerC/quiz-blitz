'use client';

import {Crown, Medal, TrendingUp, ArrowLeft} from 'lucide-react';
import {Button} from '@/components/ui/Button';
import {soundManager} from '@/utils';

import {mockLeaderboard} from '@/mocks/leaderboard';

type LeaderboardProps = {
  onBackAction: () => void;
  currentUser: string;
};

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
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary border-box flex h-16 w-16 items-center justify-center">
              <TrendingUp size={36} strokeWidth={3} />
            </div>
            <div>
              <h1 className="tracking-tight uppercase">Leaderboard</h1>
              <p className="text-sm tracking-wide text-gray-600 uppercase">
                Top Quiz Champions
              </p>
            </div>
          </div>
          <Button onClick={handleBack} variant="secondary">
            <ArrowLeft size={20} strokeWidth={3} />
            <span className="tracking-wide uppercase">Back</span>
          </Button>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8">
          <div className="grid grid-cols-3 items-end gap-4">
            {/* Second Place */}
            <div className="order-1">
              <div className="border-box mb-2 bg-[#C0C0C0] p-6 text-center">
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
              <div className="border-box h-32 bg-[#C0C0C0]"></div>
            </div>

            {/* First Place */}
            <div className="order-2">
              <div className="bg-primary border-box mb-2 p-6 text-center">
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
              <div className="bg-primary border-box h-48"></div>
            </div>

            {/* Third Place */}
            <div className="order-3">
              <div className="border-box mb-2 bg-[#CD7F32] p-6 text-center">
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
              <div className="border-box h-24 bg-[#CD7F32]"></div>
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
        <div className="border-box mt-6 bg-[#FFFEF9] p-4">
          <p className="text-sm tracking-wide text-gray-600 uppercase">
            💡 Score = (Correct Answers × 100) - (Time Penalty) + (Streak Bonus)
          </p>
        </div>
      </div>
    </div>
  );
}
