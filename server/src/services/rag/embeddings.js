/**
 * @file services/rag/embeddings.js
 * @description Google Generative AI embeddings configuration.
 *
 * Exports a ready-to-use GoogleGenerativeAIEmbeddings instance.
 * This is the SINGLE source of the embedding model configuration —
 * consumed by vector-store.js (document storage + similarity search).
 *
 * SPEC:
 *   - Model: embedding-001 (produces 768-dimensional vectors)
 *   - Provider: Google Generative AI (@langchain/google-genai)
 *   - Similarity: Cosine (configured at the Atlas Vector Search index level)
 */

"use strict";

const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const env = require("../../config/env");

/**
 * Shared embeddings instance — instantiated once, reused everywhere.
 * TaskType.RETRIEVAL_DOCUMENT for indexing; RETRIEVAL_QUERY for querying.
 * LangChain handles the task type selection internally.
 */
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: env.GEMINI_API_KEY,
  model: "embedding-001", // 768 dimensions, spec-mandated
});

module.exports = { embeddings };
