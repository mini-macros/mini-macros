import type { Macro } from "../types/types";
import { type MacroError, MacroErrorCode, AppError } from "../types/errors";
import { compressJson, decompressB64 } from "./compress";

export const INDEX_KEY = "macros:id";
const MACRO_SIZE_LIMIT = 250 * 1024; // 250 KB
export const MACRO_COUNT_LIMIT = 35;
const unknownErr: MacroError = {
  code: MacroErrorCode.UNHANDLED_EXCEPTION,
  msg: "Unknown error has occurred, please try again later.",
  cause: "",
};

// handle size and count verification
function approvedMacroSize(data: string): Error | null {
  const dataSize = new Blob([data]).size;
  if (dataSize > MACRO_SIZE_LIMIT) {
    const err: MacroError = {
      code: MacroErrorCode.CONTENT_TOO_LARGE,
      msg: "Macro was too large after compression, consider removing content or upgrading plan.",
      cause: `Compressed macro data exceeds ${MACRO_SIZE_LIMIT / 1024} KB limit.`,
    };
    return new AppError(err);
  }
  return null;
}

function approvedMacroCount(): Error | null {
  const indexes = getMacroIndexes();
  if (indexes.length >= MACRO_COUNT_LIMIT) {
    const err: MacroError = {
      code: MacroErrorCode.MACRO_LIMIT_REACHED,
      msg: "You've reached your macro limit. Consider deleting unused macros or upgrading plan.",
      cause: `Macro limit of ${MACRO_COUNT_LIMIT} exceeded for free tier plan.`,
    };
    return new AppError(err);
  }
  return null;
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
export function addIndex(id: string): Error | null {
  try {
    const indexes = getMacroIndexes();
    if (indexes.includes(id)) return null;

    const newIndexes = [...indexes, id];
    localStorage.setItem(INDEX_KEY, newIndexes.join(","));

    return null;
  } catch (e: unknown) {
    return new AppError({ ...unknownErr, cause: e as string });
  }
}

export async function createMacro(
  macro: Pick<Macro, "id" | "title" | "content">,
): Promise<Error | null> {
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

    let err = approvedMacroSize(compressedMacro);
    if (err != null) {
      return err;
    }

    err = approvedMacroCount();
    if (err != null) {
      return err;
    }

    err = addIndex(macro.id);
    if (err != null) {
      return err;
    }

    localStorage.setItem(`macro:${macro.id}`, compressedMacro);

    return null;
  } catch (e: unknown) {
    return new AppError({ ...unknownErr, cause: e as string });
  }
}

export async function updateMacroById(
  id: string,
  updates: Partial<Macro>,
): Promise<Error | null> {
  try {
    const prevMacro = await getMacroById(id);
    const updatedMacro = { ...prevMacro, ...updates };

    const updatedJson = JSON.stringify(updatedMacro);

    const compressedMacro = await compressJson(updatedJson);
    const err = approvedMacroSize(compressedMacro);
    if (err != null) {
      return err;
    }
    localStorage.setItem(`macro:${id}`, compressedMacro);
    return null;
  } catch (e: unknown) {
    return new AppError({ ...unknownErr, cause: e as string });
  }
}

// handle delete operations
export function deleteMacroById(id: string): Error | null {
  try {
    const indexes = getMacroIndexes();
    if (!indexes.includes(id)) {
      const err: MacroError = {
        code: MacroErrorCode.MACRO_NOT_FOUND,
        msg: "Macro deletion attempt failed because the macro does not exist.",
        cause: `Macro ${id} was queued for deletion but not found`,
      };
      return new AppError(err);
    }
    const newIndexes = indexes.splice(indexes.indexOf(id), 1);
    localStorage.setItem(INDEX_KEY, newIndexes.join(","));

    localStorage.removeItem(`macro:${id}`);

    return null;
  } catch (e: unknown) {
    return new AppError({ ...unknownErr, cause: e as string });
  }
}
