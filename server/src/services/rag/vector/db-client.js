/**
 * @file services/rag/vector/db-client.js
 * @description Native MongoDB client for vector search operations.
 *
 * NOTE ON DRIVER COMPATIBILITY:
 *   @langchain/mongodb requires mongodb driver v5+ (collection.db.client).
 *   Mongoose 6 bundles mongodb v4 where collection.db is undefined.
 *   This module therefore manages its OWN native MongoClient (v6) for vector
 *   operations, completely separate from the Mongoose ODM connection.
 */

"use strict";

const { MongoClient } = require("mongodb");
const env = require("../../../config/env");

// ---------------------------------------------------------------------------
// Singleton native MongoClient — shared across the lifetime of the process
// ---------------------------------------------------------------------------
let _client = null;
let _clientProm = null;

async function getNativeClient() {
  if (_client) return _client;
  if (_clientProm) return _clientProm;

  _clientProm = (async () => {
    const client = new MongoClient(env.MONGODB_URI);
    await client.connect();
    _client = client;
    return client;
  })();

  return _clientProm;
}

// ---------------------------------------------------------------------------
// closeVectorClient — called by the indexer CLI for clean teardown
// ---------------------------------------------------------------------------
async function closeVectorClient() {
  if (_client) {
    await _client.close();
    _client = null;
    _clientProm = null;
  }
}

module.exports = { getNativeClient, closeVectorClient };
