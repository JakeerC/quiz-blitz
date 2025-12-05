import {Zap} from 'lucide-react';
import {cn} from './utils';

export function Logo({className}: {className?: string}) {
  return (
    <div
      className={cn(
        'bg-primary flex h-16 w-16 items-center justify-center rounded border-4 border-black',
        className
      )}>
      <Zap size={36} strokeWidth={3} fill="#000" />
    </div>
  );
}
