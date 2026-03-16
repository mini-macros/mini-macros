import type { Macro } from "./types";
import type { JSONContent } from "@tiptap/react";

// handle JSON compression
export async function compressJson(json: string): Promise<string> {
  const stream = new Blob([json], {
    type: "application/json",
  }).stream();

  const compressedReadableStream = stream.pipeThrough(
    new CompressionStream("gzip"),
  );

  const blob = await new Response(compressedReadableStream).blob();

  const buffer = await blob.arrayBuffer();

  const compressedBase64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

  return compressedBase64;
}

function decodeB64(b64: string): Uint8Array<ArrayBuffer> {
  const binary = window.atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(new ArrayBuffer(len));
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function macroReviver(key: string, value: unknown): unknown {
  if (key === "createdAt" || key === "updatedAt") {
    return new Date(value as string);
  }
  if (key === "clickCount") {
    return value as number;
  }
  if (key === "content") {
    return value as JSONContent;
  }
  return value as string;
}

export async function decompressB64(b64: string): Promise<Macro> {
  const stream = new Blob([decodeB64(b64)], {
    type: "application/json",
  }).stream();

  const decompressedReadableStream = stream.pipeThrough(
    new DecompressionStream("gzip"),
  );

  const response = new Response(decompressedReadableStream);

  const blob: Blob = await response.blob();

  const blobText: string = await blob.text();

  const data: Macro = JSON.parse(blobText, macroReviver) as Macro;

  return data;
}
