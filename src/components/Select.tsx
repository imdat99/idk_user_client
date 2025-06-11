import React from 'react';
import type { BaseSelectRef, SelectProps as RcSelectProps } from 'rc-select';
import RcSelect, { OptGroup, Option } from 'rc-select';
import type { OptionProps } from 'rc-select/lib/Option';
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select';
import { cn } from 'lib/utils';
import { ChevronDown, X, Loader2 } from 'lucide-react';
import 'rc-select/assets/index.css';

// Type definitions
type RawValue = string | number;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue =
  | RawValue
  | RawValue[]
  | LabeledValue
  | LabeledValue[]
  | undefined;

export type {
  BaseOptionType,
  DefaultOptionType,
  OptionProps,
  BaseSelectRef as RefSelectProps,
};

export interface SelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<RcSelectProps<ValueType, OptionType>, 'mode'> {
  mode?: 'multiple' | 'tags';
  size?: 'large' | 'middle' | 'small';
  variant?: 'outlined' | 'filled' | 'borderless';
  status?: 'error' | 'warning';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  popupClassName?: string;
  popupMatchSelectWidth?: boolean | number;
}

const Select = React.forwardRef(
  <
    ValueType = any,
    OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
  >(
    props: React.PropsWithChildren<SelectProps<ValueType, OptionType>>,
    ref: React.Ref<BaseSelectRef>,
  ) => {
    const {
      mode,
      size = 'middle',
      variant = 'outlined',
      status,
      disabled,
      loading,
      className,
      popupClassName,
      popupMatchSelectWidth = true,
      placeholder,
      children,
      ...restProps
    } = props;

    // Determine if select is multiple or tags mode
    const isMultiple = mode === 'multiple' || mode === 'tags';

    // Custom arrow icon
    const suffixIcon = loading ? (
      <Loader2 className="h-4 w-4 opacity-50 animate-spin" />
    ) : (
      <ChevronDown className="h-4 w-4 opacity-50" />
    );

    // Custom remove icon for multiple/tags mode
    const removeIcon = (
      <X className="h-3.5 w-3.5 opacity-60 hover:opacity-100" />
    );

    // Generate class names based on props
    const selectClassName = cn(
      // Base styles
      'w-full transition-colors relative',
      // Size variants
      {
        'h-8 text-xs': size === 'small',
        'h-9 text-sm': size === 'middle',
        'h-10 text-base': size === 'large',
      },
      // Variant styles
      {
        'border rounded-md focus-within:ring-1 focus-within:ring-primary focus-within:border-primary':
          variant === 'outlined',
        'bg-gray-100 border-0 focus-within:bg-white focus-within:ring-1 focus-within:ring-primary':
          variant === 'filled',
        'border-0 border-b border-gray-200 rounded-none focus-within:border-b-primary':
          variant === 'borderless',
      },
      // Status styles
      {
        'border-red-500 focus-within:ring-red-500 focus-within:border-red-500':
          status === 'error',
        'border-yellow-500 focus-within:ring-yellow-500 focus-within:border-yellow-500':
          status === 'warning',
      },
      // Disabled styles
      {
        'opacity-50 cursor-not-allowed bg-gray-50': disabled,
      },
      className,
    );

    // Popup/dropdown class names
    const dropdownClassName = cn(
      'rounded-md shadow-md border border-gray-200 bg-white p-1',
      popupClassName,
    );

    return (
      <RcSelect
        ref={ref}
        placeholder={placeholder}
        mode={mode}
        disabled={disabled}
        suffixIcon={suffixIcon}
        removeIcon={removeIcon}
        className={selectClassName}
        dropdownClassName={dropdownClassName}
        dropdownMatchSelectWidth={popupMatchSelectWidth}
        notFoundContent={
          <div className="p-2 text-gray-500 text-sm">No options found</div>
        }
        {...restProps}
      >
        {children}
      </RcSelect>
    );
  },
);

// Add static properties for backwards compatibility
{
  /* Select.Option = Option; */
}
{
  /* Select.OptGroup = OptGroup; */
}
Select.displayName = 'Select';

export default Select;
