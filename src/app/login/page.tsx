'use client';

import {Login} from '@/app/login/component';
import {useApp} from '@/context/AppContext';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const {login} = useApp();
  const router = useRouter();

  const handleLogin = (username: string) => {
    login(username);
    router.push('/dashboard');
  };

  return <Login onLogin={handleLogin} />;
}
