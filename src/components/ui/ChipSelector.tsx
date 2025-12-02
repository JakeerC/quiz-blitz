type ChipSelectorProps = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

export function ChipSelector({ options, selected, onChange }: ChipSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const isSelected = selected === option;
        
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`
              px-5 py-2.5 border-[3px] border-black dark:border-white transition-all
              ${isSelected 
                ? 'bg-[#FFE500] text-black' 
                : 'bg-white dark:bg-[#2a2a2a] text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#3a3a3a]'
              }
            `}
          >
            <span className="uppercase tracking-wide">{option}</span>
          </button>
        );
      })}
    </div>
  );
}