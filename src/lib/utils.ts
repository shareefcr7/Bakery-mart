import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string | number | undefined | null): string {
  if (price === undefined || price === null || price === '') return '₹0.00';
  const str = String(price).trim();
  const numericStr = str.replace(/[^\d.]/g, '');
  if (!numericStr) return str.startsWith('₹') ? str : `₹${str}`;
  const num = parseFloat(numericStr);
  if (isNaN(num)) return `₹${str}`;
  
  // Format with comma separation for thousands (Indian numbering system format)
  return `₹${num.toLocaleString('en-IN')}`;
}
