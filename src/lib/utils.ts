import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function memorizeFn<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>()
  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  } as T
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// --- Utility for merging refs ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMergeRefs<T = any>(refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
export const composeRef = <T>(...refs: React.Ref<T>[]): React.Ref<T> => {
  const refList = refs.filter(Boolean);
  if (refList.length <= 1) {
    return refList[0];
  }
  return (node: T) => {
    refs.forEach(ref => {
      fillRef(ref, node);
    });
  };
};
export const fillRef = <T>(ref: React.Ref<T>, node: T) => {
  if (typeof ref === 'function') {
    ref((node as any)?.nativeElement ?? node);
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    (ref as any).current = node;
  }
};
export const debounce = <T extends (...args: any[]) => void>(func: T, wait: number = 100): T => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  } as T;
}