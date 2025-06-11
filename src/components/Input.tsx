import { cn, composeRef } from 'lib/utils';
import RcInput from 'rc-input';
import type { InputProps, InputRef } from 'rc-input';
import React, { useRef } from 'react';

const Input = React.forwardRef<InputRef, InputProps>(
  ({ className, ...props }, ref) => {
    const inputRef = useRef<InputRef>(null);
    return (
      <RcInput
        className={cn('xemdi_inp', className)}
        ref={composeRef(ref, inputRef)}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
