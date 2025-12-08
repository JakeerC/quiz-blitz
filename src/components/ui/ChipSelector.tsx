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
            className={`border-box px-5 py-2.5 transition-all ${
              isSelected
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-card-foreground hover:bg-muted'
            } `}>
            <span className="tracking-wide uppercase">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
