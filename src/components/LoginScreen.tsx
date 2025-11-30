'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, LogIn } from 'lucide-react';
import { BrutalistButton } from './ui/BrutalistButton';
import { Logo } from './ui/Logo';
import { soundManager } from '../utils/sounds';
import { Button } from './ui/button';

type LoginScreenProps = {
  onLogin: (username: string) => void;
};

export function LoginScreen({ onLogin }: LoginScreenProps) {
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
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Logo />
            <h1 className="uppercase tracking-tight dark:text-white">Quiz App</h1>
          </div>
          <p className="uppercase tracking-wide text-sm text-gray-600 dark:text-gray-400">
            Test your knowledge. Track your progress.
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded border-[6px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
        >
          <div className="p-8">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`cursor-pointer flex-1 py-3 px-4 border-[3px] border-black dark:border-white uppercase tracking-wide transition-colors ${
                  isLogin ? 'bg-[#FFE500]' : 'bg-white dark:bg-[#2a2a2a] dark:text-white'
                }`}
              >
                Login
              </button>
             
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 border-[3px] border-black dark:border-white uppercase tracking-wide transition-colors ${
                  !isLogin ? 'bg-[#FFE500]' : 'bg-white dark:bg-[#2a2a2a] dark:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div>
                <label className="block uppercase tracking-wide text-sm mb-2 dark:text-white">
                  Username
                </label>
                <div className="relative">
                  <User 
                    className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-white" 
                    size={20} 
                    strokeWidth={3} 
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-[4px] border-black dark:border-white bg-white dark:bg-[#1a1a1a] dark:text-white uppercase tracking-wide focus:outline-none focus:border-[#FFE500]"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block uppercase tracking-wide text-sm mb-2 dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <Lock 
                    className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-white" 
                    size={20} 
                    strokeWidth={3} 
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-[4px] border-black dark:border-white bg-white dark:bg-[#1a1a1a] dark:text-white uppercase tracking-wide focus:outline-none focus:border-[#FFE500]"
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
                className="w-full flex items-center justify-center gap-3"
              >
                <LogIn size={24} strokeWidth={3} />
                <span className="uppercase tracking-widest">
                  {isLogin ? 'Login' : 'Sign Up'}
                </span>
              </BrutalistButton>
            </form>
          </div>

          {/* Demo Login */}
          <div className="p-6 border-t-[4px] border-black dark:border-white bg-gray-50 dark:bg-[#1a1a1a]">
            <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3 text-center">
              Or try it out:
            </p>
            <button
              onClick={handleDemoLogin}
              className="w-full py-3 px-4 border-[3px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] dark:text-white uppercase tracking-wide hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition-colors"
            >
              Continue as Demo User
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide mt-6">
          New-Brutalist Quiz Experience
        </p>
      </motion.div>
    </div>
  );
}
