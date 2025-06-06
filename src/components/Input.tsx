import { cn, composeRef } from "lib/utils"
import RcInput, { InputProps, InputRef } from 'rc-input';
import React, { useRef } from "react"


const Input = React.forwardRef<InputRef, InputProps>(
  ({ className, type, ...props }, ref) => {
    const inputRef = useRef<InputRef>(null);
    return (
      <RcInput
        type={type}
        className={cn(
          "xemdi_inp",
          className
        )}
        ref={composeRef(ref, inputRef)}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
