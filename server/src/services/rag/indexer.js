/**
 * @file services/rag/indexer.js
 * @description Knowledge base ingestion pipeline.
 *
 * FLOW:
 *   1. Read all .md files from server/data/
 *   2. Split into 500-char chunks with 50-char overlap (spec)
 *   3. Wrap in LangChain Document objects with source metadata
 *   4. Pass to vector-store.addDocuments() for embedding + storage
 *
 * USAGE (run once after content changes):
 *   node -e "require('./src/services/rag/indexer').runIndexer()"
 *
 * SPEC CHUNKING: 500 chars / 50 overlap → optimal for Gemini embedding-001
 */

"use strict";

const fs   = require("fs");
const path = require("path");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { Document } = require("@langchain/core/documents");
const { addDocuments } = require("./vector-store");

const DATA_DIR    = path.resolve(__dirname, "../../../../data"); // server/data/
const CHUNK_SIZE  = 500;
const CHUNK_OVERLAP = 50;

// ---------------------------------------------------------------------------
// loadMarkdownFiles — read all .md files into { content, source } objects
// ---------------------------------------------------------------------------
function loadMarkdownFiles() {
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".md"));
  if (files.length === 0) throw new Error(`No .md files found in ${DATA_DIR}`);

  return files.map((filename) => ({
    source:  filename,
    content: fs.readFileSync(path.join(DATA_DIR, filename), "utf-8"),
  }));
}

// ---------------------------------------------------------------------------
// runIndexer — main export. Reads, splits, embeds, and stores all chunks.
// ---------------------------------------------------------------------------
async function runIndexer() {
  console.log("[Indexer] Starting knowledge base ingestion…");

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize:    CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });

  const rawFiles  = loadMarkdownFiles();
  console.log(`[Indexer] Loaded ${rawFiles.length} markdown files from ${DATA_DIR}`);

  const documents = [];

  for (const { source, content } of rawFiles) {
    const chunks = await splitter.splitText(content);
    const docs   = chunks.map(
      (chunk) =>
        new Document({
          pageContent: chunk,
          metadata: { source, ingested_at: new Date().toISOString() },
        })
    );
    documents.push(...docs);
    console.log(`[Indexer]  → ${source}: ${docs.length} chunks`);
  }

  console.log(`[Indexer] Total chunks to embed and store: ${documents.length}`);
  await addDocuments(documents);
  console.log("[Indexer] ✅ Ingestion complete.");
}

module.exports = { runIndexer };
