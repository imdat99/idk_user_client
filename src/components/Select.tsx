import { cn } from 'lib/utils';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

// Define a safe layout effect for SSR
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options?: SelectOption[];
  placeholder?: string;
  onChange?: (option: SelectOption | null) => void;
  autocomplete?: boolean;
  scrollHeight?: string;
}

const Select = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      options = [],
      placeholder,
      onChange,
      autocomplete = false,
      scrollHeight,
    },
    ref,
  ) => {
    const { t } = useTranslation('common');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isAbove, setIsAbove] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);

    // Filter options based on search value
    const filteredOptions = useMemo(() => {
      return searchValue.trim() === ''
        ? options
        : options.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase()),
          );
    }, [options, searchValue]);

    // Helper function to recalculate dropdown position
    const recalcPosition = useCallback(() => {
      if (
        buttonRef.current &&
        portalRef.current &&
        typeof window !== 'undefined'
      ) {
        // Temporarily show dropdown to measure actual height
        portalRef.current.style.visibility = 'hidden';
        portalRef.current.style.display = 'block';
        const dropdownHeight = portalRef.current.offsetHeight;
        portalRef.current.style.visibility = '';
        portalRef.current.style.display = '';

        const rect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const DROPDOWN_OFFSET = 5; // Define a consistent offset for spacing

        const canPlaceAbove = rect.top > dropdownHeight + DROPDOWN_OFFSET;
        const notEnoughSpaceBelow = (viewportHeight - rect.bottom) < dropdownHeight + DROPDOWN_OFFSET;
        
        const shouldDisplayAbove = canPlaceAbove && notEnoughSpaceBelow;
        setIsAbove(shouldDisplayAbove);

        let calculatedTop;
        if (shouldDisplayAbove) {
          calculatedTop = rect.top - dropdownHeight - DROPDOWN_OFFSET;
        } else {
          calculatedTop = rect.bottom + DROPDOWN_OFFSET;
          // If placing below makes it go off-screen, and it couldn't be placed above initially,
          // attempt to place above if possible, or stick to viewport bottom.
          if (calculatedTop + dropdownHeight > viewportHeight) {
            if (canPlaceAbove) { // If there was actually space above
                 calculatedTop = rect.top - dropdownHeight - DROPDOWN_OFFSET;
                 setIsAbove(true); // Update state
            } else {
                 // Stick to bottom of viewport if no other choice, ensuring a small gap
                 calculatedTop = Math.max(DROPDOWN_OFFSET, viewportHeight - dropdownHeight - DROPDOWN_OFFSET);
            }
          }
        }
        
        // Final check to ensure it doesn't go above the viewport top
        if (calculatedTop < 0) {
            calculatedTop = DROPDOWN_OFFSET; // Ensure a small gap from the top
        }

        setPosition({
          top: calculatedTop,
          left: rect.left, 
          width: rect.width,
        });
      }
    }, [])

    // Update position of dropdown when it opens or search value changes
    useIsomorphicLayoutEffect(() => {
      if (isOpen) {
        recalcPosition();

        // Focus the input when autocomplete is enabled
        if (autocomplete && inputRef.current) {
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 10);
        }

        // Reset highlighted index when opening
        setHighlightedIndex(-1);
      }
    }, [isOpen, autocomplete, searchValue, filteredOptions.length]); // Added filteredOptions.length as recalc might be needed if list presence changes

    // Handle body scroll and reset search on open/close
    useEffect(() => {
      if (isOpen) {
        // document.body.classList.add('overflow-hidden');
      } else {
        // document.body.classList.remove('overflow-hidden');
        setSearchValue(''); // Reset search value when dropdown is closed
      }

      // Cleanup effect
      return () => {
        // document.body.classList.remove('overflow-hidden');
      };
    }, [isOpen]);

    // Recalculate position on window resize when dropdown is open
    useEffect(() => {
      if (!isOpen || typeof window === 'undefined') return;

      const handleResize = () => {
        recalcPosition();
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [isOpen]); // Dependency on isOpen ensures listener is added/removed appropriately

    // Recalculate position on window scroll when dropdown is open
    useEffect(() => {
      if (!isOpen || typeof window === 'undefined') return;

      const handleScroll = () => {
        recalcPosition();
      };
      window.onscroll = handleScroll;
      return () => {
        window.onscroll = null; // Cleanup scroll event
      };
    }, [isOpen]);

    // Handle click outside to close dropdown
    useEffect(() => {
      if (typeof document === 'undefined') return; // SSR check

      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node) &&
          !portalRef.current?.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen) return;

        switch (event.key) {
          case 'Escape':
            setIsOpen(false);
            break;
          case 'ArrowDown':
            event.preventDefault();
            setHighlightedIndex((prev) => {
              const nextIndex = prev < filteredOptions.length - 1 ? prev + 1 : prev;
              if (listRef.current && nextIndex !== prev) {
                const items = listRef.current.querySelectorAll('li');
                if (items[nextIndex]) {
                  items[nextIndex].scrollIntoView({ block: 'nearest' });
                }
              }
              return nextIndex;
            });
            break;
          case 'ArrowUp':
            event.preventDefault();
            setHighlightedIndex((prev) => {
              const nextIndex = prev > 0 ? prev - 1 : 0;
              if (listRef.current && nextIndex !== prev) {
                const items = listRef.current.querySelectorAll('li');
                if (items[nextIndex]) {
                  items[nextIndex].scrollIntoView({ block: 'nearest' });
                }
              }
              return nextIndex;
            });
            break;
          case 'Enter':
            if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
              handleOptionClick(filteredOptions[highlightedIndex]);
            }
            break;
          default:
            break;
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, highlightedIndex, filteredOptions]);

    const handleOptionClick = (option: SelectOption) => {
      setSelectedOption(option);
      setIsOpen(false);
      if (onChange) {
        onChange(option);
      }
    };

    const handleClearSelection = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      e.stopPropagation();
      setSelectedOption(null);
      if (onChange) {
        onChange(null);
      }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      setHighlightedIndex(-1);
    };

    return (
      <div
        className="relative w-full"
        ref={(node) => {
          selectRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
      >
        {/* Select button with shadcn/ui styling */}
        <div
          role="button"
          tabIndex={0}
          ref={buttonRef}
          className="flex h-10 items-center justify-between w-full px-3 py-2 text-sm text-left bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={cn("block truncate", selectedOption ? 'font-medium text-gray-900' : 'text-gray-500')}>
            {selectedOption ? selectedOption.label : placeholder || t('select.placeholder')}
          </span>
          <div className="flex items-center">
            {selectedOption && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="mr-1 p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-501"
                aria-label={t('select.clearSelection')}
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <ChevronDown
              className={cn("w-4 h-4 text-gray-500 transition-transform duration-200", isOpen && 'transform rotate-180')}
            />
          </div>
        </div>

        {/* Dropdown menu */}
        {isOpen && typeof document !== 'undefined' && document.body
          ? createPortal(
              <div
                ref={portalRef}
                className={cn("fixed z-50 overflow-hidden bg-white border border-gray-200 rounded-md shadow-md flex", isAbove ? "flex-col-reverse" : "flex-col")}
                style={{
                  top: `${position.top}px`, // Use calculated position directly
                  left: `${position.left}px`,
                  width: `${position.width}px`,
                }}
                role="listbox"
              >
                {autocomplete && (
                  <div className={cn("p-2 border-gray-200", isAbove ? "border-t" : "border-b")}>
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        ref={inputRef}
                        type="text"
                        className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('select.searchPlaceholder')}
                        value={searchValue}
                        onChange={handleSearchChange}
                        onClick={(e) => e.stopPropagation()}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                )}
                <ul
                  className={cn(
                    'py-1 overflow-auto',
                    scrollHeight ? scrollHeight : 'max-h-60'
                  )}
                  ref={listRef}
                >
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, index) => (
                      <li
                        key={option.value}
                        className={cn("relative px-2 py-1.5 text-sm cursor-default select-none", 
                        selectedOption?.value === option.value ? '!bg-blue-100' : '',
                        highlightedIndex === index ? 'bg-blue-100' : '',
                        "hover:bg-blue-50")}
                        onClick={() => handleOptionClick(option)}
                        role="option"
                        aria-selected={selectedOption?.value === option.value}
                        onMouseEnter={() => setHighlightedIndex(index)}
                      >
                        <div className="flex items-center">
                          {selectedOption?.value === option.value && (
                            <span className="absolute left-2 flex items-center justify-center">
                              <Check className="h-4 w-4 text-gray-900" />
                            </span>
                          )}
                          <span
                            className={`block truncate ${
                              selectedOption?.value === option.value
                                ? 'font-medium pl-6'
                                : 'pl-2'
                            }`}
                          >
                            {option.label}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-2 py-2 text-sm text-gray-500">{t('select.noOptions')}</li>
                  )}
                </ul>
              </div>,
              document.body,
            )
          : null}
      </div>
    );
  },
);
Select.displayName = 'Select';
export default Select;
// Demo component to showcase the CustomSelect
