import { expect, test, beforeEach } from "vitest";
import type { Macro } from "../types";
import * as ops from "../macro-ops";

beforeEach(() => localStorage.clear());

test("createMacro adds indexes to localStorage, getMacroIndexes retrieves them", async () => {
  let macrosMockIndexes: string[] = [];
  for (const macro of macrosMock) {
    expect(
      await ops.createMacro({
        id: macro.id,
        title: macro.title,
        content: macro.content,
      }),
    );
    macrosMockIndexes = [...macrosMockIndexes, macro.id];
  }

  expect(localStorage.getItem(ops.INDEX_KEY)).not.toBeNull();
  expect(ops.getMacroIndexes()).toEqual(macrosMockIndexes);
});

test("createMacro adds macro data, getMacros retrieves it in a list", async () => {
  expect(
    await ops.createMacro({
      id: macrosMock[0].id,
      title: macrosMock[0].title,
      content: macrosMock[0].content,
    }),
  );
  const retrievedMacros = await ops.getMacros();

  expect(retrievedMacros.length == 1);
  expect(retrievedMacros[0].title).toEqual(macrosMock[0].title);
  expect(retrievedMacros[0].content).toEqual(macrosMock[0].content);
});

test("createMacro adds macros to localStorage, getMacroById retrieves specific macro", async () => {
  for (const macro of macrosMock) {
    expect(
      await ops.createMacro({
        id: macro.id,
        title: macro.title,
        content: macro.content,
      }),
    );
  }
  const retrievedMacro: Macro | null = await ops.getMacroById(macrosMock[0].id);

  expect(retrievedMacro).not.toBeNull();
  expect(retrievedMacro?.id).toEqual(macrosMock[0].id);
  expect(retrievedMacro?.title).toEqual(macrosMock[0].title);
  expect(retrievedMacro?.content).toEqual(macrosMock[0].content);
});

test("createMacro adds macro data to localStorage, updateMacroById updates it", async () => {
  expect(
    await ops.createMacro({
      id: macrosMock[0].id,
      title: macrosMock[0].title,
      content: macrosMock[0].content,
    }),
  );
  const oldMacroMockData: string | null = localStorage.getItem(
    `macro:${macrosMock[0].id}`,
  );
  expect(oldMacroMockData).not.toBeNull();

  expect(
    await ops.updateMacroById(macrosMock[0].id, {
      title: macrosMock[1].title,
      content: macrosMock[1].content,
      updatedAt: new Date(Date.now()),
    }),
  );
  const newMacroMockData: string | null = localStorage.getItem(
    `macro:${macrosMock[0].id}`,
  );
  expect(newMacroMockData).not.toBeNull();

  expect(newMacroMockData).not.toEqual(oldMacroMockData);
});

test("createMacro adds macro data to localStorage, deleteMacroById removes it", async () => {
  expect(
    await ops.createMacro({
      id: macrosMock[0].id,
      title: macrosMock[0].title,
      content: macrosMock[0].content,
    }),
  );
  const macroMockData: string | null = localStorage.getItem(
    `macro:${macrosMock[0].id}`,
  );

  expect(macroMockData).not.toBeNull();

  expect(ops.deleteMacroById(macrosMock[0].id));
  const afterDelMacroMockData: string | null = localStorage.getItem(
    `macro:${macrosMock[0].id}`,
  );
  expect(afterDelMacroMockData).toBeNull();
});

test("createMacro adds macros to localStorage, getMacroByTitle retrieves specific macro", async () => {
  for (const macro of macrosMock) {
    expect(
      await ops.createMacro({
        id: macro.id,
        title: macro.title,
        content: macro.content,
      }),
    );
  }

  const retrievedMacro: Macro | null = await ops.getMacroByTitle(
    macrosMock[0].title,
  );

  expect(retrievedMacro).not.toBeNull();
  expect(retrievedMacro?.id).toEqual(macrosMock[0].id);
  expect(retrievedMacro?.title).toEqual(macrosMock[0].title);
  expect(retrievedMacro?.content).toEqual(macrosMock[0].content);
});

test("createMacro doesn't add macros that are too large", async () => {
  const sizeInKb = 300 * 1024; // 300 KB
  const randomContent = Array.from(
    { length: sizeInKb },
    () => Math.random().toString(36)[2],
  ).join("");
  const creationResult = await ops.createMacro({
    id: macrosMock[0].id,
    title: macrosMock[0].title,
    content: randomContent,
  });
  expect(creationResult).toBe(false);
});

test("createMacro doesn't add macros if there are already too many", async () => {
  for (let i = 0; i <= ops.MACRO_COUNT_LIMIT; i++) {
    expect(ops.addIndex(i.toString()));
  }

  const creationResult = await ops.createMacro({
    id: macrosMock[0].id,
    title: macrosMock[0].title,
    content: macrosMock[0].content,
  });
  expect(creationResult).toBe(false);
});

const macrosMock: Macro[] = [
  {
    id: "1",
    title: "test macro 1",
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"new content for test 1"}]}]}',
    clickCount: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: "2",
    title: "test macro 2",
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"new content for test 2"}]}]}',
    clickCount: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: "3",
    title: "test macro 3",
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"new content for test 3"}]}]}',
    clickCount: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: "4",
    title: "test macro 4",
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"new content for test 4"}]}]}',
    clickCount: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];
