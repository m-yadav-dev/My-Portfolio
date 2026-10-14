/**
 * @file services/rag/generator/llm.js
 * @description Single responsibility: instantiates the LLM and executes text generation.
 */

"use strict";

const { GoogleGenAI } = require("@google/genai");
const env = require("../../../config/env");
const { SYSTEM_PROMPT } = require("../../../prompts/prompt");

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
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });

  console.log(`Result object from Gemini API: ${JSON.stringify(response)}`);
  const text = response.text.trim();
  return text;
}

module.exports = { generateCompletion };
