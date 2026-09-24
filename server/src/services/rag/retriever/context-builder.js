/**
 * @file services/rag/retriever/context-builder.js
 * @description Context retrieval and formatting layer for RAG.
 */

"use strict";

const { similaritySearch } = require("../vector/vector-store");

/**
 * Retrieves relevant chunks and formats them into a single context string.
 * Handles missing or failed vector search gracefully.
 *
 * @param {string} userQuery
 * @returns {Promise<string>} The formatted context block.
 */
async function getContextBlock(userQuery) {
  let contextChunks = [];

  try {
    console.log(`Step 1: Searching for relevant context for query: "${userQuery}"`);
    const docs = await similaritySearch(userQuery, 4);
    contextChunks = docs.map((d) => d.pageContent);
    console.log(`Step 2: Mongodb Atlas returned ${contextChunks?.length || 0} context chunks for the query.`);

    if (docs && docs.length > 0) {
      console.log(`Step 3: Retrieved context chunks:\n${contextChunks.map((c, i) => `[${i + 1}] ${c.substring(0, 100)}...`).join("\n")}`);
    } else {
      console.log("Step 3: ERROR: Vector search returned no relevant context for the query. Proceeding with an empty context.");
    }
  } catch (err) {
    const errorDetail = {
      timestamp: new Date().toISOString(),
      layer: "SERVICE",
      module: "context-builder.js — similaritySearch",
      error_name: err.name,
      error_message: err.message,
      http_status: err.status ?? err.statusCode ?? err.response?.status ?? "N/A",
      stack_trace: err.stack,
    };
    console.error("\n[RAG] ❌ SIMILARITY SEARCH FAILED — full error below:");
    console.error(JSON.stringify(errorDetail, null, 2));
    console.error("[RAG] ⚠️  Proceeding with empty context. Response quality will be degraded.\n");
  }

  const contextBlock =
    contextChunks.length > 0
      ? `CONTEXT FROM KNOWLEDGE BASE:\n${contextChunks.map((c, i) => `[${i + 1}] ${c}`).join("\n\n")}`
      : "CONTEXT: No specific context found. Answer from general knowledge about Manish Yadav's portfolio.";

  return contextBlock;
}

module.exports = { getContextBlock };
