/**
 * @file types/contact.types.js
 * @description JSDoc type definitions for the Contact Form.
 *
 * Since this project uses plain JavaScript (not TypeScript),
 * we centralise form-related shapes here as JSDoc typedefs
 * that editors and other modules can reference via @import.
 */

/**
 * @typedef {Object} ContactFormData
 * @property {string} name    - Sender's full name.
 * @property {string} email   - Sender's email address.
 * @property {string} message - Project description / message body.
 */

/**
 * @typedef {Object} ContactFormErrors
 * @property {string} [name]    - Validation error for the name field.
 * @property {string} [email]   - Validation error for the email field.
 * @property {string} [message] - Validation error for the message field.
 */

/**
 * @typedef {Object} ContactFormState
 * @property {ContactFormData}   formData    - Current values of every field.
 * @property {ContactFormErrors} errors      - Current validation errors (empty = valid).
 * @property {boolean}           isSubmitting - True while a submission is in flight.
 * @property {boolean}           isSubmitted  - True after a successful submission.
 */

/** Initial (empty) form data. */
export const INITIAL_FORM_DATA = Object.freeze({
  name: "",
  email: "",
  message: "",
});

/** Initial (empty) errors object. */
export const INITIAL_FORM_ERRORS = Object.freeze({
  name: "",
  email: "",
  message: "",
});
