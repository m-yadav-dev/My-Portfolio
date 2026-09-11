/**
 * @file components/ui/Input.jsx
 * @description Reusable, stateless text input with glassmorphism styling.
 *
 * Features:
 *  - Linked <label> for accessibility (can be visually hidden or styled).
 *  - `aria-invalid` + `aria-describedby` wired automatically when `error` is truthy.
 *  - Accepts all standard <input> props via rest spread.
 */

import { cn } from "@/lib/utils";

/**
 * @param {object}  props
 * @param {string}  props.id          - HTML id (also links the label).
 * @param {string}  props.label       - Visible label text.
 * @param {string}  [props.error]     - Inline error message (falsy = no error).
 * @param {string}  [props.className] - Additional wrapper classes.
 * @param {boolean} [props.srOnlyLabel] - If true, label is visually hidden.
 * @param {import("react").InputHTMLAttributes<HTMLInputElement>} props
 */
export default function Input({
  id,
  label,
  error,
  className,
  srOnlyLabel = false,
  ...rest
}) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {/* Label */}
      <label
        htmlFor={id}
        className={cn(
          "text-sm font-medium text-slate-300 tracking-wide",
          srOnlyLabel && "sr-only",
        )}
      >
        {label}
      </label>

      {/* Input */}
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          // Base
          "w-full rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500",
          // Glassmorphism
          "bg-white/[0.04] backdrop-blur-md",
          "border border-white/[0.08]",
          // Focus
          "outline-none transition-all duration-200",
          "focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/40",
          // Error state
          error && "border-red-500/60 focus:ring-red-500/40 focus:border-red-500/40",
        )}
        {...rest}
      />

      {/* Inline error */}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-400 mt-0.5 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}
