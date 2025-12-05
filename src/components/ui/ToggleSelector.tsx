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
            className={`border-box px-6 py-3 transition-colors ${
              isSelected
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-100'
            } `}>
            <span className="tracking-wider uppercase">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
