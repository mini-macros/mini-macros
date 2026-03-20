import type { Macro } from "./types";
import type { JSONContent } from "@tiptap/react";

// handle JSON compression
export async function compressJson(json: string): Promise<string> {
  try {
    const stream = new Blob([json], {
      type: "application/json",
    }).stream();
    const compressedReadableStream = stream.pipeThrough(
      new CompressionStream("gzip"),
    );
    const blob = await new Response(compressedReadableStream).blob();
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    let binary = "";
    for (const bit of bytes) {
      binary += String.fromCharCode(bit);
    }

    const compressedBase64 = btoa(binary);

    return compressedBase64;
  } catch (e: unknown) {
    throw new Error(`Unable to compress JSON data: ${e as string}`);
  }
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
    const date = new Date(value as string);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date for Macro type key: ${key}`);
    }
    return date;
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
  if (!b64 || typeof b64 !== "string") {
    throw new Error(`Expected base64 string, received ${typeof b64}`);
  }

  try {
    const stream = new Blob([decodeB64(b64)], {
      type: "application/json",
    }).stream();

    const decompressedReadableStream = stream.pipeThrough(
      new DecompressionStream("gzip"),
    );

    const response = new Response(decompressedReadableStream);

    const blob: Blob = await response.blob();

    const blobText: string = await blob.text();

    if (!blobText) throw new Error("Decompressed text is empty");

    const data: Macro = JSON.parse(blobText, macroReviver) as Macro;

    return data;
  } catch (e: unknown) {
    throw new Error(`Unable to decompress base64 string: ${e as string}`);
  }
}
