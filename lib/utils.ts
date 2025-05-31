import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Helper function to conditionally join Tailwind CSS class names together.
 * Uses `clsx` for conditional grouping and `tailwind-merge` to resolve conflicts.
 *
 * @param {...ClassValue[]} inputs - Class names to join.
 * @returns {string} A merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
} 