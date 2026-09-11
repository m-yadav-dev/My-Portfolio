/**
 * @file utils/contact-validation.js
 * @description Pure validation functions for the Contact Form.
 *
 * Every function is stateless and side-effect-free — easy to unit-test.
 * Returns an error string (truthy) on failure, or an empty string (falsy) on success.
 */

// ---------------------------------------------------------------------------
// Individual field validators
// ---------------------------------------------------------------------------

/**
 * RFC 5322–simplified email pattern.
 * Covers 99.9 % of real-world addresses without being excessively strict.
 * @type {RegExp}
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validate the "Name" field.
 * @param {string} value
 * @returns {string} Error message or empty string.
 */
export function validateName(value) {
  const trimmed = value.trim();
  if (!trimmed) return "Name is required.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  if (trimmed.length > 100) return "Name must be under 100 characters.";
  return "";
}

/**
 * Validate the "Email" field.
 * @param {string} value
 * @returns {string} Error message or empty string.
 */
export function validateEmail(value) {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address.";
  return "";
}

/**
 * Validate the "Message" field.
 * @param {string} value
 * @returns {string} Error message or empty string.
 */
export function validateMessage(value) {
  const trimmed = value.trim();
  if (!trimmed) return "Message is required.";
  if (trimmed.length < 10) return "Message must be at least 10 characters.";
  if (trimmed.length > 2000) return "Message must be under 2 000 characters.";
  return "";
}

// ---------------------------------------------------------------------------
// Aggregate validator
// ---------------------------------------------------------------------------

/** Map each field name to its validator. */
const FIELD_VALIDATORS = {
  name: validateName,
  email: validateEmail,
  message: validateMessage,
};

/**
 * Validate all fields and return an errors object.
 * @param {import("@/types/contact.types").ContactFormData} formData
 * @returns {import("@/types/contact.types").ContactFormErrors}
 */
export function validateContactForm(formData) {
  /** @type {import("@/types/contact.types").ContactFormErrors} */
  const errors = {};

  for (const [field, validator] of Object.entries(FIELD_VALIDATORS)) {
    const error = validator(formData[field] ?? "");
    if (error) errors[field] = error;
  }

  return errors;
}

/**
 * Validate a single field by name.
 * @param {string} fieldName
 * @param {string} value
 * @returns {string} Error message or empty string.
 */
export function validateField(fieldName, value) {
  const validator = FIELD_VALIDATORS[fieldName];
  return validator ? validator(value) : "";
}
