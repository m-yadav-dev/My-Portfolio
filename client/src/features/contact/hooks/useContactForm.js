/**
 * @file hooks/useContactForm.js
 * @description Custom hook that owns all Contact Form state and logic.
 *
 * Responsibilities:
 *  1. Manages formData, errors, isSubmitting, and isSubmitted state.
 *  2. Exposes `handleChange` for controlled inputs.
 *  3. Exposes `handleBlur` for inline validation on blur.
 *  4. Exposes `handleSubmit` which validates → (Phase 2: calls API) → resets.
 *
 * Phase 1: No backend call — submit simply logs data and flags success.
 */

import { useState, useCallback } from "react";
import { INITIAL_FORM_DATA, INITIAL_FORM_ERRORS } from "@/types/contact.types";
import { validateContactForm, validateField } from "./contact-validation";

/**
 * @returns {import("@/types/contact.types").ContactFormState & {
 *   handleChange: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
 *   handleBlur:   (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
 *   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
 *   resetForm:    () => void,
 * }}
 */
export default function useContactForm() {
  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
  const [errors, setErrors] = useState({ ...INITIAL_FORM_ERRORS });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Track which fields have been touched (for blur validation)
  const [touched, setTouched] = useState({});

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  /** Controlled input change handler. */
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear the error for this field as the user types (if it was touched)
      if (touched[name]) {
        const fieldError = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }
    },
    [touched],
  );

  /** Validate a single field when the input loses focus. */
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  }, []);

  /** Full-form submission handler. */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Validate every field
      const validationErrors = validateContactForm(formData);
      setErrors(validationErrors);

      // Mark all fields as touched so future keystrokes clear errors
      setTouched({ name: true, email: true, message: true });

      // Bail if any errors exist
      const hasErrors = Object.values(validationErrors).some(Boolean);
      if (hasErrors) return;

      // Phase 1: simulate async submission
      setIsSubmitting(true);

      // eslint-disable-next-line no-console
      console.log("[ContactForm] Phase 1 — form data:", formData);

      // Simulate network latency so the user sees the loading state
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1200);
    },
    [formData],
  );

  /** Reset the form back to its initial state. */
  const resetForm = useCallback(() => {
    setFormData({ ...INITIAL_FORM_DATA });
    setErrors({ ...INITIAL_FORM_ERRORS });
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
