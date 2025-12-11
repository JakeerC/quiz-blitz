'use client';

import * as React from 'react';
import {Info, CircleAlert} from 'lucide-react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/utils';
import {Button} from '@/components/ui/Button';
// import {Input} from '@/components/ui/Input';
// import {Textarea} from '@/components/ui/Textarea';

interface InputGroupProps extends React.ComponentProps<'div'> {
  label?: string;
  helpText?: string;
  error?: string;
}

function InputGroup({
  className,
  label,
  helpText,
  error,
  children,
  ...props
}: InputGroupProps) {
  return (
    <div className="w-full">
      <label className="text-md mb-2 block tracking-wide focus-within:font-bold">
        {label}

        <div
          data-slot="input-group"
          role="group"
          className={cn(
            'interactive-input border-box group/input-group relative mt-2 flex w-full items-center overflow-hidden transition-all',
            // Variants based on alignment (simplify or adapt as needed, currently keeping basic logic but removing fixed heights if possible)
            'has-[>[data-align=inline-start]]:[&>input]:pl-2',
            'has-[>[data-align=inline-end]]:[&>input]:pr-2',

            // Error state.
            'has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40',
            error &&
              'ring-destructive/20 border-destructive dark:ring-destructive/40',

            className
          )}
          {...props}>
          {children}
        </div>
      </label>
      {error ? (
        <div className="text-destructive mt-1 flex items-center gap-2 text-xs">
          <CircleAlert className="size-3" />
          <span>{error}</span>
        </div>
      ) : helpText ? (
        <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
          <Info className="size-3" />
          <span>{helpText}</span>
        </div>
      ) : null}
    </div>
  );
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm  select-none tracking-wide [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        'inline-start':
          'order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]',
        'inline-end':
          'order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]',
        'block-start':
          'order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5',
        'block-end':
          'order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  }
);

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({align}), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) {
          return;
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva(
  'text-sm shadow-none flex gap-2 items-center',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        sm: 'h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5',
        'icon-xs':
          'size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  }
);

function InputGroupButton({
  className,
  type = 'button',
  variant = 'primary',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({size}), className)}
      {...props}
    />
  );
}

function InputGroupText({className, ...props}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function InputGroupInput({className, ...props}: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot="input-group-control"
      className={cn(
        'text-black',
        'placeholder:text-muted-foreground w-full min-w-0 flex-1 bg-transparent',
        'd px-6 py-4 tracking-wide outline-none',
        'isabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="input-group-control"
      className={cn(
        'text-black',
        'placeholder:text-muted-foreground w-full min-w-0 flex-1',
        'resize-none bg-transparent px-6 py-4 tracking-wide outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
