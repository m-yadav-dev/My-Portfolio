/**
 * @file controllers/chat.controller.js
 * @description POST /api/chat — RAG chatbot endpoint handler.
 *
 * SPEC RESPONSIBILITY (SoC):
 *   1. Zod: validate { message } — string, 1–500 chars
 *   2. Delegate to rag.service.generateResponse()
 *   3. Return { success, data: { role, content }, error }
 *
 * DOES NOT: know about Gemini, vector search, or LangChain.
 */

"use strict";

const { z } = require("zod");
const { generateResponse } = require("../services/rag/rag.service");

const chatSchema = z.object({
  message: z
    .string({ required_error: "Message is required." })
    .min(1, "Message cannot be empty.")
    .max(500, "Message must not exceed 500 characters."),
});

const handleChatMessage = async (req, res) => {
  // 1. Validate
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    const message = parsed.error.errors.map((e) => e.message).join(" ");
    return res.status(400).json({
      success: false,
      data: null,
      error: { code: "VALIDATION_ERROR", message },
    });
  }

  // 2. Generate RAG response
  try {
    const response = await generateResponse(parsed.data.message);
    return res.status(200).json({
      success: true,
      data: response,  // { role: "assistant", content: string }
      error: null,
    });
  } catch (err) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      layer: "CONTROLLER",
      module: "chat.controller.js",
      error_message: err.message,
      stack_trace: err.stack,
    }));
    return res.status(503).json({
      success: false,
      data: null,
      error: {
        code: "AI_SERVICE_UNAVAILABLE",
        message: "The AI assistant is temporarily unavailable. Please try again shortly.",
      },
    });
  }
};

module.exports = { handleChatMessage };
