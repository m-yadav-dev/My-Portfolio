/**
 * @file services/rag/embeddings.js
 * @description Google Generative AI embeddings configuration.
 *
 * Exports a ready-to-use GoogleGenerativeAIEmbeddings instance.
 * This is the SINGLE source of the embedding model configuration —
 * consumed by vector-store.js (document storage + similarity search).
 *
 * SPEC:
 *   - Model: gemini-embedding-001 (3072-dimensional vectors — v1 stable endpoint)
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
  model: "gemini-embedding-001", // v1 stable endpoint — 3072 dimensions (embedding-001 and text-embedding-004 are 404 on v1beta)
});

module.exports = { embeddings };
