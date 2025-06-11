import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// biome-ignore lint/suspicious/noExplicitAny: <reason>
export function memorizeFn<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// --- Utility for merging refs ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMergeRefs<T = unknown>(
  refs: Array<React.Ref<T> | undefined>,
): React.RefCallback<T> {
  return (value) => {
    for(const ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    }
  };
}
export const composeRef = <T>(...refs: React.Ref<T>[]): React.Ref<T> => {
  const refList = refs.filter(Boolean);
  if (refList.length <= 1) {
    return refList[0];
  }
  return (node: T) => {
    for (const ref of refs) {
      fillRef(ref, node);
    }
  };
};
export const fillRef = <T>(ref: React.Ref<T>, node: T) => {
  if (typeof ref === 'function') {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ref((node as any)?.nativeElement ?? node);
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (ref as any).current = node;
  }
};
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait = 100,
): T => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  } as T;
};
