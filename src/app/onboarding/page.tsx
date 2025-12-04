'use client';

import { OnboardingScreen } from '@/components/OnboardingScreen';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/setup');
  };

  return <OnboardingScreen onStart={handleStart} />;
}
