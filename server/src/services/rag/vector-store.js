/**
 * @file services/rag/vector-store.js
 * @description LangChain MongoDB Atlas Vector Search integration.
 *
 * SPEC CONFIG:
 *   - Collection : portfolio_context  (in the "portfolio" database)
 *   - Index name : portfolio_vector_index  (must be created in Atlas UI — see README)
 *   - Dimensions : 768  (embedding-001 output)
 *   - Similarity : cosine
 *
 * ATLAS VECTOR SEARCH INDEX JSON (create in Atlas UI → Search → Create Index):
 * {
 *   "fields": [{
 *     "type": "vector",
 *     "path": "embedding",
 *     "numDimensions": 768,
 *     "similarity": "cosine"
 *   }]
 * }
 *
 * Exports:
 *   getVectorStore()   → returns a live MongoDBAtlasVectorSearch instance
 *   addDocuments(docs) → store LangChain Document[] into the collection
 *   similaritySearch(query, k) → returns top-k relevant Document[]
 */

"use strict";

const mongoose = require("mongoose");
const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb");
const { embeddings } = require("./embeddings");

const COLLECTION_NAME  = "documents";
const INDEX_NAME       = "portfolio_vector_index";
const TOP_K_DEFAULT    = 4;

// ---------------------------------------------------------------------------
// Get a live MongoDBAtlasVectorSearch instance using the active mongoose conn
// ---------------------------------------------------------------------------
function getVectorStore() {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("MongoDB not connected. Ensure connectDB() ran before RAG operations.");
  }
  const collection = mongoose.connection.db.collection(COLLECTION_NAME);
  return new MongoDBAtlasVectorSearch(embeddings, {
    collection,
    indexName:    INDEX_NAME,
    textKey:      "text",
    embeddingKey: "embedding",
  });
}

// ---------------------------------------------------------------------------
// addDocuments — store chunks during indexing
// ---------------------------------------------------------------------------
async function addDocuments(documents) {
  const store = getVectorStore();
  await store.addDocuments(documents);
  console.log(`[VectorStore] Stored ${documents.length} document chunks into '${COLLECTION_NAME}'.`);
}

// ---------------------------------------------------------------------------
// similaritySearch — retrieve top-k relevant chunks for a query
// ---------------------------------------------------------------------------
async function similaritySearch(query, k = TOP_K_DEFAULT) {
  const store = getVectorStore();
  const results = await store.similaritySearch(query, k);
  return results; // Array of LangChain Document { pageContent, metadata }
}

module.exports = { addDocuments, similaritySearch };
