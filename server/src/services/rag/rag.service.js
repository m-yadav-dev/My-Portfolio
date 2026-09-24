"use strict";

const { getContextBlock } = require("./retriever/context-builder");
const { buildPrompt } = require("./prompts/prompt-builder");
const { generateCompletion } = require("./generator/llm");

// ---------------------------------------------------------------------------
// generateResponse — the single exported function
// ---------------------------------------------------------------------------
async function generateResponse(userQuery) {
  // 1. Retrieve relevant context chunks and build the context block
  const contextBlock = await getContextBlock(userQuery);

  // 2. Compose grounded prompt
  const fullPrompt = buildPrompt(userQuery, contextBlock);

  // 3. Generate with LLM
  const text = await generateCompletion(fullPrompt);
  console.log(`Response generated for query: "${userQuery}" → "${text}"`);

  return { role: "assistant", content: text };
}

module.exports = { generateResponse };
