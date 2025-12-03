type ChipSelectorProps = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

export function ChipSelector({options, selected, onChange}: ChipSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const isSelected = selected === option;

        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`border-[3px] border-black px-5 py-2.5 transition-all dark:border-white ${
              isSelected
                ? 'bg-[#FFE500] text-black'
                : 'bg-white text-black hover:bg-gray-50 dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#3a3a3a]'
            } `}>
            <span className="tracking-wide uppercase">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
