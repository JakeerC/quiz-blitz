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
    primary: 'bg-primary hover:bg-[#FFD700] active:bg-[#FFC700]',
    secondary: 'bg-white hover:bg-gray-50 active:bg-gray-100',
    danger: 'bg-[#FF5757] hover:bg-[#FF4444] active:bg-[#FF3333]',
    success: 'bg-[#00D9A3] hover:bg-[#00C794] active:bg-[#00B585]',
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
