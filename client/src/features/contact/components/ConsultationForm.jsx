/**
 * @file ConsultationForm.jsx
 * @description "Book a Consultation" form component.
 *
 * Reuses the shared Input/TextArea UI primitives and the Zod-validated
 * useConsultationForm hook. Calls the existing contact API service.
 *
 * @param {function} [onSuccess] - Callback fired on successful submission.
 * @param {string}   [className] - Additional wrapper classes.
 */

import { AnimatePresence, motion } from "framer-motion";
import useConsultationForm from "../hooks/useConsultationForm";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { cn } from "@/lib/utils";
import OnSuccessView from "./OnSuccessView";

export default function ConsultationForm({ onSuccess, className }) {
  const {
    formData,
    errors,
    serverError,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useConsultationForm();

  const onSubmit = async (e) => {
    await handleSubmit(e);
    // onSuccess only triggers after a successful submit (isSubmitted = true)
  };

  // ── Success state ──────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <OnSuccessView resetForm={resetForm} className={className} />
    );
  }

  // ── Form state ─────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("flex flex-col gap-4", className)}
    >
      <Input
        id="consult-name"
        name="name"
        label="Name"
        type="text"
        placeholder="Your full name"
        autoComplete="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
      />

      <Input
        id="consult-email"
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
      />

      <TextArea
        id="consult-message"
        name="message"
        label="Message"
        placeholder="Tell me about your project…"
        rows={4}
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.message}
      />

      {/* Server error banner */}
      <AnimatePresence>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="px-3 py-2 rounded border border-red-500/30 bg-red-500/10 text-red-400 text-sm overflow-hidden"
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-[#0B0C10] font-semibold rounded-lg text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:ring-offset-2 focus:ring-offset-[#0F0F11]"
      >
        {isSubmitting ? "Sending…" : "Submit Request"}
      </button>
    </form>
  );
}
