'use client';

import {useState} from 'react';
import {User, Lock, LogIn} from 'lucide-react';
import {BrutalistButton} from './ui/BrutalistButton';
import {Logo} from './ui/Logo';
import {soundManager} from '../utils/sounds';

type LoginScreenProps = {
  onLogin: (username: string) => void;
};

export function LoginScreen({onLogin}: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      soundManager.playSuccess();
      onLogin(username.trim());
    }
  };

  const handleDemoLogin = () => {
    soundManager.playClick();
    onLogin('Demo User');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <Logo />
            <h1 className="tracking-tight uppercase dark:text-white">
              Quiz App
            </h1>
          </div>
          <p className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
            Test your knowledge. Track your progress.
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded border-[6px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-[#2a2a2a] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          <div className="p-8">
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 cursor-pointer border-[3px] border-black px-4 py-3 tracking-wide uppercase transition-colors dark:border-white ${
                  isLogin
                    ? 'bg-[#FFE500]'
                    : 'bg-white dark:bg-[#2a2a2a] dark:text-white'
                }`}>
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 border-[3px] border-black px-4 py-3 tracking-wide uppercase transition-colors dark:border-white ${
                  !isLogin
                    ? 'bg-[#FFE500]'
                    : 'bg-white dark:bg-[#2a2a2a] dark:text-white'
                }`}>
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div>
                <label className="mb-2 block text-sm tracking-wide uppercase dark:text-white">
                  Username
                </label>
                <div className="relative">
                  <User
                    className="absolute top-1/2 left-4 -translate-y-1/2 dark:text-white"
                    size={20}
                    strokeWidth={3}
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border-[4px] border-black bg-white py-4 pr-4 pl-12 tracking-wide uppercase focus:border-[#FFE500] focus:outline-none dark:border-white dark:bg-[#1a1a1a] dark:text-white"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="mb-2 block text-sm tracking-wide uppercase dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute top-1/2 left-4 -translate-y-1/2 dark:text-white"
                    size={20}
                    strokeWidth={3}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-[4px] border-black bg-white py-4 pr-4 pl-12 tracking-wide uppercase focus:border-[#FFE500] focus:outline-none dark:border-white dark:bg-[#1a1a1a] dark:text-white"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <BrutalistButton
                type="submit"
                variant="primary"
                size="large"
                className="flex w-full items-center justify-center gap-3">
                <LogIn size={24} strokeWidth={3} />
                <span className="tracking-widest uppercase">
                  {isLogin ? 'Login' : 'Sign Up'}
                </span>
              </BrutalistButton>
            </form>
          </div>

          {/* Demo Login */}
          <div className="border-t-[4px] border-black bg-gray-50 p-6 dark:border-white dark:bg-[#1a1a1a]">
            <p className="mb-3 text-center text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
              Or try it out:
            </p>
            <button
              onClick={handleDemoLogin}
              className="w-full border-[3px] border-black bg-white px-4 py-3 tracking-wide uppercase transition-colors hover:bg-gray-100 dark:border-white dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#3a3a3a]">
              Continue as Demo User
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
          New-Brutalist Quiz Experience
        </p>
      </div>
    </div>
  );
}
