import { motion } from 'motion/react';

type ToggleSelectorProps<T extends string> = {
  options: { value: T; label: string }[];
  selected: T;
  onChange: (value: T) => void;
};

export function ToggleSelector<T extends string>({ 
  options, 
  selected, 
  onChange 
}: ToggleSelectorProps<T>) {
  return (
    <div className="flex gap-3">
      {options.map((option) => {
        const isSelected = selected === option.value;
        
        return (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(option.value)}
            className={`
              px-6 py-3 border-[4px] border-black dark:border-white transition-colors
              ${isSelected 
                ? 'bg-black dark:bg-white text-white dark:text-black' 
                : 'bg-white dark:bg-[#2a2a2a] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#3a3a3a]'
              }
            `}
          >
            <span className="uppercase tracking-wider">{option.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}