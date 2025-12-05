'use client';

import {Onboarding} from '@/app/onboarding/component';
import {useRouter} from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/setup');
  };

  return <Onboarding onStart={handleStart} />;
}
