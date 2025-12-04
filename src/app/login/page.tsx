'use client';

import { LoginScreen } from '@/components/LoginScreen';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();

  const handleLogin = (username: string) => {
    login(username);
    router.push('/dashboard');
  };

  return <LoginScreen onLogin={handleLogin} />;
}
