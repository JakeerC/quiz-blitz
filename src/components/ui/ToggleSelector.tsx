type ToggleSelectorProps<T extends string> = {
  options: {value: T; label: string}[];
  selected: T;
  onChange: (value: T) => void;
};

export function ToggleSelector<T extends string>({
  options,
  selected,
  onChange,
}: ToggleSelectorProps<T>) {
  return (
    <div className="flex gap-3">
      {options.map((option) => {
        const isSelected = selected === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`border-[4px] border-black px-6 py-3 transition-colors dark:border-white ${
              isSelected
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-white text-black hover:bg-gray-100 dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#3a3a3a]'
            } `}>
            <span className="tracking-wider uppercase">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
