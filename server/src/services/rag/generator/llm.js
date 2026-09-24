/**
 * @file services/rag/generator/llm.js
 * @description Single responsibility: instantiates the LLM and executes text generation.
 */

"use strict";

const { GoogleGenAI } = require("@google/genai");
const env = require("../../../config/env");

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

/**
 * Generates text using the configured LLM.
 *
 * @param {string} fullPrompt The complete, grounded prompt.
 * @returns {Promise<string>} The generated response text.
 */
async function generateCompletion(fullPrompt) {
  // Generate with Gemini 2.5 Flash-Lite (per existing logic)
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: fullPrompt,
  });

  console.log(`Result object from Gemini API: ${JSON.stringify(response)}`);
  const text = response.text.trim();
  return text;
}

module.exports = { generateCompletion };
