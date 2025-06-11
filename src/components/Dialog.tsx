import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
  useMemo,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn, useMergeRefs } from 'lib/utils';

const ANIMATION_DURATION = 250; // ms

// --- Context ---
interface DialogContextProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  titleId?: string;
  descriptionId?: string;
  setTitleId: (id: string) => void;
  setDescriptionId: (id: string) => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a Dialog component');
  }
  return context;
};

// --- Components ---

// Dialog (Root Provider)
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [titleId, setTitleId] = useState<string | undefined>(undefined);
  const [descriptionId, setDescriptionId] = useState<string | undefined>(
    undefined,
  );

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const openModal = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(true);
    }
    if (!isControlled) {
      setInternalOpen(true);
    }
  }, [isControlled, onOpenChange]);

  const closeModal = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    }
    if (!isControlled) {
      setInternalOpen(false);
    }
  }, [isControlled, onOpenChange]);

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        titleId,
        setTitleId,
        descriptionId,
        setDescriptionId,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
Dialog.displayName = 'Dialog';

// DialogTrigger
interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, asChild = false, onClick, ...props }, ref) => {
    const { openModal } = useDialog();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      openModal();
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as {
        onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
        [key: string]: any;
      };
      return React.cloneElement(children, {
        ref,
        ...props,
        ...childProps, // Spread childProps to preserve existing ones like className, etc.
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          handleClick(e);
          childProps.onClick?.(e);
        },
      } as ButtonHTMLAttributes<HTMLButtonElement>);
    }

    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  },
);
DialogTrigger.displayName = 'DialogTrigger';

// DialogPortal
interface DialogPortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

const DialogPortal: React.FC<DialogPortalProps> = ({ children, container }) => {
  const { isOpen } = useDialog();
  const [isMountedClientSide, setIsMountedClientSide] = useState(false);
  const [renderStructure, setRenderStructure] = useState(isOpen);

  useEffect(() => {
    setIsMountedClientSide(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setRenderStructure(true);
      document.body.style.overflow = 'hidden'; // Prevent background scroll when modal is open
    } else {
      const timer = setTimeout(() => {
        setRenderStructure(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
    return () => {
      setRenderStructure(false); // Cleanup on unmount
      document.body.style.overflow = ''; // Reset overflow when modal is closed
    };
  }, [isOpen]);

  if (!isMountedClientSide || !renderStructure) {
    return null;
  }

  return createPortal(children, container || document.body);
};
DialogPortal.displayName = 'DialogPortal';

// DialogOverlay
interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { isOpen, closeModal } = useDialog();

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e); // Call original onClick if provided
      if (!e.defaultPrevented) {
        closeModal();
      }
    };

    return (
      <div
        role="dialog"
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 bg-black/70 transition-opacity ease-in-out',
          isOpen
            ? 'opacity-100 duration-250'
            : 'opacity-0 duration-250 pointer-events-none', // Added pointer-events-none when closed
          className,
        )}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={handleOverlayClick}
        {...props}
      />
    );
  },
);
DialogOverlay.displayName = 'DialogOverlay';

// DialogContent
interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: MouseEvent | TouchEvent) => void;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      className,
      children,
      onEscapeKeyDown,
      onPointerDownOutside,
      onOpenAutoFocus,
      onCloseAutoFocus,
      ...props
    },
    ref,
  ) => {
    const { isOpen, closeModal, titleId, descriptionId } = useDialog();
    const contentRef = useRef<HTMLDivElement>(null);
    const combinedRef = useMergeRefs([ref, contentRef]);
    const triggerElementRef = useRef<Element | null>(null); // To store the trigger element

    // Store the trigger element on open
    useEffect(() => {
      if (isOpen) {
        triggerElementRef.current = document.activeElement;
      }
    }, [isOpen]);

    // Handle Escape key
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onEscapeKeyDown?.(event);
          if (!event.defaultPrevented) {
            closeModal();
          }
        }
      };
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeModal, onEscapeKeyDown]);

    // Handle outside click (pointer down)
    useEffect(() => {
      const handlePointerDown = (event: MouseEvent | TouchEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          onPointerDownOutside?.(event);
          // Default behavior of closing on outside click is usually handled by DialogOverlay
          // If DialogOverlay is not used, or if specific logic is needed here:
          // if (!event.defaultPrevented) {
          //   closeModal();
          // }
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown);
      }
      return () => {
        document.removeEventListener('mousedown', handlePointerDown);
        document.removeEventListener('touchstart', handlePointerDown);
      };
    }, [isOpen, closeModal, onPointerDownOutside]);

    // Focus Trapping & Auto Focus
    useEffect(() => {
      if (isOpen && contentRef.current) {
        const focusableElements =
          contentRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (onOpenAutoFocus) {
          const openAutoFocusEvent = new CustomEvent('openevent', {
            cancelable: true,
          });
          onOpenAutoFocus(openAutoFocusEvent);
          if (openAutoFocusEvent.defaultPrevented) return;
        }
        firstFocusable?.focus();

        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === 'Tab' && contentRef.current) {
            const currentFocus = document.activeElement;
            if (e.shiftKey) {
              // Shift + Tab
              if (currentFocus === firstFocusable) {
                lastFocusable?.focus();
                e.preventDefault();
              }
            } else {
              // Tab
              if (currentFocus === lastFocusable) {
                firstFocusable?.focus();
                e.preventDefault();
              }
            }
          }
        };
        document.addEventListener('keydown', handleTabKey);
        return () => {
          document.removeEventListener('keydown', handleTabKey);
          if (onCloseAutoFocus) {
            const closeAutoFocusEvent = new CustomEvent('closeevent', {
              cancelable: true,
            });
            onCloseAutoFocus(closeAutoFocusEvent);
            if (closeAutoFocusEvent.defaultPrevented) return;
          }
          // Return focus to the trigger element if it exists
          if (triggerElementRef.current instanceof HTMLElement) {
            triggerElementRef.current.focus();
          }
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, onOpenAutoFocus, onCloseAutoFocus]); // Dependencies for focus management

    return (
      <div
        ref={combinedRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1} // Make the content itself focusable for certain scenarios
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full bg-white rounded-lg shadow-lg p-6',
          'transition-all ease-in-out duration-150',
          isOpen
            ? 'opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]'
            : 'opacity-0 scale-95 translate-x-[-50%] translate-y-[-45%] pointer-events-none', // Slight upward movement on close
          className,
        )}
        data-state={isOpen ? 'open' : 'closed'}
        // onClick={(e) => e.stopPropagation()} // Already handled by DialogOverlay logic for outside click
        {...props}
      >
        {children}
      </div>
    );
  },
);
DialogContent.displayName = 'DialogContent';

// DialogHeader
interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5 text-center sm:text-left mb-4',
        className,
      )}
      {...props}
    />
  ),
);
DialogHeader.displayName = 'DialogHeader';

// DialogFooter
interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6',
        className,
      )}
      {...props}
    />
  ),
);
DialogFooter.displayName = 'DialogFooter';

// DialogTitle
interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}
const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, id: providedId, ...props }, ref) => {
    const { setTitleId } = useDialog();
    // Ensure id is stable and unique if not provided
    const id = useMemo(
      () =>
        providedId ||
        `dialog-title-${Math.random().toString(36).substring(2, 9)}`,
      [providedId],
    );

    useEffect(() => {
      setTitleId(id);
      return () => setTitleId(''); // Clean up on unmount or id change
    }, [id, setTitleId]);

    return (
      <h2
        ref={ref}
        id={id}
        className={cn(
          'text-lg font-semibold leading-none tracking-tight',
          className,
        )}
        {...props}
      />
    );
  },
);
DialogTitle.displayName = 'DialogTitle';

// DialogDescription
interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}
const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, id: providedId, ...props }, ref) => {
  const { setDescriptionId } = useDialog();
  const id = useMemo(
    () =>
      providedId || `dialog-desc-${Math.random().toString(36).substring(2, 9)}`,
    [providedId],
  );

  useEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId('');
  }, [id, setDescriptionId]);

  return (
    <p
      ref={ref}
      id={id}
      className={cn('text-sm text-gray-500', className)}
      {...props}
    />
  );
});
DialogDescription.displayName = 'DialogDescription';

// DialogClose
interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  asChild?: boolean;
}
const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ children, asChild = false, onClick, className, ...props }, ref) => {
    const { closeModal } = useDialog();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      closeModal();
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as {
        onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
        [key: string]: any;
      };
      return React.cloneElement(children, {
        ref,
        ...props,
        ...childProps,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          handleClick(e);
          childProps.onClick?.(e);
        },
      } as ButtonHTMLAttributes<HTMLButtonElement>);
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          // Default styling for X button, can be overridden
          !children &&
            'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-600',
          className,
        )}
        aria-label={children ? undefined : 'Close'} // Only add aria-label if it's the default X icon
        {...props}
      >
        {children || <X className="h-4 w-4" />}
      </button>
    );
  },
);
DialogClose.displayName = 'DialogClose';

// --- Demo Component (Updated from GoogleModalDemo) ---
export default function DialogDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUncontrolled, setShowUncontrolled] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors">
            Open Controlled Dialog (Edit Profile)
          </button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent
            className="sm:max-w-[425px]"
            onEscapeKeyDown={(e) => {
              console.log('Escape pressed on controlled');
              e.preventDefault();
              setIsModalOpen(false);
            }}
            onOpenAutoFocus={(e) =>
              console.log('Controlled Dialog OpenAutoFocus', e)
            }
            onCloseAutoFocus={(e) =>
              console.log('Controlled Dialog CloseAutoFocus', e)
            }
          >
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm">
                  Name
                </label>
                <input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right text-sm">
                  Username
                </label>
                <input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="submit" // This would typically be inside a <form>
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-md shadow-sm transition-colors"
                onClick={() => {
                  console.log('Changes saved!');
                  setIsModalOpen(false); // Close the dialog on save
                }}
              >
                Save changes
              </button>
            </DialogFooter>
            {/* Default X close button, absolutely positioned by its own styles */}
            <DialogClose />
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Example of a non-controlled dialog, triggered by a separate button */}
      <div className="mt-4">
        <button
          onClick={() => setShowUncontrolled(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors mb-2"
        >
          Toggle Uncontrolled Dialog Visibility (External State)
        </button>
        {/* This Dialog is uncontrolled internally but its mounting is controlled by showUncontrolled */}
        {showUncontrolled && (
          <Dialog
            defaultOpen={true}
            onOpenChange={(open) => {
              if (!open)
                setShowUncontrolled(false); /* Sync external state on close */
            }}
          >
            {/* No DialogTrigger needed here as it opens by defaultOpen and its mounting */}
            <DialogPortal>
              <DialogOverlay />
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Uncontrolled Dialog</DialogTitle>
                  <DialogDescription>
                    This dialog manages its own open/close state once mounted.
                    Closing it will also unmount it via onOpenChange.
                  </DialogDescription>
                </DialogHeader>
                <p className="my-4">
                  Some content here. You can close this with Escape, the X
                  button, or the button below.
                </p>
                <DialogFooter>
                  <DialogClose asChild>
                    <button className="px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-md">
                      Close Me
                    </button>
                  </DialogClose>
                </DialogFooter>
                <DialogClose />
              </DialogContent>
            </DialogPortal>
          </Dialog>
        )}
      </div>

      <div className="mt-4">
        <Dialog>
          <DialogTrigger className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors">
            Open Fully Uncontrolled Dialog
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent className="sm:max-w-xs">
              <DialogHeader>
                <DialogTitle>Fully Uncontrolled</DialogTitle>
                <DialogDescription>
                  This one is completely self-contained.
                </DialogDescription>
              </DialogHeader>
              <p className="my-4">Hello there!</p>
              <DialogFooter>
                <DialogClose className="px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-md">
                  OK
                </DialogClose>
              </DialogFooter>
              <DialogClose />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </div>
  );
}

// Export individual components for more flexible usage if needed
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  useDialog, // Export context hook if needed externally
};
