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
          <button
            key={option.value}
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
          </button>
        );
      })}
    </div>
  );
}