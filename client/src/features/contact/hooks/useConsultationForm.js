/**
 * @file hooks/useConsultationForm.js
 * @description Custom hook that owns all Consultation Form state and logic.
 *
 * Responsibilities:
 *  1. Manages formData, errors, serverError, isSubmitting, and isSubmitted.
 *  2. Validates inputs using the Zod-based consultation schema.
 *  3. Submits via the existing contact API service (no new endpoints).
 *  4. Exposes handlers for controlled inputs, blur validation, and submit.
 */

import { useState, useCallback } from "react";
import { INITIAL_FORM_DATA, INITIAL_FORM_ERRORS } from "@/types/contact.types";
import {
  validateConsultationForm,
  validateConsultationField,
} from "../schemas/consultation.schema";
import { submitContactForm } from "../api/contact.api";

export default function useConsultationForm() {
  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
  const [errors, setErrors] = useState({ ...INITIAL_FORM_ERRORS });
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Track which fields have been touched (for blur validation)
  const [touched, setTouched] = useState({});

  /** Controlled input change handler. */
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Re-validate touched fields as the user types
      if (touched[name]) {
        const fieldError = validateConsultationField(name, value);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }

      if (serverError) setServerError("");
    },
    [touched, serverError],
  );

  /** Validate a single field on blur. */
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldError = validateConsultationField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  }, []);

  /** Full-form submission handler. */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationErrors = validateConsultationForm(formData);
      setErrors(validationErrors);
      setTouched({ name: true, email: true, message: true });

      const hasErrors = Object.values(validationErrors).some(Boolean);
      if (hasErrors) return;

      setIsSubmitting(true);
      setServerError("");

      try {
        await submitContactForm(formData);
        setIsSubmitted(true);
      } catch (err) {
        setServerError(
          err.message || "Failed to send message. Please try again.",
        );
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
