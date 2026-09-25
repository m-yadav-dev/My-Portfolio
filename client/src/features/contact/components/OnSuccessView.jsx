/**
 * @file OnSuccessView.jsx
 * @description Success confirmation view shown after a form is submitted.
 *
 * Stateless presentational component — receives resetForm as a prop
 * from the parent form that owns the state.
 */

import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

/**
 * @param {object}   props
 * @param {function} props.resetForm - Callback to reset the parent form state.
 * @param {string}   [props.className] - Additional wrapper classes.
 */
export default function OnSuccessView({ resetForm, className }) {
  return (
    <div className={cn("py-8 text-center", className)}>
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cyan-400/10 ring-2 ring-cyan-400/30 mb-4">
        <Send className="w-6 h-6 text-cyan-400" />
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">Message Sent!</h4>
      <p className="text-sm text-slate-400 max-w-xs mx-auto">
        Thank you for reaching out. I&rsquo;ll get back to you within 24–48
        hours.
      </p>
      <button
        type="button"
        onClick={resetForm}
        className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors duration-200"
      >
        Send another message
      </button>
    </div>
  );
}