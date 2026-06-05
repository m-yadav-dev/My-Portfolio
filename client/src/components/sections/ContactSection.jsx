/**
 * @file components/sections/ContactSection.jsx
 * @description Lead generation section anchored at #contact.
 *
 * FORM FLOW:
 *   1. react-hook-form manages field state & touch/blur tracking
 *   2. Zod schema validates on submit (client-side) before any API call
 *   3. Axios POST /api/contact sends the validated payload
 *   4. { success, data, error } response drives success / error UI state
 *
 * SPEC RULES:
 *   - Rate limit: 3 req/hr enforced server-side; UI shows friendly error
 *   - Submit button disabled while submitting (prevents double-submit)
 *   - All field errors displayed inline below their input
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Clock, Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

// ---------------------------------------------------------------------------
// Zod schema — mirrors server-side validation exactly
// ---------------------------------------------------------------------------
const contactSchema = z.object({
  name: z
    .string().min(2, "Name must be at least 2 characters.").max(100),
  email: z
    .string().email("Please enter a valid email address."),
  message: z
    .string().min(10, "Message must be at least 10 characters.").max(2000),
});

// ---------------------------------------------------------------------------
// Trust signals
// ---------------------------------------------------------------------------
const SIGNALS = [
  { id: "signal-time",  icon: <Clock size={15} className="text-primary" aria-hidden="true" />, text: "Responds within 24 hours" },
  { id: "signal-email", icon: <Mail  size={15} className="text-primary" aria-hidden="true" />, text: "Delivered directly to inbox via Resend" },
  { id: "signal-chat",  icon: <MessageSquare size={15} className="text-primary" aria-hidden="true" />, text: "Or ask the AI assistant (bottom-right)" },
];

// ---------------------------------------------------------------------------
// Reusable field wrapper
// ---------------------------------------------------------------------------
function Field({ label, id, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-mono text-muted-foreground tracking-wide">
        {label}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] text-destructive flex items-center gap-1"
            role="alert"
          >
            <AlertCircle size={11} aria-hidden="true" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (hasError) =>
  cn(
    "w-full rounded border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50",
    "focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-200",
    hasError ? "border-destructive focus:ring-destructive" : "border-border hover:border-primary/30"
  );

// ---------------------------------------------------------------------------
// ContactForm — isolated sub-component for clean separation
// ---------------------------------------------------------------------------
function ContactForm() {
  const [submitState, setSubmitState] = useState("idle"); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setSubmitState("loading");
    setServerMessage("");
    try {
      const res = await api.post("/contact", data);
      if (res.data.success) {
        setSubmitState("success");
        setServerMessage(res.data.data?.message ?? "Message sent successfully!");
        reset();
      } else {
        throw new Error(res.data.error?.message ?? "Submission failed.");
      }
    } catch (err) {
      setSubmitState("error");
      setServerMessage(err.message ?? "Something went wrong. Please try again.");
    }
  };

  if (submitState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-lg border border-green-500/20 bg-green-500/5 p-8 flex flex-col items-center gap-3 text-center"
        role="status"
        id="contact-success"
      >
        <CheckCircle size={28} className="text-green-400" aria-hidden="true" />
        <p className="text-sm font-medium text-foreground">Message sent!</p>
        <p className="text-xs text-muted-foreground">{serverMessage}</p>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="mt-2 text-xs text-primary hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
      aria-label="Contact form"
    >
      <Field label="Name *" id="contact-name" error={errors.name?.message}>
        <input
          id="contact-name"
          type="text"
          placeholder="Your full name"
          autoComplete="name"
          className={inputClass(!!errors.name)}
          {...register("name")}
        />
      </Field>

      <Field label="Email *" id="contact-email" error={errors.email?.message}>
        <input
          id="contact-email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          className={inputClass(!!errors.email)}
          {...register("email")}
        />
      </Field>

      <Field label="Message *" id="contact-message" error={errors.message?.message}>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell me about your project, timeline, and budget..."
          className={cn(inputClass(!!errors.message), "resize-none")}
          {...register("message")}
        />
      </Field>

      {/* Server-level error (rate limit, service down, etc.) */}
      <AnimatePresence>
        {submitState === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded border border-destructive/30 bg-destructive/5 px-3 py-2.5"
            role="alert"
            id="contact-error-banner"
          >
            <AlertCircle size={14} className="text-destructive mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-xs text-destructive">{serverMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        id="contact-submit"
        type="submit"
        disabled={submitState === "loading"}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded bg-primary text-obsidian text-sm font-semibold hover:bg-primary/85 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {submitState === "loading" ? (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-obsidian/30 border-t-obsidian animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send size={14} aria-hidden="true" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// ContactSection — exported section component
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-border" aria-labelledby="contact-heading">
      <div className="max-w-6xl mx-auto">

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-12">
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3">04 / CONTACT</motion.p>
          <motion.h2 variants={fadeUp} id="contact-heading" className="text-2xl md:text-3xl font-bold mb-4">
            Ready to build something?{" "}
            <span className="text-muted-foreground font-normal">Let's talk.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body text-sm max-w-md leading-relaxed">
            Freelance project, full-time opportunity, or a technical question — I respond within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Trust signals */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-5 pt-1">
            {SIGNALS.map(({ id, icon, text }) => (
              <motion.div key={id} id={id} variants={fadeUp} className="flex items-center gap-3">
                {icon}
                <span className="text-sm text-muted-foreground">{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ContactForm />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
