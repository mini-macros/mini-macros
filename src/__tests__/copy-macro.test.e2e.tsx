import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { expect, test, beforeEach } from "vitest";
import App from "../App";
import { getMacroByTitle } from "../utils/macro-crud";

beforeEach(() => localStorage.clear());

test("create macro and copy its contents", async () => {
  await render(<App />);
  window.focus();
  await navigator.clipboard.writeText("");
  const sampleTitle = "my title";
  const sampleContent = "very cool content";

  const createMacroBtn = page.getByTitle("Create Macro");
  await createMacroBtn.click();

  const titleBox = page.getByPlaceholder("My Macro");
  await titleBox.fill(sampleTitle);

  const editor = page.getByTestId("editor");
  await editor.fill(sampleContent);

  const saveBtn = page.getByRole("button", { name: "Save" });
  await saveBtn.click();

  const createdMacro = page.getByRole("button", {
    name: sampleTitle,
    exact: true,
  });
  await expect.element(createdMacro).not.toBeNull();

  await expect(getMacroByTitle(sampleTitle)).resolves.not.toBeFalsy();

  await createdMacro.click();
  const clipboardContents = await navigator.clipboard.readText();
  expect(clipboardContents).toEqual(sampleContent);
});

test("create macro and copy content from dropdown", async () => {
  await render(<App />);
  window.focus();
  await navigator.clipboard.writeText("");
  const sampleTitle = "my title";
  const sampleContent = "very cool content";

  const createMacroBtn = page.getByTitle("Create Macro");
  await createMacroBtn.click();

  const titleBox = page.getByPlaceholder("My Macro");
  await titleBox.fill(sampleTitle);

  const editor = page.getByTestId("editor");
  await editor.fill(sampleContent);

  const saveBtn = page.getByRole("button", { name: "Save" });
  await saveBtn.click();

  const createdMacro = page.getByRole("button", {
    name: sampleTitle,
    exact: true,
  });
  await expect.element(createdMacro).not.toBeNull();

  await expect(getMacroByTitle(sampleTitle)).resolves.not.toBeFalsy();

  const dropdownBtn = page.getByTitle(sampleTitle + " Dropdown");
  await dropdownBtn.click();

  const copyBtn = page.getByRole("button", { name: "Copy" });
  await expect.element(copyBtn).toBeVisible();

  await copyBtn.click();
  const clipboardContents = await navigator.clipboard.readText();
  expect(clipboardContents).toEqual(sampleContent);
});

test("create multiple macros and copy the contents of one with a click", async () => {
  await render(<App />);
  window.focus();
  await navigator.clipboard.writeText("");
  const testMacros = [
    {
      title: "cool title",
      content: "cool content",
    },
    {
      title: "very nice title",
      content: "very nice content",
    },
    {
      title: "silly title",
      content: "silly content",
    },
    {
      title: "last title",
      content: "last content",
    },
  ];

  for (const macro of testMacros) {
    const createMacroBtn = page.getByTitle("Create Macro");
    await createMacroBtn.click();

    const titleBox = page.getByPlaceholder("My Macro");
    await titleBox.fill(macro.title);

    const editor = page.getByTestId("editor");
    await editor.fill(macro.content);

    const saveBtn = page.getByRole("button", { name: "Save" });
    await saveBtn.click();

    const createdMacro = page.getByRole("button", {
      name: macro.title,
      exact: true,
    });
    await expect.element(createdMacro).not.toBeNull();

    await expect(getMacroByTitle(macro.title)).resolves.not.toBeFalsy();
  }

  const macroToCopy = page.getByRole("button", {
    name: testMacros[0].title,
    exact: true,
  });

  await macroToCopy.click();
  const clipboardContents = await navigator.clipboard.readText();
  expect(clipboardContents).toEqual(testMacros[0].content);
});

test("create multiple macros and copy the contents of one with dropdown button", async () => {
  await render(<App />);
  window.focus();
  await navigator.clipboard.writeText("");
  const testMacros = [
    {
      title: "cool title",
      content: "cool content",
    },
    {
      title: "very nice title",
      content: "very nice content",
    },
    {
      title: "silly title",
      content: "silly content",
    },
    {
      title: "last title",
      content: "last content",
    },
  ];

  for (const macro of testMacros) {
    const createMacroBtn = page.getByTitle("Create Macro");
    await createMacroBtn.click();

    const titleBox = page.getByPlaceholder("My Macro");
    await titleBox.fill(macro.title);

    const editor = page.getByTestId("editor");
    await editor.fill(macro.content);

    const saveBtn = page.getByRole("button", { name: "Save" });
    await saveBtn.click();

    const createdMacro = page.getByRole("button", {
      name: macro.title,
      exact: true,
    });
    await expect.element(createdMacro).not.toBeNull();

    await expect(getMacroByTitle(macro.title)).resolves.not.toBeFalsy();
  }

  const dropdownBtn = page.getByTitle(testMacros[0].title + " Dropdown");
  await dropdownBtn.click();

  const copyBtn = page.getByRole("button", { name: "Copy" });
  await expect.element(copyBtn).toBeVisible();

  await copyBtn.click();
  const clipboardContents = await navigator.clipboard.readText();
  expect(clipboardContents).toEqual(testMacros[0].content);
});
