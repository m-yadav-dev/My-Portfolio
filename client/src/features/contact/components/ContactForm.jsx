/**
 * @file components/sections/contact/ContactForm.jsx
 * @description Main Contact Form wrapper component.
 *
 * Composes:
 *  - useContactForm hook (state + validation)
 *  - <Input> / <TextArea> UI primitives
 *
 * Layout:
 *  - Mobile:  single-column, full-width inputs
 *  - md+:     Name & Email side-by-side (2-col grid), Message full-width below
 *
 * Phase 1: No backend call. Submit logs to console and shows a success state.
 */

import { motion, AnimatePresence } from "framer-motion";
import useContactForm from "../hooks/useContactForm";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";

// ---------------------------------------------------------------------------
// Framer-motion variants
// ---------------------------------------------------------------------------
const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ContactForm() {
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
  } = useContactForm();

  // ── Success state ─────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center justify-center gap-5 py-16 text-center"
      >
        {/* Animated checkmark circle */}
        <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center ring-2 ring-cyan-400/30">
          <svg
            className="w-8 h-8 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
        <p className="text-slate-400 text-sm max-w-sm">
          Thank you for reaching out. I&rsquo;ll get back to you within 24–48 hours.
        </p>

        <button
          type="button"
          onClick={resetForm}
          className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors duration-200"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  // ── Form state ────────────────────────────────────────────────────────────
  return (
    <motion.form
      id="contact-form"
      onSubmit={handleSubmit}
      noValidate
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="w-full space-y-6"
    >
      {/* ── Name + Email (2-col on md+) ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div variants={itemVariants}>
          <Input
            id="contact-name"
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
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            id="contact-email"
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
        </motion.div>
      </div>

      {/* ── Message ──────────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <TextArea
          id="contact-message"
          name="message"
          label="Message"
          placeholder="Tell me about your project, timeline, and budget…"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.message}
        />
      </motion.div>

      {/* ── Submit & Server Error ─────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 py-3 rounded border border-red-500/30 bg-red-500/10 text-red-400 text-sm flex items-start gap-2 overflow-hidden"
              role="alert"
            >
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{serverError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          id="contact-submit"
          type="submit"
          disabled={isSubmitting}
          className="
            group relative w-full sm:w-auto
            px-8 py-3 rounded-lg
            bg-cyan-400 text-[#0B0C10] text-sm font-semibold
            hover:bg-cyan-300
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:ring-offset-2 focus:ring-offset-[#0F0F11]
          "
        >
          <AnimatePresence mode="wait" initial={false}>
            {isSubmitting ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                {/* Spinning loader */}
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Sending…
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Send Message
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </motion.form>
  );
}
