/**
 * @file hooks/useContactForm.js
 * @description Custom hook that owns all Contact Form state and logic.
 *
 * Responsibilities:
 *  1. Manages formData, errors, serverError, isSubmitting, and isSubmitted state.
 *  2. Exposes `handleChange` for controlled inputs.
 *  3. Exposes `handleBlur` for inline validation on blur.
 *  4. Exposes `handleSubmit` which validates → calls API → handles success/error.
 */

import { useState, useCallback } from "react";
import { INITIAL_FORM_DATA, INITIAL_FORM_ERRORS } from "@/types/contact.types";
import { validateContactForm, validateField } from "./contact-validation";
import { submitContactForm } from "../api/contact.api";

/**
 * @returns {import("@/types/contact.types").ContactFormState & {
 *   serverError: string,
 *   handleChange: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
 *   handleBlur:   (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
 *   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
 *   resetForm:    () => void,
 * }}
 */
export default function useContactForm() {
  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
  const [errors, setErrors] = useState({ ...INITIAL_FORM_ERRORS });
  const [serverError, setServerError] = useState("");
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
      
      // Clear any previous server errors when user starts typing again
      if (serverError) setServerError("");
    },
    [touched, serverError],
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
    async (e) => {
      e.preventDefault();

      // Validate every field
      const validationErrors = validateContactForm(formData);
      setErrors(validationErrors);

      // Mark all fields as touched so future keystrokes clear errors
      setTouched({ name: true, email: true, message: true });

      // Bail if any errors exist
      const hasErrors = Object.values(validationErrors).some(Boolean);
      if (hasErrors) return;

      setIsSubmitting(true);
      setServerError("");

      try {
        await submitContactForm(formData);
        setIsSubmitted(true);
      } catch (err) {
        setServerError(err.message || "Failed to send message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData],
  );

  /** Reset the form back to its initial state. */
  const resetForm = useCallback(() => {
    setFormData({ ...INITIAL_FORM_DATA });
    setErrors({ ...INITIAL_FORM_ERRORS });
    setServerError("");
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, []);

  return {
    formData,
    errors,
    serverError,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
