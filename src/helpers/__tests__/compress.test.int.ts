import { expect, test } from "vitest";
import type { Macro } from "../types";
import { compressJson, decompressB64 } from "../compress";

const macroMock: Macro = {
  id: crypto.randomUUID(),
  title: "test macro",
  content:
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"new content for test"}]}]}',
  clickCount: 0,
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
};

const macroMockJson = JSON.stringify(macroMock);

test("data compresses successfully", async () => {
  const compressedToB64 = await compressJson(macroMockJson);
  const originalSize = new Blob([macroMockJson]).size;
  const compressedSize = new Blob([compressedToB64]).size;

  expect(originalSize < compressedSize);
});

test("data compresses then decompresses without data loss", async () => {
  const compressedToB64 = await compressJson(macroMockJson);
  const decompressedToMacro = await decompressB64(compressedToB64);

  expect(decompressedToMacro === macroMock);
});
