import { cn } from 'lib/utils';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

// Define a safe layout effect for SSR
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options?: SelectOption[];
  placeholder?: string;
  onChange?: (option: SelectOption | null) => void;
  autocomplete?: boolean;
  scrollHeight?: string;
}

const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      options = [],
      placeholder = 'Select an option',
      onChange,
      autocomplete = false,
      scrollHeight,
    },
    ref,
  ) => {
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
    const filteredOptions =
      searchValue.trim() === ''
        ? options
        : options.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase()),
          );

    // Helper function to recalculate dropdown position
    function recalcPosition() {
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
        const spaceBelow = viewportHeight - rect.bottom;
        const isAboveDropdown = spaceBelow < dropdownHeight;
        setIsAbove(isAboveDropdown);
        const topPosition = isAboveDropdown
          ? rect.top + window.scrollY - dropdownHeight - 10
          : rect.bottom + window.scrollY;

        setPosition({
          top: topPosition,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }

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
    }, [isOpen, autocomplete, searchValue]);

    // Reset search when closing dropdown
    useEffect(() => {
      if (!isOpen) {
        setSearchValue('');
        document.body.classList.remove('overflow-hidden');
      } else {
        document.body.classList.add('overflow-hidden');
      }
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
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev,
            );
            // Scroll item into view if needed
            if (listRef.current && highlightedIndex >= 0) {
              const items = listRef.current.querySelectorAll('li');
              if (items[highlightedIndex + 1]) {
                items[highlightedIndex + 1].scrollIntoView({ block: 'nearest' });
              }
            }
            break;
          case 'ArrowUp':
            event.preventDefault();
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
            // Scroll item into view if needed
            if (listRef.current && highlightedIndex > 0) {
              const items = listRef.current.querySelectorAll('li');
              if (items[highlightedIndex - 1]) {
                items[highlightedIndex - 1].scrollIntoView({ block: 'nearest' });
              }
            }
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
          className="flex h-10 items-center justify-between w-full px-3 py-2 text-sm text-left bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={cn("block truncate", selectedOption ? 'font-medium text-gray-900' : 'text-gray-500')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="flex items-center">
            {selectedOption && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="mr-1 p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-501"
                aria-label="Clear selection"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
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
                  top: `${position.top + 5}px`,
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
                        placeholder="Search options..."
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
                    <li className="px-2 py-2 text-sm text-gray-500">No options found</li>
                  )}
                </ul>
                {/* {isAbove && autocomplete && (
                  <div className="p-2 border-t border-gray-200">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        ref={inputRef}
                        type="text"
                        className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Search options..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        onClick={(e) => e.stopPropagation()}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                )} */}
              </div>,
              document.body,
            )
          : null}
      </div>
    );
  },
);

// Demo component to showcase the CustomSelect
export default function SelectDemo() {
  const [selectedValue, setSelectedValue] = useState<SelectOption | null>(null);
  const [selectedAutoValue, setSelectedAutoValue] = useState<SelectOption | null>(
    null,
  );

  const options: SelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'ember', label: 'Ember' },
    { value: 'backbone', label: 'Backbone.js' },
    { value: 'preact', label: 'Preact' },
    { value: 'jquery', label: 'jQuery' },
    { value: 'solid', label: 'Solid.js' },
    { value: 'lit', label: 'Lit' },
    { value: 'polymer', label: 'Polymer' },
    { value: 'alpine', label: 'Alpine.js' },
    { value: 'mithril', label: 'Mithril' },
    { value: 'aurelia', label: 'Aurelia' },
    { value: 'meteor', label: 'Meteor' },
  ];

  const handleChange = (option: SelectOption | null) => {
    setSelectedValue(option);
  };

  const handleAutoChange = (option: SelectOption | null) => {
    setSelectedAutoValue(option);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-gray-50 rounded-lg min-h-screen">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Custom Select Component</h2>
        <p className="text-gray-500 text-sm">A select component with shadcn/ui styling</p>
      </div>

      <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Standard Select
          </label>
          <CustomSelect
            options={options}
            placeholder="Select a framework"
            onChange={handleChange}
          />
          {selectedValue && (
            <div className="mt-2 p-2 bg-gray-100 border border-gray-200 text-gray-800 rounded-md text-sm">
              Selected: <span className="font-medium">{selectedValue.label}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Autocomplete Select
          </label>
          
          {selectedAutoValue && (
            <div className="mt-2 p-2 bg-gray-100 border border-gray-200 text-gray-800 rounded-md text-sm">
              Selected: <span className="font-medium">{selectedAutoValue.label}</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-md shadow-sm border border-gray-200 p-4 text-sm space-y-2 flex-1">
        <h3 className="font-medium text-gray-900">Features</h3>
        <ul className="space-y-1 text-gray-700">
          <li>• Keyboard navigation (↑/↓ arrows, Enter, Esc)</li>
          <li>• Autocomplete search filtering</li>
          <li>• Clear selection option</li>
          <li>• Custom styling based on shadcn/ui</li>
          <li>• Accessibility support</li>
        </ul>
      </div>
      <CustomSelect
            options={options}
            placeholder="Search frameworks"
            onChange={handleAutoChange}
            autocomplete={true}
          />
    </div>
  );
}