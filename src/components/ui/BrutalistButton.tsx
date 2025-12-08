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
    'border-box transition-all cursor-pointer select-none rounded';

  const variantStyles = {
    primary:
      'bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-foreground',
    secondary: 'bg-card text-card-foreground hover:bg-muted active:bg-muted/80',
    danger:
      'bg-destructive hover:bg-destructive-hover active:bg-destructive-active text-destructive-foreground',
    success:
      'bg-success hover:bg-success-hover active:bg-success-active text-white',
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
