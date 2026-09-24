/**
 * @file api/contact.api.js
 * @description API service for the contact form.
 *
 * Isolates the HTTP contract for the lead generation endpoint.
 * Uses the configured Axios instance which handles baseURL resolution
 * and error normalization.
 */

import api from "@/lib/api-client";

/**
 * Submits the contact form data to the backend.
 * @param {import("@/types/contact.types").ContactFormData} formData
 * @returns {Promise<any>} The parsed response data envelope { success, data, error }
 * @throws {Error} Throws normalized error string if the request fails
 */
export async function submitContactForm(formData) {
  const response = await api.post("/contact", formData);
  return response.data;
}
