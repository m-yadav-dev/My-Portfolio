/**
 * @file controllers/contact.controller.js
 * @description Handles POST /api/contact — lead generation endpoint.
 *
 * FLOW:
 *   1. Parse & validate request body with Zod (fail-fast on bad input)
 *   2. Send email via Resend API
 *   3. Return spec-mandated { success, data, error } JSON
 *
 * SPEC RATE LIMIT: 3 requests / hour / IP — enforced in contact.routes.js
 * SPEC RETRY: Resend network errors → exponential backoff, max 3 attempts
 * SPEC LOGGING: Every catch block emits structured JSON log
 */

"use strict";

const { z } = require("zod");
const { Resend } = require("resend");
const env = require("../config/env");

const resend = new Resend(env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// Zod validation schema — spec: name, valid email, non-empty message
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
// Exponential backoff helper — spec: retryable failures, max 3 attempts
// ---------------------------------------------------------------------------
async function withRetry(fn, maxAttempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 2 ** attempt * 300)); // 600ms, 1.2s
      }
    }
  }
  throw lastError;
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
const sendContactEmail = async (req, res) => {
  // 1. Validate payload — NON-RETRYABLE per spec
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    const message = parsed.error.errors.map((e) => e.message).join(" ");
    return res.status(400).json({
      success: false,
      data: null,
      error: { code: "VALIDATION_ERROR", message },
    });
  }

  const { name, email, message } = parsed.data;

  // 2. Dispatch email via Resend — RETRYABLE (network issues)
  try {
    const result = await withRetry(() =>
      resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>", // use verified domain in prod
        to: ["manishyaduvanshi8294@gmail.com"],            // your inbox
        replyTo: email,
        subject: `[Portfolio] New message from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#111">New portfolio inquiry</h2>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <hr style="border:1px solid #eee"/>
            <p style="white-space:pre-wrap">${message}</p>
            <hr style="border:1px solid #eee"/>
            <p style="font-size:12px;color:#888">Sent via manish.dev contact form</p>
          </div>
        `,
      })
    );

    return res.status(200).json({
      success: true,
      data: {
        message: "Email dispatched successfully via Resend.",
        ticket_id: result?.data?.id ?? null,
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

module.exports = { sendContactEmail };
