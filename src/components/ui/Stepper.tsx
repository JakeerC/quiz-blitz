import {Minus, Plus} from 'lucide-react';
import {cn} from '@/utils';

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

export function Stepper({
  value,
  onChange,
  min = 1,
  max = 50,
  step = 1,
  className,
}: StepperProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className="border-box flex h-12 w-12 items-center justify-center bg-white transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30">
        <Minus size={24} strokeWidth={3} />
      </button>

      <div className="border-box flex h-12 w-20 items-center justify-center bg-white">
        <span className="tracking-wider">{value}</span>
      </div>

      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="border-box flex h-12 w-12 items-center justify-center bg-white transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30">
        <Plus size={24} strokeWidth={3} />
      </button>
    </div>
  );
}
