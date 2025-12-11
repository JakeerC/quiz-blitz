'use client';

import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {
  CheckCircle,
  TriangleAlert,
  CircleAlert,
  Info,
  X,
  type LucideIcon,
} from 'lucide-react';

import {cn} from '@/utils';
import {Button} from '@/components/ui/Button';

const bannerVariants = cva(
  'border-box mt-4 mb-4 relative w-full flex items-start gap-4 p-4 rounded-lg text-sm shadow-sm transition-all animate-in fade-in slide-in-from-top-1',
  {
    variants: {
      variant: {
        info: 'bg-info-100/70 text-info-950',
        success: 'bg-success-100/70 text-success-950',
        warning: 'bg-warning-100/70 text-warning-950',
        error: 'bg-error-100/70 text-error-950',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

interface BannerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  title?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  onDismiss?: () => void;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant,
      title,
      icon: IconComponent,
      action,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    let Icon = IconComponent;

    if (!Icon) {
      switch (variant) {
        case 'success':
          Icon = CheckCircle;
          break;
        case 'warning':
          Icon = TriangleAlert;
          break;
        case 'error':
          Icon = CircleAlert;
          break;
        default:
          Icon = Info;
          break;
      }
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(bannerVariants({variant}), className)}
        {...props}>
        <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />

        <div className="grid flex-1 gap-1.5">
          {title && <h5 className="font-semibold tracking-tight">{title}</h5>}
          <div className="leading-relaxed text-pretty opacity-90">
            {children}
          </div>
          {action && (
            <div className="mt-2 flex items-center gap-2">{action}</div>
          )}
        </div>

        {onDismiss && (
          <Button
            variant="secondary"
            size="small"
            onClick={onDismiss}
            className={cn(
              'h-auto shrink-0 border-transparent bg-transparent p-1 text-current shadow-none hover:bg-black/5 dark:hover:bg-white/10',
              // Adjust hover colors based on variant for better visibility
              variant === 'error' && 'hover:bg-error-200',
              variant === 'success' && 'hover:bg-success-200',
              variant === 'warning' && 'hover:bg-warning-200',
              variant === 'info' && 'hover:bg-info-200'
            )}
            aria-label="Dismiss">
            <X className="size-4" />
          </Button>
        )}
      </div>
    );
  }
);
Banner.displayName = 'Banner';

export {Banner, bannerVariants};
