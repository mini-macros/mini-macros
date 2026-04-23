import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { expect, test, beforeEach } from "vitest";
import App from "../App";
import { getMacroByTitle } from "../utils/macro-crud";

beforeEach(() => localStorage.clear());

test("create macro and edit its content", async () => {
  await render(<App />);
  window.focus();
  await navigator.clipboard.writeText("");
  const sampleTitle = "my title";
  const sampleContent = "very cool content";
  const expectedContent = "even cooler content";

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

  const dropdownBtn = page.getByTitle(sampleTitle + " Dropdown");
  await dropdownBtn.click();

  const editBtn = page.getByRole("button", { name: "Edit" });
  await expect.element(editBtn).toBeVisible();
  await editBtn.click();

  await editor.fill(expectedContent);
  await saveBtn.click();

  await expect.element(createdMacro).not.toBeNull();

  await createdMacro.click();
  const newClipboardContents = await navigator.clipboard.readText();
  expect(newClipboardContents).toEqual(expectedContent);
});

test("create macro and edit its title", async () => {
  await render(<App />);
  window.focus();
  await navigator.clipboard.writeText("");
  const sampleTitle = "my title";
  const sampleContent = "very cool content";
  const expectedTitle = "new and improved title";

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

  const dropdownBtn = page.getByTitle(sampleTitle + " Dropdown");
  await dropdownBtn.click();

  const editBtn = page.getByRole("button", { name: "Edit" });
  await expect.element(editBtn).toBeVisible();
  await editBtn.click();

  const editTitleBox = page.getByTitle("macro-title");
  await editTitleBox.fill(expectedTitle);

  await saveBtn.click();

  const editedMacro = page.getByRole("button", {
    name: expectedTitle,
    exact: true,
  });
  await expect.element(editedMacro).not.toBeNull();

  await editedMacro.click();
  const newClipboardContents = await navigator.clipboard.readText();
  expect(newClipboardContents).toEqual(sampleContent);
});

test("create macro and edit title and content", async () => {
  await render(<App />);
  window.focus();
  await navigator.clipboard.writeText("");
  const sampleTitle = "my title";
  const sampleContent = "very cool content";
  const expectedTitle = "new and improved title";
  const expectedContent = "the coolest content";

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

  const editBtn = page.getByRole("button", { name: "Edit" });
  await expect.element(editBtn).toBeVisible();
  await editBtn.click();

  const editTitleBox = page.getByTitle("macro-title");
  await editTitleBox.fill(expectedTitle);

  await editor.fill(expectedContent);

  await saveBtn.click();

  const editedMacro = page.getByRole("button", {
    name: expectedTitle,
    exact: true,
  });
  await expect.element(editedMacro).not.toBeNull();

  await expect(getMacroByTitle(expectedTitle)).resolves.not.toBeFalsy();

  await editedMacro.click();
  const newClipboardContents = await navigator.clipboard.readText();
  expect(newClipboardContents).toEqual(expectedContent);
});

test("create multiple macros and edit title and contents of one", async () => {
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
  const expectedTitle = "new and improved title";
  const expectedContent = "new and improved content";

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

  const editBtn = page.getByRole("button", { name: "Edit" });
  await expect.element(editBtn).toBeVisible();

  await editBtn.click();

  const editTitleBox = page.getByTitle("macro-title");
  await editTitleBox.fill(expectedTitle);

  const editor = page.getByTestId("editor");
  await editor.fill(expectedContent);

  const saveBtn = page.getByRole("button", { name: "Save" });
  await saveBtn.click();

  const editedMacro = page.getByRole("button", {
    name: expectedTitle,
    exact: true,
  });
  await expect.element(editedMacro).not.toBeNull();

  await expect(getMacroByTitle(expectedTitle)).resolves.not.toBeFalsy();

  await editedMacro.click();
  const newClipboardContents = await navigator.clipboard.readText();
  expect(newClipboardContents).toEqual(expectedContent);
});
