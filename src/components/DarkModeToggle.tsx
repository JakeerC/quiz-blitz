'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type DarkModeToggleProps = {
  className?: string;
};

export function DarkModeToggle({ className = '' }: DarkModeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial dark mode preference
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        w-14 h-14 border-[4px] border-black dark:border-white
        bg-white dark:bg-black
        flex items-center justify-center
        transition-colors
        ${className}
      `}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun size={28} strokeWidth={3} className="text-yellow-400" />
      ) : (
        <Moon size={28} strokeWidth={3} className="text-black" />
      )}
    </button>
  );
}
