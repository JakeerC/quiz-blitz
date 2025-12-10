import {ReactNode} from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/utils';

const buttonVariants = cva(
  cn(
    'flex gap-3 items-center justify-center cursor-pointer select-none font-medium',
    'rounded-md',
    'no-underline',
    'interactive-action'
  ),
  {
    variants: {
      variant: {
        primary: 'bg-primary text-gray-950',
        secondary: 'bg-secondary text-secondary-950',
        danger: 'bg-danger text-danger-950',
        success: 'bg-success text-success-950',
        disable: 'bg-gray-400 text-gray-950',
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
