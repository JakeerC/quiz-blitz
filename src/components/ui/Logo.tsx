import { Zap } from 'lucide-react';
import { cn } from './utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("rounded w-16 h-16 bg-[#FFE500] border-[4px] border-black dark:border-white flex items-center justify-center", className)}>
      <Zap size={36} strokeWidth={3} fill="#000" />
    </div>
  );
}
