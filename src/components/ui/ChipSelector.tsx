import {cva} from 'class-variance-authority';
import {cn} from '@/utils';

const chipVariants = cva(
  'border-box px-5 py-2.5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground hover:bg-muted',
        selected: 'bg-primary text-primary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type ChipSelectorProps = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  className?: string;
};

export function ChipSelector({
  options,
  selected,
  onChange,
  className,
}: ChipSelectorProps) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {options.map((option) => {
        const isSelected = selected === option;

        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={cn(
              chipVariants({variant: isSelected ? 'selected' : 'default'})
            )}>
            <span className="tracking-wide uppercase">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
