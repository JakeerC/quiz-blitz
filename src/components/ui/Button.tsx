import {ReactNode} from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/utils';

const buttonVariants = cva(
  'flex gap-2 items-center border-box transition-all cursor-pointer select-none rounded-md border-6 border shadow-md hover:shadow-lg active:shadow-sm',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-300 text-primary-900 hover:bg-primary-900 hover:text-primary-300',
        secondary:
          'bg-secondary-300 text-secondary-900 hover:bg-secondary-900 hover:text-secondary-300',
        danger: 'bg-danger text-danger-foreground',
        success: 'bg-success text-success-foreground',
      },
      size: {
        small: 'px-4 py-2',
        medium: 'px-6 py-4',
        large: 'px-8 py-6',
        full: 'w-full px-8 py-6 flex items-center justify-center text-center',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({
  children,
  variant,
  size,
  disabled,
  className,
  type = 'button',
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={cn(
        buttonVariants({variant, size}),
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
}
