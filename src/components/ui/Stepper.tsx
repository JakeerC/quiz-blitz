import {Minus, Plus} from 'lucide-react';

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function Stepper({
  value,
  onChange,
  min = 1,
  max = 50,
  step = 1,
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
    <div className="flex items-center gap-4">
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className="flex h-12 w-12 items-center justify-center border-4 border-black bg-white transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30">
        <Minus size={24} strokeWidth={3} />
      </button>

      <div className="flex h-12 w-20 items-center justify-center border-4 border-black bg-white">
        <span className="tracking-wider">{value}</span>
      </div>

      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="flex h-12 w-12 items-center justify-center border-4 border-black bg-white transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30">
        <Plus size={24} strokeWidth={3} />
      </button>
    </div>
  );
}
