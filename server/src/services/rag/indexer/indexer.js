/**
 * @file services/rag/indexer/indexer.js
 * @description Knowledge base ingestion pipeline — standalone CLI script.
 *
 * FLOW:
 *   1. connectDB()          — open MongoDB Atlas connection
 *   2. loadMarkdownFiles()  — read all *.md from server/data/
 *   3. split                — 500-char chunks / 50-char overlap (spec)
 *   4. addDocuments()       — embed via Gemini + store in Atlas Vector Search
 *   5. mongoose.close()     — graceful teardown so the process exits cleanly
 *
 * USAGE (run once after content changes):
 *   npm run index:kb
 *
 * SPEC CHUNKING: 500 chars / 50 overlap → optimal for Gemini embedding-001
 */

"use strict";

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { Document } = require("@langchain/core/documents");
const { addDocuments, ensureVectorIndex, closeVectorClient } = require("../vector/vector-store");
const { connectDB } = require("../../../config/db"); // ← named export, destructured correctly

const DATA_DIR = path.resolve(__dirname, "../../../../data"); // server/data/
const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 50;

// ---------------------------------------------------------------------------
// loadMarkdownFiles — read all .md files into { content, source } objects
// ---------------------------------------------------------------------------
function loadMarkdownFiles() {
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".md"));
  if (files.length === 0) throw new Error(`No .md files found in ${DATA_DIR}`);
  return files.map((filename) => ({
    source: filename,
    content: fs.readFileSync(path.join(DATA_DIR, filename), "utf-8"),
  }));
}

// ---------------------------------------------------------------------------
// runIndexer — establishes DB connection, ingests, then closes connection.
// ---------------------------------------------------------------------------
async function runIndexer() {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║   📚  Knowledge Base Ingestion Started   ║");
  console.log("╚══════════════════════════════════════════╝\n");

  // 1. Connect to MongoDB Atlas FIRST — vector-store.js needs a live connection
  await connectDB();
  console.log("[DB]     ✅ MongoDB Atlas Connected\n");

  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
    });

    // 2. Load markdown files
    const rawFiles = loadMarkdownFiles();
    console.log(`[Indexer] Loaded ${rawFiles.length} file(s) from: ${DATA_DIR}`);

    // 3. Split and wrap as LangChain Documents
    const documents = [];
    for (const { source, content } of rawFiles) {
      const chunks = await splitter.splitText(content);
      const docs = chunks.map(
        (chunk) => new Document({
          pageContent: chunk,
          metadata: { source, ingested_at: new Date().toISOString() },
        })
      );
      documents.push(...docs);
      console.log(`[Indexer]  → ${source}: ${docs.length} chunk(s)`);
    }

    console.log(`\n[Indexer] Total chunks to embed & store: ${documents.length}`);

    // 4. PRE-FLIGHT VALIDATION — verify Gemini embedding API before writing to Atlas.
    //    A silent 404 or empty vector would corrupt every document; fail fast instead.
    console.log("[Indexer] Running embedding pre-flight check on 1 sample chunk…");
    const { embeddings: embeddingsModel } = require("../embeddings/embeddings");
    const testVector = await embeddingsModel.embedQuery(documents[0].pageContent);

    if (!testVector || testVector.length === 0) {
      throw new Error(
        "Fatal: Embedding pre-flight returned an empty vector. " +
        "Check your GEMINI_API_KEY and model name. Aborting ingestion to prevent data corruption."
      );
    }
    console.log(`[Indexer] ✅ Pre-flight passed — vector dimension: ${testVector.length}`);

    // 5. Ensure Atlas can search the stored embeddings, then ingest the chunks.
    await ensureVectorIndex();
    await addDocuments(documents);

    console.log("\n╔══════════════════════════════════════════╗");
    console.log("║   ✅  Ingestion Complete                  ║");
    console.log("╚══════════════════════════════════════════╝\n");
  } finally {
    // 5. Close BOTH connections so the process exits cleanly
    await closeVectorClient();               // native MongoClient (vector store)
    await mongoose.connection.close();       // mongoose ODM connection
    console.log("[DB]     🔌 All connections closed.\n");
  }
}

// ---------------------------------------------------------------------------
// Auto-run only when executed directly; importing must not start ingestion.
// ---------------------------------------------------------------------------
if (require.main === module) {
  runIndexer().catch((err) => {
    console.error("\n[Indexer] ❌ Fatal error during ingestion:");
    console.error(err.message);
    console.error(err.stack);
    mongoose.connection.close().finally(() => process.exit(1));
  });
}

module.exports = { runIndexer, loadMarkdownFiles };
