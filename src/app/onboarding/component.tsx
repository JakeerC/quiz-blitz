import {Sparkles} from 'lucide-react';
import {BrutalistButton} from '@/components/ui/BrutalistButton';
import {soundManager} from '@/utils/sounds';

type OnboardingProps = {
  onStart: () => void;
};

export function Onboarding({onStart}: OnboardingProps) {
  const handleStart = () => {
    soundManager.playClick();
    onStart();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent p-6">
      <div className="w-full max-w-2xl">
        {/* Main Container */}
        <div className="card">
          {/* Icon */}
          <div className="bg-primary border-box mx-auto mb-8 flex h-20 w-20 items-center justify-center">
            <Sparkles size={40} strokeWidth={3} />
          </div>

          {/* App Name */}
          <h1 className="mb-4 text-center tracking-tight uppercase">
            QuizBrut
          </h1>

          {/* Tagline */}
          <p className="mx-auto mb-12 max-w-md text-center text-gray-700">
            Learn Fast. Fail Playfully.
          </p>

          {/* Decorative Blocks */}
          <div className="mb-12 flex justify-center gap-4">
            <div className="border-box h-16 w-16 bg-[#FF5757]" />
            <div className="border-box h-16 w-16 bg-[#00D9A3]" />
            <div className="border-box h-16 w-16 bg-[#5B8BFF]" />
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
        <div className="mt-6 h-3 bg-black"></div>
      </div>
    </div>
  );
}
