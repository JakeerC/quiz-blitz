import { motion } from 'motion/react';
import { Play, Trophy, History, BarChart3, LogOut, Zap } from 'lucide-react';
import { soundManager } from '../utils/sounds';

type DashboardProps = {
  username: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  userStats: {
    totalQuizzes: number;
    totalCorrect: number;
    totalQuestions: number;
    achievements: number;
  };
};

export function Dashboard({ username, onNavigate, onLogout, userStats }: DashboardProps) {
  const handleNavigate = (screen: string) => {
    soundManager.playClick();
    onNavigate(screen);
  };

  const handleLogout = () => {
    soundManager.playClick();
    onLogout();
  };

  const accuracy = userStats.totalQuestions > 0 
    ? Math.round((userStats.totalCorrect / userStats.totalQuestions) * 100)
    : 0;

  const menuItems = [
    { icon: Play, label: 'New Quiz', screen: 'setup', color: '#00D9A3' },
    { icon: BarChart3, label: 'Leaderboard', screen: 'leaderboard', color: '#FFE500' },
    { icon: History, label: 'Quiz History', screen: 'history', color: '#00B8D4' },
    { icon: Trophy, label: 'Achievements', screen: 'trophies', color: '#FF9500' },
  ];

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
            <div className="w-16 h-16 bg-[#FFE500] border-[4px] border-black dark:border-white flex items-center justify-center">
              <Zap size={36} strokeWidth={3} fill="#000" />
            </div>
            <div>
              <h1 className="uppercase tracking-tight dark:text-white">Welcome Back!</h1>
              <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide text-sm">
                {username}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 border-[4px] border-black dark:border-white bg-[#FF5757] hover:bg-[#FF4444] flex items-center gap-2 transition-colors"
          >
            <LogOut size={20} strokeWidth={3} />
            <span className="uppercase tracking-wide">Logout</span>
          </button>
        </div>

        {/* Stats Cards */}
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
              {userStats.totalQuizzes}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-[4px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-6"
          >
            <p className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
              Accuracy
            </p>
            <p className="tracking-tight dark:text-white" style={{ fontSize: '2rem' }}>
              {accuracy}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-[4px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-6"
          >
            <p className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
              Questions Answered
            </p>
            <p className="tracking-tight dark:text-white" style={{ fontSize: '2rem' }}>
              {userStats.totalQuestions}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-[4px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-6"
          >
            <p className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
              Achievements
            </p>
            <p className="tracking-tight dark:text-white" style={{ fontSize: '2rem' }}>
              {userStats.achievements}
            </p>
          </motion.div>
        </div>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.screen}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigate(item.screen)}
              className="border-[6px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-8 hover:bg-gray-50 dark:hover:bg-[#3a3a3a] transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 border-[4px] border-black dark:border-white flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon size={32} strokeWidth={3} />
                </div>
                <h2 className="uppercase tracking-tight dark:text-white">{item.label}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide text-sm">
                {item.screen === 'setup' && 'Start a new quiz session'}
                {item.screen === 'leaderboard' && 'See top performers'}
                {item.screen === 'history' && 'View past quiz attempts'}
                {item.screen === 'trophies' && 'Track your progress'}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Quick Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 border-[4px] border-black dark:border-white bg-[#FFE500] p-6"
        >
          <p className="uppercase tracking-wide">
            💡 Complete quizzes to unlock achievements and climb the leaderboard!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
