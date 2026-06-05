/**
 * @file controllers/contact.controller.js
 * @description POST /api/contact — lead generation handler.
 *
 * SPEC RESPONSIBILITY (SoC — after refactor):
 *   1. Parse & validate req.body with Zod  (controller concern)
 *   2. Delegate email dispatch to email.service.js  (service concern)
 *   3. Format and return { success, data, error } response  (controller concern)
 *
 * DOES NOT: know about Resend, retry logic, or HTML templates.
 */

"use strict";

const { z } = require("zod");
const { sendContactEmail } = require("../services/resend/email.service");

// ---------------------------------------------------------------------------
// Zod validation schema — mirrors client-side schema exactly
// ---------------------------------------------------------------------------
const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must not exceed 100 characters."),
  email: z
    .string({ required_error: "Email is required." })
    .email("Please provide a valid email address."),
  message: z
    .string({ required_error: "Message is required." })
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must not exceed 2000 characters."),
});

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
const handleContactSubmission = async (req, res) => {
  // 1. Validate — non-retryable, fail fast
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    const message = parsed.error.errors.map((e) => e.message).join(" ");
    return res.status(400).json({
      success: false,
      data: null,
      error: { code: "VALIDATION_ERROR", message },
    });
  }

  // 2. Delegate to email service — retries handled inside service
  try {
    const { id } = await sendContactEmail(parsed.data);

    return res.status(200).json({
      success: true,
      data: {
        message: "Email dispatched successfully via Resend.",
        ticket_id: id,
      },
      error: null,
    });
  } catch (err) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      layer: "CONTROLLER",
      module: "contact.controller.js",
      error_message: err.message,
      stack_trace: err.stack,
    }));

    return res.status(503).json({
      success: false,
      data: null,
      error: {
        code: "EMAIL_SERVICE_UNAVAILABLE",
        message: "Failed to send your message. Please try again shortly.",
      },
    });
  }
};

module.exports = { handleContactSubmission };
