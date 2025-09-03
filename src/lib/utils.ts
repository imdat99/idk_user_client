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
    for (const ref of refs) {
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
type Path = string | number | symbol;
type PathArray = Array<Path>;
type PathInput = string | PathArray;

// Biến string 'a.b.c' → ['a', 'b', 'c']
const parsePath = (path: PathInput): PathArray =>
  Array.isArray(path)
    ? path
    : path
        .replace(/\[(\d+)]/g, '.$1')
        .split('.')
        .filter(Boolean);

export function get<T, Default = undefined>(
  obj: T,
  path: PathInput,
  defaultValue?: Default,
): any extends T ? Default : unknown {
  const keys = parsePath(path);
  let result: any = obj;

  for (const key of keys) {
    if (result == null) return defaultValue as Default;
    result = result[key];
  }

  return result === undefined ? (defaultValue as Default) : result;
}
export function set<T extends object>(obj: T, path: PathInput, value: any): T {
  const keys = parsePath(path);
  let current: any = obj;

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;

    if (isLast) {
      current[key] = value;
    } else {
      if (current[key] == null || typeof current[key] !== 'object') {
        const nextKey = keys[index + 1];
        current[key] = typeof nextKey === 'number' ? [] : {};
      }
      current = current[key];
    }
  });

  return obj;
}
// this function ensures a function is only run on the client side
export function runOnClient<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: Parameters<T>): ReturnType<T> | null => {
    if (typeof window === 'undefined') {
      return null;
    }
    return fn(...args);
  }) as T;
}