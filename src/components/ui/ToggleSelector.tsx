import {cva} from 'class-variance-authority';
import {cn} from '@/utils';

const toggleVariants = cva(
  'border-box px-6 py-3 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-white text-black hover:bg-gray-100',
        selected: 'bg-black text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type ToggleSelectorProps<T extends string> = {
  options: {value: T; label: string}[];
  selected: T;
  onChange: (value: T) => void;
  className?: string; // Add className prop to the container
};

export function ToggleSelector<T extends string>({
  options,
  selected,
  onChange,
  className,
}: ToggleSelectorProps<T>) {
  return (
    <div className={cn('flex gap-3', className)}>
      {options.map((option) => {
        const isSelected = selected === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              toggleVariants({variant: isSelected ? 'selected' : 'default'})
            )}>
            <span className="tracking-wider uppercase">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
