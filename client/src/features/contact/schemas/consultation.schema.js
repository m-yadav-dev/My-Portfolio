/**
 * @file schemas/consultation.schema.js
 * @description Zod validation schema for the Book a Consultation form.
 *
 * Provides a single source of truth for field rules and user-friendly
 * error messages. Used by the useConsultationForm hook.
 */

import { z } from "zod";

export const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be under 100 characters."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be under 2,000 characters."),
});

/**
 * Validate a single field against the schema.
 * @param {string} fieldName - 'name' | 'email' | 'message'
 * @param {string} value
 * @returns {string} Error message or empty string.
 */
export function validateConsultationField(fieldName, value) {
  const fieldSchema = consultationSchema.shape[fieldName];
  if (!fieldSchema) return "";

  const result = fieldSchema.safeParse(value);
  if (result.success) return "";
  return result.error.issues[0]?.message ?? "Invalid value.";
}

/**
 * Validate the entire form data object.
 * @param {{ name: string, email: string, message: string }} formData
 * @returns {{ name?: string, email?: string, message?: string }}
 */
export function validateConsultationForm(formData) {
  const result = consultationSchema.safeParse(formData);
  if (result.success) return {};

  /** @type {Record<string, string>} */
  const errors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}
