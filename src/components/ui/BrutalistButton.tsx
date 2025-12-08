import {ReactNode} from 'react';

type BrutalistButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export function BrutalistButton({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button',
}: BrutalistButtonProps) {
  const baseStyles =
    'flex gap-2 items-center border-box transition-all cursor-pointer select-none rounded-md border-6 border-black shadow-md hover:shadow-lg active:shadow-sm';

  const variantStyles = {
    primary: 'bg-primary  text-primary-foreground',
    secondary: 'bg-secondary  text-secondary-foreground',
    danger: 'bg-danger  text-danger-foreground',
    success: 'bg-success  text-success-foreground',
  };

  const sizeStyles = {
    small: 'px-4 py-2',
    medium: 'px-6 py-4',
    large: 'px-8 py-6',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      disabled={disabled}>
      {children}
    </button>
  );
}
