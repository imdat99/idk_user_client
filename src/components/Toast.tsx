import { AlertCircle, Bell, Check, Info, X } from 'lucide-react';
import React, { useState, useEffect, useMemo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Root as ReactRoot, createRoot } from 'react-dom/client';

const TOAST_ID = 'TOAST_ID';
// TypeScript Types and Interfaces
type ToastVariant = 'default' | 'success' | 'error' | 'notification';
type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface Toast {
  id: number;
  title?: React.ReactNode; // Changed from string
  description?: React.ReactNode; // Changed from string
  variant: ToastVariant;
  action?: ToastAction;
  status: 'entering' | 'active' | 'exiting';
  position: ToastPosition;
  duration?: number;
  hideTimeoutId?: ReturnType<typeof setTimeout>;
  scheduledHideTime?: number;
  remainingDurationOnPause?: number;
  isPaused?: boolean;
}

interface ShowToastParams {
  title?: React.ReactNode; // Changed from string
  description?: React.ReactNode; // Changed from string
  variant?: ToastVariant;
  duration?: number | typeof Infinity;
  action?: ToastAction;
  position?: ToastPosition;
}

// Global state for the auto-mounted ToastContainer
let autoMountedContainerReactRoot: ReactRoot | null = null;
let autoMountedContainerHostElement: HTMLElement | null = null;

// Function to ensure the global ToastContainer is mounted and rendered
function ensureAutoMountedToastContainer(serviceInstance: ToastService) {
  if (typeof document === 'undefined') return;

  if (!autoMountedContainerHostElement) {
    autoMountedContainerHostElement = document.getElementById(TOAST_ID);
    if (!autoMountedContainerHostElement) {
      autoMountedContainerHostElement = document.createElement('div');
      autoMountedContainerHostElement.id = TOAST_ID;
      document.body.appendChild(autoMountedContainerHostElement);
    }
  }

  if (!autoMountedContainerReactRoot) {
    autoMountedContainerReactRoot = createRoot(autoMountedContainerHostElement);
  }

  autoMountedContainerReactRoot.render(
    <React.StrictMode>
      <ToastContainer defaultPosition={serviceInstance.getPosition()} />
    </React.StrictMode>,
  );
}

// Toast Service for state management
class ToastService {
  private toasts: Toast[] = [];
  private globalPosition: ToastPosition = 'bottom-right';
  private listeners: Set<() => void> = new Set();
  private toastIdCounter = 0;

  constructor(defaultPosition: ToastPosition = 'bottom-right') {
    this.globalPosition = defaultPosition;
  }

  show = ({
    title,
    description,
    variant = 'default',
    duration = 5000,
    action,
    position: toastPosition,
  }: ShowToastParams): number => {
    if (typeof document !== 'undefined') {
      ensureAutoMountedToastContainer(this);
    }

    const id = this.toastIdCounter++;
    const newToast: Toast = {
      id,
      title,
      description,
      variant,
      action,
      status: 'entering',
      position: toastPosition || this.globalPosition,
      duration,
      isPaused: false,
    };

    if (duration !== Infinity) {
      newToast.scheduledHideTime = Date.now() + duration;
      newToast.hideTimeoutId = setTimeout(() => {
        this.hide(id);
      }, duration);
    }

    this.toasts = [...this.toasts, newToast];
    this.notifyListeners();

    setTimeout(() => {
      this.toasts = this.toasts.map((t) =>
        t.id === id ? { ...t, status: 'active' } : t,
      );
      this.notifyListeners();
    }, 10);

    return id;
  };

  hide = (id: number) => {
    const toastToHide = this.toasts.find((t) => t.id === id);
    if (toastToHide?.hideTimeoutId) {
      clearTimeout(toastToHide.hideTimeoutId);
    }

    const toastExists = this.toasts.some(
      (t) => t.id === id && t.status !== 'exiting',
    );
    if (!toastExists) return;

    this.toasts = this.toasts.map((t) =>
      t.id === id ? { ...t, status: 'exiting', hideTimeoutId: undefined } : t,
    );
    this.notifyListeners();

    setTimeout(() => {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
      this.notifyListeners();
    }, 300);
  };

  pauseHideTimer = (id: number) => {
    this.toasts = this.toasts.map((t) => {
      if (t.id === id && !t.isPaused && t.hideTimeoutId) {
        clearTimeout(t.hideTimeoutId);
        const remaining = Math.max(0, (t.scheduledHideTime || 0) - Date.now());
        return {
          ...t,
          isPaused: true,
          remainingDurationOnPause: remaining,
          hideTimeoutId: undefined,
        };
      }
      return t;
    });
    this.notifyListeners();
  };

  resumeHideTimer = (id: number) => {
    this.toasts = this.toasts.map((t) => {
      if (t.id === id && t.isPaused) {
        if (
          t.remainingDurationOnPause !== undefined &&
          t.remainingDurationOnPause > 0
        ) {
          const newHideTimeoutId = setTimeout(
            () => this.hide(id),
            t.remainingDurationOnPause,
          );
          return {
            ...t,
            isPaused: false,
            scheduledHideTime: Date.now() + t.remainingDurationOnPause,
            hideTimeoutId: newHideTimeoutId,
            remainingDurationOnPause: undefined,
          };
        } else {
          return {
            ...t,
            isPaused: false,
            remainingDurationOnPause: undefined,
          };
        }
      }
      return t;
    });
    this.notifyListeners();

    const currentToastState = this.toasts.find((t) => t.id === id);
    if (
      currentToastState &&
      currentToastState.isPaused === false &&
      currentToastState.hideTimeoutId === undefined &&
      currentToastState.duration !== Infinity &&
      currentToastState.status !== 'exiting'
    ) {
      this.hide(id);
    }
  };

  setPosition = (newPosition: ToastPosition) => {
    this.globalPosition = newPosition;
    this.notifyListeners();

    if (typeof document !== 'undefined' && autoMountedContainerHostElement) {
      ensureAutoMountedToastContainer(this);
    }
  };

  getToasts = (): readonly Toast[] => this.toasts;
  getPosition = (): ToastPosition => this.globalPosition;

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notifyListeners = () => {
    this.listeners.forEach((listener) => listener());
  };
}

// Initialize the service
// const toastService = new ToastService();
const toastService = (() => {
  let instance: ToastService | null = null;
  if (!instance) {
    instance = new ToastService();
  }
  return instance;
})();
// Exported functions for components to use
export const showToast = toastService.show;
export const hideToast = toastService.hide;
export const setToastPosition = toastService.setPosition;
export const getToastPosition = toastService.getPosition;
export const pauseToastTimer = toastService.pauseHideTimer;
export const resumeToastTimer = toastService.resumeHideTimer;

// ToastContainer: Renders toasts and manages portal
interface ToastContainerProps {
  defaultPosition?: ToastPosition;
}

export const ToastContainer = ({
  defaultPosition = 'bottom-right',
}: ToastContainerProps) => {
  const [currentToasts, setCurrentToasts] = useState<readonly Toast[]>(
    toastService.getToasts(),
  );
  const [currentGlobalPosition, setCurrentGlobalPosition] =
    useState<ToastPosition>(toastService.getPosition());
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (defaultPosition !== toastService.getPosition()) {
      toastService.setPosition(defaultPosition);
    }
    setCurrentToasts(toastService.getToasts());
    setCurrentGlobalPosition(toastService.getPosition());

    const unsubscribe = toastService.subscribe(() => {
      setCurrentToasts([...toastService.getToasts()]);
      setCurrentGlobalPosition(toastService.getPosition());
    });
    return unsubscribe;
  }, [defaultPosition]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    let portalDiv = document.getElementById(TOAST_ID);
    let createdByThisInstance = false;

    if (!portalDiv) {
      portalDiv = document.createElement('div');
      portalDiv.id = TOAST_ID;
      document.body.appendChild(portalDiv);
      createdByThisInstance = true;
    }

    if (!portalDiv.style.cssText) {
      portalDiv.style.position = 'fixed';
      portalDiv.style.top = '0';
      portalDiv.style.left = '0';
      portalDiv.style.width = '0';
      portalDiv.style.height = '0';
      portalDiv.style.zIndex = '9999';
    }
    setPortalElement(portalDiv);

    return () => {
      if (
        portalDiv &&
        createdByThisInstance &&
        portalDiv.childNodes.length === 0
      ) {
        if (document.body.contains(portalDiv)) {
          document.body.removeChild(portalDiv);
        }
      }
    };
  }, []);

  const positionClasses = useMemo<Record<ToastPosition, string>>(
    () => ({
      'top-left': 'top-4 left-4 flex-col',
      'top-center': 'top-4 left-1/2 -translate-x-1/2 flex-col items-center',
      'top-right': 'top-4 right-4 flex-col',
      'bottom-left': 'bottom-4 left-4 flex-col-reverse',
      'bottom-center':
        'bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse items-center',
      'bottom-right': 'bottom-4 right-4 flex-col-reverse',
    }),
    [],
  );

  const positionedToasts = useMemo(() => {
    return currentToasts.reduce(
      (acc, toast) => {
        const pos = toast.position || currentGlobalPosition;
        if (!acc[pos]) acc[pos] = [];
        acc[pos].push(toast);
        return acc;
      },
      {} as Record<ToastPosition, Toast[]>,
    );
  }, [currentToasts, currentGlobalPosition]);

  if (!portalElement) return null;

  return (
    <>
      {Object.entries(positionedToasts).map(([pos, toastsInPosition]) => {
        const currentPositionKey = pos as ToastPosition;
        if (!toastsInPosition || toastsInPosition.length === 0) return null;

        return createPortal(
          <div
            key={currentPositionKey}
            className={`fixed flex gap-2 z-[9999] ${positionClasses[currentPositionKey]}`}
          >
            {toastsInPosition.map((toastItem) => (
              <GoogleShadcnToast key={toastItem.id} {...toastItem} />
            ))}
          </div>,
          portalElement,
        );
      })}
    </>
  );
};

interface GoogleShadcnToastProps extends Toast {}

interface VariantStyle {
  icon: ReactNode;
  containerClasses: string;
}

const GoogleShadcnToast = React.memo(
  ({
    id,
    title,
    description,
    variant = 'default',
    action,
    status = 'active',
    position = 'bottom-right',
  }: GoogleShadcnToastProps) => {
    const variantStyles = useMemo<Record<ToastVariant, VariantStyle>>(
      () => ({
        default: {
          icon: <Info className="text-blue-500" size={20} />,
          containerClasses: 'border-l-4 border-blue-500',
        },
        success: {
          icon: <Check className="text-green-500" size={20} />,
          containerClasses: 'border-l-4 border-green-500',
        },
        error: {
          icon: <AlertCircle className="text-red-500" size={20} />,
          containerClasses: 'border-l-4 border-red-500',
        },
        notification: {
          icon: <Bell className="text-purple-500" size={20} />,
          containerClasses: 'border-l-4 border-purple-500',
        },
      }),
      [],
    );

    const { icon, containerClasses } =
      variantStyles[variant] || variantStyles.default;

    const animationClasses = useMemo(() => {
      const positionMap: Record<
        ToastPosition,
        Record<'entering' | 'active' | 'exiting', string>
      > = {
        'top-left': {
          entering: '-translate-x-full opacity-0',
          active: 'translate-x-0 opacity-100',
          exiting: '-translate-x-full opacity-0',
        },
        'top-center': {
          entering: '-translate-y-full opacity-0',
          active: 'translate-y-0 opacity-100',
          exiting: '-translate-y-full opacity-0',
        },
        'top-right': {
          entering: 'translate-x-full opacity-0',
          active: 'translate-x-0 opacity-100',
          exiting: 'translate-x-full opacity-0',
        },
        'bottom-left': {
          entering: '-translate-x-full opacity-0',
          active: 'translate-x-0 opacity-100',
          exiting: '-translate-x-full opacity-0',
        },
        'bottom-center': {
          entering: 'translate-y-full opacity-0',
          active: 'translate-y-0 opacity-100',
          exiting: '-translate-y-full opacity-0',
        },
        'bottom-right': {
          entering: 'translate-x-full opacity-0',
          active: 'translate-x-0 opacity-100',
          exiting: 'translate-x-full opacity-0',
        },
      };
      const positionAnimations =
        positionMap[position] || positionMap['bottom-right'];
      return positionAnimations[status] || positionAnimations.active;
    }, [position, status]);

    return (
      <div
        className={`
        bg-white rounded-lg shadow-lg px-4 py-3 min-w-64 max-w-md 
        flex items-start gap-3 ${containerClasses}
        transform transition-all duration-300 ease-in-out m-2 border-1
        ${animationClasses}
      `}
        onMouseEnter={() => pauseToastTimer(id)}
        onMouseLeave={() => resumeToastTimer(id)}
      >
        <div className="mt-1">{icon}</div>
        <div className="flex-1">
          {title && <div className="font-medium text-gray-900">{title}</div>}
          {description && (
            <div className="text-sm text-gray-600">{description}</div>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm font-medium tracking-wide text-blue-500 hover:text-blue-700 uppercase"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => hideToast(id)}
          className="rounded-full p-1 hover:bg-gray-100 mt-1"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>
    );
  },
);

const ToastDemo = () => {
  const [activePosition, setActivePosition] = useState<ToastPosition>(
    getToastPosition(),
  );

  const handleSetPosition = (pos: ToastPosition) => {
    setToastPosition(pos);
    setActivePosition(pos);
  };

  useEffect(() => {
    const unsubscribe = toastService.subscribe(() => {
      setActivePosition(toastService.getPosition());
    });
    setActivePosition(toastService.getPosition());
    return unsubscribe;
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Google + Shadcn UI Toast Component (Auto-Mounted)
      </h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Position</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSetPosition('top-left')}
            className={`px-3 py-1 rounded ${activePosition === 'top-left' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Top Left
          </button>
          <button
            onClick={() => handleSetPosition('top-center')}
            className={`px-3 py-1 rounded ${activePosition === 'top-center' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Top Center
          </button>
          <button
            onClick={() => handleSetPosition('top-right')}
            className={`px-3 py-1 rounded ${activePosition === 'top-right' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Top Right
          </button>
          <button
            onClick={() => handleSetPosition('bottom-left')}
            className={`px-3 py-1 rounded ${activePosition === 'bottom-left' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Bottom Left
          </button>
          <button
            onClick={() => handleSetPosition('bottom-center')}
            className={`px-3 py-1 rounded ${activePosition === 'bottom-center' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Bottom Center
          </button>
          <button
            onClick={() => handleSetPosition('bottom-right')}
            className={`px-3 py-1 rounded ${activePosition === 'bottom-right' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Bottom Right
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() =>
            showToast({
              title: 'Default Toast',
              description: 'This is a default informational toast message',
              variant: 'default',
              duration: 5000,
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Show Info Toast
        </button>
        <button
          onClick={() =>
            showToast({
              title: (
                <span style={{ color: 'purple' }}>
                  Success! (Component Title)
                </span>
              ),
              description: 'Your changes have been saved successfully',
              variant: 'success',
              duration: 5000,
            })
          }
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Show Success Toast
        </button>
        <button
          onClick={() =>
            showToast({
              title: 'Error',
              description: 'Something went wrong. Please try again.',
              variant: 'error',
              duration: 5000,
            })
          }
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Show Error Toast
        </button>
        <button
          onClick={() =>
            showToast({
              title: 'New Message',
              description: "You've received a new notification",
              variant: 'notification',
              action: {
                label: 'View',
                onClick: () => alert('Action clicked!'),
              },
              duration: 8000,
            })
          }
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Show Action Toast
        </button>
        <button
          onClick={() =>
            showToast({
              title: 'Custom Position',
              description:
                'This toast appears at the top-right regardless of the global setting',
              variant: 'default',
              duration: 5000,
              position: 'top-right',
            })
          }
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Custom Position Toast
        </button>
        <button
          onClick={() =>
            showToast({
              // title: <span style={{ color: 'orange', fontWeight: 'bold' }}>Custom Title Component</span>,
              description: (
                <p>
                  This toast uses a <em>React component</em> for its
                  description!
                </p>
              ),
              variant: 'default',
              duration: 7000,
            })
          }
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Show Toast with Custom Component Content
        </button>
      </div>
      <div className="mt-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
          {`// 1. No need to add ToastContainer manually for basic usage.
//    It will be auto-mounted when showToast is called.

// 2. Use the toast functions in any component
// import { showToast, setToastPosition } from './Toast';

const YourComponent = () => {
  const handleClick = () => {
    showToast({
      title: "Success!",
      description: "Your action was completed successfully",
      variant: "success",
      duration: 5000
    });
  };
  
  return <button onClick={handleClick}>Show Toast</button>;
};

// Optional: If you need to customize ToastContainer props (e.g. defaultPosition)
// you can still render it manually at your app root. If you do so,
// the auto-mounting mechanism will respect the manually rendered one if possible,
// though it's generally recommended to rely on setToastPosition for dynamic changes.
// For most cases, just calling showToast() is enough.
`}
        </pre>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <ToastDemo />
    </>
  );
}
