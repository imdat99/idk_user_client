import * as React from "react";
import { cn } from "lib/utils";

// Define types for variants and sizes directly
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const getButtonClassName = ({ variant, size, className }: { variant?: ButtonVariant | null; size?: ButtonSize | null; className?: string }): string => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

  const variantClasses: Record<ButtonVariant, string> = {
    default: "bg-blue-500 text-white hover:bg-blue-600", // Google Blue
    destructive: "bg-red-500 text-white hover:bg-red-600", // Google Red
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200", // Google Grey
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  const currentVariant = variant || "default";
  const currentSize = size || "default";

  return cn(
    baseClasses,
    variantClasses[currentVariant],
    sizeClasses[currentSize],
    className
  );
};


// Props specific to our Button's styling and functionality
interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const defaultElement = 'button';

// Helper types for polymorphic components
type AsProp<C extends React.ElementType> = {
  component?: C;
};

// Props to omit from the underlying component's props to avoid conflicts
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// Base props for the polymorphic component (excluding ref)
// P represents the ButtonOwnProps
type PolymorphicComponentProps<C extends React.ElementType, P = {}> =
  React.PropsWithChildren<P & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, P>>;

// Props for the polymorphic component including the ref
// P represents the ButtonOwnProps
export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  P = {}
> = PolymorphicComponentProps<C, P> & {
  ref?: React.ComponentPropsWithRef<C>["ref"];
};

// Interface for the polymorphic Button component.
// It implicitly uses ButtonOwnProps for its specific properties.
interface IButton { // Removed <P = {}> generic
  <C extends React.ElementType = typeof defaultElement>(
    // P in PolymorphicComponentPropsWithRef is now directly ButtonOwnProps
    props: PolymorphicComponentPropsWithRef<C, ButtonOwnProps>
  ): React.ReactElement | null;
  displayName?: string;
}

// The actual Button component implementation
// The type annotation for Button now uses IButton without generic arguments.
export const Button: IButton = React.forwardRef(
  // Inner render function's props and ref types
  // C is the component to render. ButtonOwnProps is implicitly used for P.
  <C extends React.ElementType = typeof defaultElement>(
    // P in PolymorphicComponentProps is ButtonOwnProps
    props: PolymorphicComponentProps<C, ButtonOwnProps>,
    ref: React.ComponentPropsWithRef<C>["ref"] // Ref for the underlying element
  ) => {
    const {
      component: ComponentProp, // Extract the 'component' prop
      variant,
      size,
      loading = false,
      children,
      className,
      ...rest // These are the props for the underlying element (e.g., href, type, onClick)
    } = props;

    const ComponentToRender = ComponentProp || defaultElement;

    const isDisabled = loading || (rest as { disabled?: boolean }).disabled;

    return (
      <ComponentToRender
        className={getButtonClassName({ variant, size, className })}
        ref={ref}
        disabled={isDisabled}
        {...rest}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </ComponentToRender>
    );
  }
) as IButton; // Cast also uses IButton without generic arguments

Button.displayName = "Button";

// The exported ButtonProps type for consumers.
// C is the component to render, P is ButtonOwnProps
export type ButtonProps<C extends React.ElementType = typeof defaultElement> =
  PolymorphicComponentPropsWithRef<C, ButtonOwnProps>;