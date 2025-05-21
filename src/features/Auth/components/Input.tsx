import { Input } from "components/Input"
import { cn } from "lib/utils"
import React from "react"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix" | "suffix"> {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  errorText?: string
  error?: boolean
}
const AuthInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, startAdornment, endAdornment, error, errorText, ...props }, ref) => {
    return (
      <div className="relative">
              <Input
                className={cn("indent-6", className, error && "border-red-500 ring-1 ring-red-400 focus-visible:(shadow-red-500/10 ring-red-500)")}
                {...props}
                ref={ref}
              />
              {startAdornment && (
                <div
                  tabIndex={-1}
                  className={cn(
                    "absolute bg-transparent border-0 shadow-none hover:bg-transparent left-3 gap-2 top-0 h-9 flex items-center",
                    className
                  )}
                >
                  {startAdornment}
                </div>
              )}
                {endAdornment && (
                    <div
                    tabIndex={-1}
                    className={cn(
                        "absolute bg-transparent border-0 shadow-none hover:bg-transparent right-1 gap-2 top-0 h-9 flex items-center",
                        className
                    )}
                    >
                    {endAdornment}
                    </div>
                )}
                {error && (
                    <div className="absolute text-red-500 text-sm top-10 left-0">
                        {errorText}
                    </div>
                )}
            </div>
    )
  }
)
AuthInput.displayName = "AuthInput"

export { AuthInput }
