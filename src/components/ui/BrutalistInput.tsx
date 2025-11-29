import { motion } from 'motion/react';

type BrutalistInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function BrutalistInput({ value, onChange, placeholder, className = '' }: BrutalistInputProps) {
  return (
    <motion.input
      whileFocus={{ scale: 1.02, y: -2 }}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`
        w-full px-6 py-4 border-[4px] border-black bg-white
        placeholder:text-gray-400 placeholder:uppercase
        focus:outline-none focus:bg-[#FFFEF9]
        transition-all uppercase tracking-wide
        ${className}
      `}
    />
  );
}
