import {cn} from '@/utils';
import {cva, type VariantProps} from 'class-variance-authority';

const inputVariants = cva(
  cn(
    'rounded-md  placeholder:text-muted-foreground ',
    'w-full px-6 py-4 tracking-wide transition-all'
  )
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export function Input({className, type, ...props}: InputProps) {
  return (
    <input
      type={type}
      className={cn(inputVariants(), 'interactive-input', className)}
      {...props}
    />
  );
}
