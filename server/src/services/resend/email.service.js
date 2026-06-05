/**
 * @file services/resend/email.service.js
 * @description Email dispatch service — sole owner of the Resend SDK.
 *
 * SPEC RESPONSIBILITY (SoC):
 *   - Owns the Resend client instance.
 *   - Owns the exponential backoff retry logic.
 *   - Owns the HTML email template.
 *   - Exports a single async function consumed by the controller.
 *
 * The controller is NEVER aware of Resend internals; it only calls
 * sendContactEmail() and handles the returned { id } or thrown Error.
 */

"use strict";

const { Resend } = require("resend");
const env = require("../../config/env");

// Single Resend client instance — initialized once at module load
const resend = new Resend(env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// Exponential backoff helper — max 3 attempts (600ms → 1.2s delays)
// ---------------------------------------------------------------------------
async function withRetry(fn, maxAttempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 2 ** attempt * 300));
      }
    }
  }
  throw lastError;
}

// ---------------------------------------------------------------------------
// HTML email template — kept in the service layer, not the controller
// ---------------------------------------------------------------------------
function buildEmailHtml({ name, email, message }) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#111;border-bottom:2px solid #eee;padding-bottom:8px">
        New portfolio inquiry
      </h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <hr style="border:1px solid #eee"/>
      <p style="white-space:pre-wrap;line-height:1.6">${message}</p>
      <hr style="border:1px solid #eee"/>
      <p style="font-size:11px;color:#aaa;margin-top:16px">
        Sent via manish.dev contact form · Powered by Resend
      </p>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// sendContactEmail — the single exported function
// Throws on failure so the controller can catch and return a 503.
// Returns { id } from Resend on success.
// ---------------------------------------------------------------------------
async function sendContactEmail({ name, email, message }) {
  const result = await withRetry(() =>
    resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // replace w/ verified domain in prod
      to: ["manishyaduvanshi8294@gmail.com"],
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      html: buildEmailHtml({ name, email, message }),
    })
  );

  return { id: result?.data?.id ?? null };
}

module.exports = { sendContactEmail };
