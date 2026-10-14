"use strict";

jest.mock("@langchain/mongodb", () => ({ MongoDBAtlasVectorSearch: jest.fn() }));
jest.mock("../embeddings/embeddings", () => ({ embeddings: {} }));
jest.mock("./db-client", () => ({ getNativeClient: jest.fn(), closeVectorClient: jest.fn() }));

const { ensureVectorIndex } = require("./vector-store");
const { getNativeClient } = require("./db-client");

test("creates a missing index using the collection's embedding field and model dimensions", async () => {
  const collection = {
    listSearchIndexes: jest.fn(() => ({ toArray: async () => [] })),
    createSearchIndex: jest.fn(),
  };
  const database = { collection: jest.fn(() => collection) };
  const client = { db: jest.fn(() => database) };
  getNativeClient.mockResolvedValue(client);
  const log = jest.spyOn(console, "log").mockImplementation(() => {});
  try {
    await ensureVectorIndex();
    expect(client.db).toHaveBeenCalledWith("portfolio");
    expect(database.collection).toHaveBeenCalledWith("portfolio_context");
    expect(collection.listSearchIndexes).toHaveBeenCalledWith("portfolio_vector_index");
    expect(collection.createSearchIndex).toHaveBeenCalledWith({
      name: "portfolio_vector_index",
      type: "vectorSearch",
      definition: { fields: [{ type: "vector", path: "embedding", numDimensions: 3072, similarity: "cosine" }] },
    });
  } finally {
    log.mockRestore();
  }
});

test("preserves an existing index without replacing it", async () => {
  const collection = {
    listSearchIndexes: jest.fn(() => ({ toArray: async () => [{ name: "portfolio_vector_index", status: "READY" }] })),
    createSearchIndex: jest.fn(),
  };
  getNativeClient.mockResolvedValue({ db: () => ({ collection: () => collection }) });
  await ensureVectorIndex();
  expect(collection.createSearchIndex).not.toHaveBeenCalled();
});
