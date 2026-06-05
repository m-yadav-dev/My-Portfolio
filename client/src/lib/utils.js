/**
 * @file utils.js
 * @module lib/utils
 * @description Shared utility functions.
 *
 * `cn()` — shadcn/ui's required class name merger.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 * Every shadcn/ui component in /components/ui uses this.
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names, resolving conflicts intelligently.
 * @param {...(string|undefined|null|false)} inputs
 * @returns {string}
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary", "px-6")
 * // → "py-2 bg-primary px-6"  (px-4 is overridden by px-6 via tailwind-merge)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
