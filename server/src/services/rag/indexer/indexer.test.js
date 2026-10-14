"use strict";

jest.mock("mongoose", () => ({ connection: { close: jest.fn() } }));
jest.mock("../../../config/db", () => ({ connectDB: jest.fn() }));
jest.mock("../vector/vector-store", () => ({
  addDocuments: jest.fn(),
  ensureVectorIndex: jest.fn(),
  closeVectorClient: jest.fn(),
  similaritySearch: jest.fn(),
}));
jest.mock("../embeddings/embeddings", () => ({
  embeddings: { embedQuery: jest.fn() },
}));
jest.mock("../generator/llm", () => ({ generateCompletion: jest.fn() }));

const { runIndexer, loadMarkdownFiles } = require("./indexer");
const { connectDB } = require("../../../config/db");
const { addDocuments, ensureVectorIndex, closeVectorClient, similaritySearch } = require("../vector/vector-store");
const { embeddings } = require("../embeddings/embeddings");
const { generateCompletion } = require("../generator/llm");
const mongoose = require("mongoose");
const { generateResponse } = require("../rag.service");

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "log").mockImplementation(() => {});
  embeddings.embedQuery.mockResolvedValue(Array(3072).fill(0.01));
});

afterEach(() => jest.restoreAllMocks());

test("importing the indexer does not open a database or start ingestion", () => {
  expect(connectDB).not.toHaveBeenCalled();
  expect(addDocuments).not.toHaveBeenCalled();
});

test("loads the real knowledge-base files independently of the working directory", () => {
  const initialCwd = process.cwd();
  let files;
  try {
    process.chdir(__dirname);
    files = loadMarkdownFiles();
  } finally {
    process.chdir(initialCwd);
  }
  expect(files.map(file => file.source).sort()).toEqual(["about.md", "hiring.md", "projects.md", "skills.md"]);
  expect(files.every(file => file.content.trim().length > 0)).toBe(true);
  expect(files.find(file => file.source === "about.md").content).toContain("MERN Stack Developer and AI Integration Engineer");
});

test("indexes all data sources after embedding preflight and index setup", async () => {
  await runIndexer();
  const documents = addDocuments.mock.calls[0][0];
  expect([...new Set(documents.map(doc => doc.metadata.source))].sort()).toEqual(["about.md", "hiring.md", "projects.md", "skills.md"]);
  expect(documents.every(doc => doc.pageContent.length > 0 && doc.pageContent.length <= 500)).toBe(true);
  expect(embeddings.embedQuery).toHaveBeenCalledWith(documents[0].pageContent);
  expect(ensureVectorIndex).toHaveBeenCalledTimes(1);
  expect(ensureVectorIndex.mock.invocationCallOrder[0]).toBeLessThan(addDocuments.mock.invocationCallOrder[0]);
  expect(closeVectorClient).toHaveBeenCalledTimes(1);
  expect(mongoose.connection.close).toHaveBeenCalledTimes(1);
});

test("does not write documents when embedding preflight returns an empty vector", async () => {
  embeddings.embedQuery.mockResolvedValue([]);
  await expect(runIndexer()).rejects.toThrow("empty vector");
  expect(addDocuments).not.toHaveBeenCalled();
  expect(ensureVectorIndex).not.toHaveBeenCalled();
  expect(closeVectorClient).toHaveBeenCalledTimes(1);
  expect(mongoose.connection.close).toHaveBeenCalledTimes(1);
});

test("passes retrieved core-skill evidence from the actual data into the model prompt", async () => {
  await runIndexer();
  const documents = addDocuments.mock.calls[0][0];
  const evidence = documents.find(doc => doc.metadata.source === "about.md" && doc.pageContent.includes("MERN Stack Developer and AI Integration Engineer"));
  expect(evidence).toBeDefined();
  similaritySearch.mockResolvedValue([evidence]);
  generateCompletion.mockResolvedValue("test completion");
  const question = "What is the core skill of Manish Yadav?";
  await expect(generateResponse(question)).resolves.toEqual({ role: "assistant", content: "test completion" });
  expect(similaritySearch).toHaveBeenCalledWith(question, 4);
  const prompt = generateCompletion.mock.calls[0][0];
  expect(prompt).toContain("CONTEXT FROM KNOWLEDGE BASE:");
  expect(prompt).toContain(evidence.pageContent);
  expect(prompt).toContain(`USER QUESTION: ${question}`);
  expect(prompt).not.toContain("No specific context found");
});
