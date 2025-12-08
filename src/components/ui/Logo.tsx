import {Zap} from 'lucide-react';
import {cn} from '@/utils';

export function Logo({className}: {className?: string}) {
  return (
    <div
      className={cn(
        'border-box-center bg-primary-500 text-primary-foreground h-16 w-16',
        className
      )}>
      <Zap size={36} strokeWidth={3} fill="currentColor" />
    </div>
  );
}
