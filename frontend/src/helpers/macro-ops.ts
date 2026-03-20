import type { Macro } from "./types";
import { compressJson, decompressB64 } from "./compress";

export const INDEX_KEY = "macros:id";
const MACRO_SIZE_LIMIT = 250 * 1024; // 250 KB
export const MACRO_COUNT_LIMIT = 35;

// handle size and count verification
function approvedMacroSize(data: string): boolean {
  const dataSize = new Blob([data]).size;
  if (dataSize > MACRO_SIZE_LIMIT) return false;
  return true;
}

function approvedMacroCount(): boolean {
  const indexes = getMacroIndexes();
  if (indexes.length < MACRO_COUNT_LIMIT) return true;
  return false;
}

// handle read operations
export function getMacroIndexes(): string[] {
  try {
    const indexes = localStorage.getItem(INDEX_KEY);
    return indexes ? indexes.split(",") : [];
  } catch {
    return [];
  }
}

export async function getMacros(): Promise<Macro[]> {
  try {
    const indexes = getMacroIndexes();
    const macros = await Promise.all(indexes.map(getMacroById));
    return macros.filter((m: Macro | null) => m !== null);
  } catch {
    return [];
  }
}

export async function getMacroById(id: string): Promise<Macro | null> {
  try {
    const macroData = localStorage.getItem(`macro:${id}`);
    if (!macroData) return null;
    const macro = await decompressB64(macroData);

    return macro;
  } catch {
    return null;
  }
}

export async function getMacroByTitle(title: string): Promise<Macro | null> {
  try {
    const macros = await getMacros();
    return macros.find((m) => m.title === title) ?? null;
  } catch {
    return null;
  }
}

// handle create and update operations
export function addIndex(id: string): boolean {
  try {
    const indexes = getMacroIndexes();
    if (indexes.includes(id)) return true;

    const newIndexes = [...indexes, id];
    localStorage.setItem(INDEX_KEY, newIndexes.join(","));

    return true;
  } catch {
    return false;
  }
}

export async function createMacro(
  macro: Pick<Macro, "id" | "title" | "content">,
): Promise<boolean> {
  try {
    const newMacro: Macro = {
      id: macro.id,
      title: macro.title,
      content: macro.content,
      clickCount: 0,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };
    const macroJson = JSON.stringify(newMacro);

    const compressedMacro = await compressJson(macroJson);
    if (!approvedMacroSize(compressedMacro)) return false;

    if (!approvedMacroCount()) return false;

    const idAdded = addIndex(macro.id);
    if (!idAdded) return false;

    localStorage.setItem(`macro:${macro.id}`, compressedMacro);

    return true;
  } catch {
    return false;
  }
}

export async function updateMacroById(
  id: string,
  updates: Partial<Macro>,
): Promise<boolean> {
  try {
    const prevMacro = await getMacroById(id);
    const updatedMacro = { ...prevMacro, ...updates };

    const updatedJson = JSON.stringify(updatedMacro);

    const compressedMacro = await compressJson(updatedJson);
    if (!approvedMacroSize(compressedMacro)) return false;
    localStorage.setItem(`macro:${id}`, compressedMacro);
    return true;
  } catch {
    return false;
  }
}

// handle delete operations
export function deleteMacroById(id: string): boolean {
  try {
    const indexes = getMacroIndexes();
    if (indexes.includes(id)) {
      const newIndexes = indexes.splice(indexes.indexOf(id), 1);
      localStorage.setItem(INDEX_KEY, newIndexes.join(","));

      localStorage.removeItem(`macro:${id}`);
      return true;
    }
    return false;
  } catch (e: unknown) {
    throw new Error(`Unable to delete macro with id, ${id}: ${e as string}`);
  }
}
