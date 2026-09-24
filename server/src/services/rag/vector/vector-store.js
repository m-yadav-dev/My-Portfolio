/**
 * @file services/rag/vector/vector-store.js
 * @description LangChain MongoDB Atlas Vector Search integration.
 *
 * SPEC CONFIG:
 *   - Collection : portfolio_context  (in the "portfolio" database)
 *   - Index name : portfolio_vector_index  (must be created in Atlas UI)
 *   - Dimensions : 3072  (gemini-embedding-001 output)
 *   - Similarity : cosine
 *
 * ATLAS VECTOR SEARCH INDEX (create in Atlas UI → Search → Create Index):
 * {
 *   "fields": [{
 *     "type": "vector",
 *     "path": "embedding",
 *     "numDimensions": 3072,
 *     "similarity": "cosine"
 *   }]
 * }
 *
 * Exports:
 *   addDocuments(docs)          → embed + store LangChain Documents
 *   similaritySearch(query, k)  → top-k relevant Document[]
 *   closeVectorClient()         → graceful teardown for the indexer CLI
 */

"use strict";

const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb");
const { embeddings } = require("../embeddings/embeddings");
const { getNativeClient, closeVectorClient } = require("./db-client");

const COLLECTION_NAME = "portfolio_context";
const INDEX_NAME = "portfolio_vector_index";
const TOP_K_DEFAULT = 4;

// ---------------------------------------------------------------------------
// getVectorStore — builds a live MongoDBAtlasVectorSearch instance
// ---------------------------------------------------------------------------
async function getVectorStore() {
  const client = await getNativeClient();
  const collection = client.db("portfolio").collection(COLLECTION_NAME);
  return new MongoDBAtlasVectorSearch(embeddings, {
    collection,
    indexName: INDEX_NAME,
    textKey: "text",
    embeddingKey: "embedding",
  });
}

// ---------------------------------------------------------------------------
// addDocuments — embed + store chunks during indexing
// ---------------------------------------------------------------------------
async function addDocuments(documents) {
  const store = await getVectorStore();

  await store.addDocuments(documents);
  console.log(`[VectorStore] ✅ Stored ${documents.length} chunks → '${COLLECTION_NAME}'`);
}

// ---------------------------------------------------------------------------
// similaritySearch — retrieve top-k relevant chunks for a user query
// ---------------------------------------------------------------------------
async function similaritySearch(query, k = TOP_K_DEFAULT) {
  const store = await getVectorStore();
  return store.similaritySearch(query, k);
}

module.exports = { addDocuments, similaritySearch, closeVectorClient };
