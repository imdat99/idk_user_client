import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from 'lib/utils';
import { LoaderCircle } from 'lucide-react';
import * as React from 'react';

const buttonVariants = cva(
  ':uno: inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          ':uno: bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring-primary/20 focus-visible:ring-offset-1 ease-in-out duration-200 transition-width',
        destructive:
          ':uno: bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          ':uno: border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          ':uno: bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: ':uno: hover:bg-accent hover:text-accent-foreground',
        link: ':uno: text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), 'relative')}
        ref={ref}
        {...{ disabled: loading }}
        {...props}
      >
        {loading !== undefined ? (
          <span
            className={cn(
              'transition-opacity',
              loading ? 'opacity-0' : 'opacity-100',
            )}
          >
            {children}
          </span>
        ) : (
          children
        )}
        {loading && (
          <LoaderCircle className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-spin" />
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
