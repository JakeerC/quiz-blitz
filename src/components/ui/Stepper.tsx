import { Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function Stepper({ value, onChange, min = 1, max = 50, step = 1 }: StepperProps) {
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
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrement}
        disabled={value <= min}
        className="w-12 h-12 border-[4px] border-black bg-white hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <Minus size={24} strokeWidth={3} />
      </motion.button>
      
      <div className="w-20 h-12 border-[4px] border-black bg-white flex items-center justify-center">
        <span className="tracking-wider">{value}</span>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleIncrement}
        disabled={value >= max}
        className="w-12 h-12 border-[4px] border-black bg-white hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <Plus size={24} strokeWidth={3} />
      </motion.button>
    </div>
  );
}
