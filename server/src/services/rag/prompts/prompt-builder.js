/**
 * @file services/rag/prompts/prompt-builder.js
 * @description Responsible for composing the final prompt sent to the LLM.
 */

"use strict";

const { SYSTEM_PROMPT } = require("../../../prompts/prompt");

/**
 * Builds the final prompt string by combining the system prompt, retrieved context,
 * and the user's question.
 *
 * @param {string} userQuery
 * @param {string} contextBlock
 * @returns {string} The final grounded prompt.
 */
function buildPrompt(userQuery, contextBlock) {
  const fullPrompt = `${SYSTEM_PROMPT}\n\n${contextBlock}\n\nUSER QUESTION: ${userQuery}\n\nASSISTANT RESPONSE:`;
  console.log(`Generated prompt for Gemini:\n${fullPrompt}`);
  return fullPrompt;
}

module.exports = { buildPrompt };
