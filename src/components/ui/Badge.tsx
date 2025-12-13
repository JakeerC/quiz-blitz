/*
Badges are small, visual indicators placed on or near other components (icons, avatars, buttons) to provide extra info like counts (new messages), statuses (new, high priority, 'New'), promotions (sale, free), or categories, drawing attention to important updates without cluttering the interface. They act as context-rich labels, often using numbers or short text, helping users quickly understand what needs attention on an item. 
Common Uses of Badges:
Notifications/Counts: Showing unread messages, items in a cart, or new updates (e.g., a red circle with '5' on a chat icon).
Status Indicators: Highlighting item states like "High Priority," "New," "Featured," or "Sold Out".
Promotions/Labels: Marking items with offers like "Sale," "BOGO," or "Limited Time".
Categorization: Displaying tags or categories for content (e.g., "VIP," "Beta").
Activity/Progress: Indicating ongoing actions or achievements (e.g., likes, comments). 

Key Characteristics:
Contextual: They are rarely standalone; they always relate to another UI element.
Small & Visual: They use numbers, icons, or short text (like 'New') to convey information quickly.
Versatile: They can be circles, pills, or have borders, adapting to different styles and needs. 
*/
import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/utils';

const badgeVariants = cva(
  cn(
    'inline-flex items-center justify-center rounded-full border px-2 py-0.5',
    'text-xs font-medium w-fit whitespace-nowrap shrink-0',
    '[&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20',
    'aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden'
  ),
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {asChild?: boolean}) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({variant}), className)}
      {...props}
    />
  );
}

export {Badge, badgeVariants};
