import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with proper conflict resolution.
 * Combines clsx (for conditional classes) with tailwind-merge (for deduplication).
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'px-6') // → 'py-2 bg-blue-500 px-6'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
