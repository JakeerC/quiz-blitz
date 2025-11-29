import { motion } from 'motion/react';

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function Slider({ value, onChange, min = 1, max = 50, step = 1 }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="relative h-6 border-[4px] border-black bg-white">
        {/* Track Fill */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#FFE500]"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Slider Handle */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-black border-[4px] border-white cursor-grab active:cursor-grabbing"
          style={{ left: `calc(${percentage}% - 16px)` }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
        
        {/* Input Range */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      
      {/* Min/Max Labels */}
      <div className="flex justify-between mt-2">
        <span className="text-sm uppercase tracking-wide text-gray-600">{min}</span>
        <span className="text-sm uppercase tracking-wide text-gray-600">{max}</span>
      </div>
    </div>
  );
}
