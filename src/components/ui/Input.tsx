import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/utils';

const inputVariants = cva(
  'border-box bg-card placeholder:text-muted-foreground focus:bg-card w-full px-6 py-4 tracking-wide uppercase transition-all placeholder:uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export function Input({className, type, ...props}: InputProps) {
  return (
    <input type={type} className={cn(inputVariants(), className)} {...props} />
  );
}
