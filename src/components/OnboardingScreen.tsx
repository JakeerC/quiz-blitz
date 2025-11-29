import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { BrutalistButton } from './ui/BrutalistButton';
import { soundManager } from '../utils/sounds';

type OnboardingScreenProps = {
  onStart: () => void;
};

export function OnboardingScreen({ onStart }: OnboardingScreenProps) {
  const handleStart = () => {
    soundManager.playClick();
    onStart();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Main Container */}
        <div className="border-[6px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="w-20 h-20 bg-[#FFE500] border-[4px] border-black dark:border-white flex items-center justify-center mb-8 mx-auto"
          >
            <Sparkles size={40} strokeWidth={3} />
          </motion.div>

          {/* App Name */}
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-4 uppercase tracking-tight dark:text-white"
          >
            QuizBrut
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12 text-gray-700 dark:text-gray-300 max-w-md mx-auto"
          >
            Learn Fast. Fail Playfully.
          </motion.p>

          {/* Decorative Blocks */}
          <div className="flex gap-4 justify-center mb-12">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0 }}
              className="w-16 h-16 bg-[#FF5757] border-[3px] border-black dark:border-white"
            />
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
              className="w-16 h-16 bg-[#00D9A3] border-[3px] border-black dark:border-white"
            />
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
              className="w-16 h-16 bg-[#5B8BFF] border-[3px] border-black dark:border-white"
            />
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <BrutalistButton 
              onClick={handleStart} 
              variant="primary" 
              size="large"
              className="w-full max-w-xs"
            >
              <span className="uppercase tracking-widest">Start Quiz</span>
            </BrutalistButton>
          </div>

        </div>

        {/* Bottom accent */}
        <div className="h-3 bg-black dark:bg-white mt-6"></div>
      </motion.div>
    </div>
  );
}