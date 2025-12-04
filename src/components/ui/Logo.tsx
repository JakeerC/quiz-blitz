import {Zap} from 'lucide-react';
import {cn} from './utils';

export function Logo({className}: {className?: string}) {
  return (
    <div
      className={cn(
        'flex h-16 w-16 items-center justify-center rounded border-[4px] border-black bg-[#FFE500]',
        className
      )}>
      <Zap size={36} strokeWidth={3} fill="#000" />
    </div>
  );
}
