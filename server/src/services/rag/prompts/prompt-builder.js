/**
 * @file services/rag/prompts/prompt-builder.js
 * @description Responsible for composing the final prompt sent to the LLM.
 */

"use strict";

/**
 * Builds the user prompt from retrieved context and the user's question.
 * The generator supplies the response rules separately as system instructions.
 *
 * @param {string} userQuery
 * @param {string} contextBlock
 * @returns {string} The final grounded prompt.
 */
function buildPrompt(userQuery, contextBlock) {
  const fullPrompt = `${contextBlock}\n\nUSER QUESTION: ${userQuery}\n\nASSISTANT RESPONSE:`;
  console.log(`Generated prompt for Gemini:\n${fullPrompt}`);
  return fullPrompt;
}

module.exports = { buildPrompt };
