'use client';

import {useState} from 'react';
import {Sparkles} from 'lucide-react';
import {BrutalistButton} from './ui/BrutalistButton';
import {soundManager} from '../utils/sounds';

type OnboardingScreenProps = {
  onStart: () => void;
};

export function OnboardingScreen({onStart}: OnboardingScreenProps) {
  const handleStart = () => {
    soundManager.playClick();
    onStart();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent p-6">
      <div className="w-full max-w-2xl">
        {/* Main Container */}
        <div className="border-[6px] border-black bg-white p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-[#2a2a2a] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          {/* Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center border-[4px] border-black bg-[#FFE500] dark:border-white">
            <Sparkles size={40} strokeWidth={3} />
          </div>

          {/* App Name */}
          <h1 className="mb-4 text-center tracking-tight uppercase dark:text-white">
            QuizBrut
          </h1>

          {/* Tagline */}
          <p className="mx-auto mb-12 max-w-md text-center text-gray-700 dark:text-gray-300">
            Learn Fast. Fail Playfully.
          </p>

          {/* Decorative Blocks */}
          <div className="mb-12 flex justify-center gap-4">
            <div className="h-16 w-16 border-[3px] border-black bg-[#FF5757] dark:border-white" />
            <div className="h-16 w-16 border-[3px] border-black bg-[#00D9A3] dark:border-white" />
            <div className="h-16 w-16 border-[3px] border-black bg-[#5B8BFF] dark:border-white" />
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <BrutalistButton
              onClick={handleStart}
              variant="primary"
              size="large"
              className="w-full max-w-xs">
              <span className="tracking-widest uppercase">Start Quiz</span>
            </BrutalistButton>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-6 h-3 bg-black dark:bg-white"></div>
      </div>
    </div>
  );
}
