import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { vi, expect, test, beforeEach } from "vitest";
import App from "../App";
import { getMacroByTitle } from "../utils/macro-crud";

beforeEach(async () => {
  localStorage.clear();
  window.focus();
  await navigator.clipboard.writeText("");
});

test("create macro and edit its content", async () => {
  await render(<App />);
  const sampleTitle = "my title";
  const sampleContent = "very cool content";
  const expectedContent = "even cooler content";

  const createMacroBtn = page.getByTitle("Create Macro");
  await createMacroBtn.click();

  const titleBox = page.getByPlaceholder("My Macro");
  await userEvent.fill(titleBox, sampleTitle);

  const editor = page.getByTestId("editor");
  await editor.click();
  await userEvent.fill(editor, sampleContent);
  expect(editor).toHaveTextContent(sampleContent);

  const saveBtn = page.getByRole("button", { name: "Save" });
  await saveBtn.click();

  await expect.element(editor).not.toBeInTheDocument();

  const createdMacro = page.getByRole("button", {
    name: sampleTitle,
    exact: true,
  });
  await expect.element(createdMacro).not.toBeNull();

  await expect(getMacroByTitle(sampleTitle)).resolves.not.toBeFalsy();

  await createdMacro.click();

  await vi.waitFor(
    async () => {
      const clipboardContents = await navigator.clipboard.readText();
      expect(clipboardContents).toEqual(sampleContent);
    },
    {
      timeout: 5_000,
      interval: 100,
    },
  );

  const dropdownBtn = page.getByTitle(sampleTitle + " Dropdown");
  await dropdownBtn.click();

  const editBtn = page.getByRole("button", { name: "Edit" });
  await expect.element(editBtn).toBeVisible();
  await editBtn.click();

  await editor.click();
  await userEvent.fill(editor, expectedContent);
  expect(editor).toHaveTextContent(expectedContent);

  await saveBtn.click();

  await expect.element(editor).not.toBeInTheDocument();
  await expect.element(createdMacro).not.toBeNull();

  await createdMacro.click();

  await vi.waitFor(
    async () => {
      const clipboardContents = await navigator.clipboard.readText();
      expect(clipboardContents).toEqual(expectedContent);
    },
    {
      timeout: 5_000,
      interval: 100,
    },
  );
});

test("create macro and edit its title", async () => {
  await render(<App />);
  const sampleTitle = "my title";
  const sampleContent = "very cool content";
  const expectedTitle = "new and improved title";

  const createMacroBtn = page.getByTitle("Create Macro");
  await createMacroBtn.click();

  const titleBox = page.getByPlaceholder("My Macro");
  await userEvent.fill(titleBox, sampleTitle);

  const editor = page.getByTestId("editor");
  await editor.click();
  await userEvent.fill(editor, sampleContent);
  expect(editor).toHaveTextContent(sampleContent);

  const saveBtn = page.getByRole("button", { name: "Save" });
  await saveBtn.click();

  await expect.element(editor).not.toBeInTheDocument();

  const createdMacro = page.getByRole("button", {
    name: sampleTitle,
    exact: true,
  });
  await expect.element(createdMacro).not.toBeNull();

  await expect(getMacroByTitle(sampleTitle)).resolves.not.toBeFalsy();

  await createdMacro.click();

  await vi.waitFor(
    async () => {
      const clipboardContents = await navigator.clipboard.readText();
      expect(clipboardContents).toEqual(sampleContent);
    },
    {
      timeout: 5_000,
      interval: 100,
    },
  );

  const dropdownBtn = page.getByTitle(sampleTitle + " Dropdown");
  await dropdownBtn.click();

  const editBtn = page.getByRole("button", { name: "Edit" });
  await expect.element(editBtn).toBeVisible();
  await editBtn.click();

  const editTitleBox = page.getByTitle("macro-title");
  await userEvent.fill(editTitleBox, expectedTitle);

  await saveBtn.click();

  await expect.element(editor).not.toBeInTheDocument();

  const editedMacro = page.getByRole("button", {
    name: expectedTitle,
    exact: true,
  });
  await expect.element(editedMacro).not.toBeNull();

  await editedMacro.click();

  await vi.waitFor(
    async () => {
      const clipboardContents = await navigator.clipboard.readText();
      expect(clipboardContents).toEqual(sampleContent);
    },
    {
      timeout: 5_000,
      interval: 100,
    },
  );
});

test("create macro and edit title and content", async () => {
  await render(<App />);
  const sampleTitle = "my title";
  const sampleContent = "very cool content";
  const expectedTitle = "new and improved title";
  const expectedContent = "the coolest content";

  const createMacroBtn = page.getByTitle("Create Macro");
  await createMacroBtn.click();

  const titleBox = page.getByPlaceholder("My Macro");
  await userEvent.fill(titleBox, sampleTitle);

  const editor = page.getByTestId("editor");
  await editor.click();
  await userEvent.fill(editor, sampleContent);
  expect(editor).toHaveTextContent(sampleContent);

  const saveBtn = page.getByRole("button", { name: "Save" });
  await saveBtn.click();

  await expect.element(editor).not.toBeInTheDocument();

  const createdMacro = page.getByRole("button", {
    name: sampleTitle,
    exact: true,
  });
  await expect.element(createdMacro).not.toBeNull();

  await createdMacro.click();

  await vi.waitFor(
    async () => {
      const clipboardContents = await navigator.clipboard.readText();
      expect(clipboardContents).toEqual(sampleContent);
    },
    {
      timeout: 5_000,
      interval: 100,
    },
  );

  await expect(getMacroByTitle(sampleTitle)).resolves.not.toBeFalsy();

  const dropdownBtn = page.getByTitle(sampleTitle + " Dropdown");
  await dropdownBtn.click();

  const editBtn = page.getByRole("button", { name: "Edit" });
  await expect.element(editBtn).toBeVisible();
  await editBtn.click();

  const editTitleBox = page.getByTitle("macro-title");
  await userEvent.fill(editTitleBox, expectedTitle);

  await editor.click();
  await userEvent.fill(editor, expectedContent);
  expect(editor).toHaveTextContent(expectedContent);

  await saveBtn.click();

  await expect.element(editor).not.toBeInTheDocument();

  const editedMacro = page.getByRole("button", {
    name: expectedTitle,
    exact: true,
  });
  await expect.element(editedMacro).not.toBeNull();

  await expect(getMacroByTitle(expectedTitle)).resolves.not.toBeFalsy();

  await editedMacro.click();

  await vi.waitFor(
    async () => {
      const clipboardContents = await navigator.clipboard.readText();
      expect(clipboardContents).toEqual(expectedContent);
    },
    {
      timeout: 5_000,
      interval: 100,
    },
  );
});

test("create multiple macros and edit title and contents of one", async () => {
  await render(<App />);
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
    await userEvent.fill(titleBox, macro.title);

    const editor = page.getByTestId("editor");
    await editor.click();
    await userEvent.fill(editor, macro.content);
    expect(editor).toHaveTextContent(macro.content);

    const saveBtn = page.getByRole("button", { name: "Save" });
    await saveBtn.click();

    await expect.element(editor).not.toBeInTheDocument();

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
  await userEvent.fill(editTitleBox, expectedTitle);

  const editor = page.getByTestId("editor");
  await editor.click();
  await userEvent.fill(editor, expectedContent);
  expect(editor).toHaveTextContent(expectedContent);
  expect(getMacroByTitle(expectedTitle)).not.toBeNull();

  const saveBtn = page.getByRole("button", { name: "Save" });
  expect(saveBtn).toBeVisible();
  await saveBtn.click();

  await expect.element(editor).not.toBeInTheDocument();

  const editedMacro = page.getByRole("button", {
    name: expectedTitle,
    exact: true,
  });
  await expect.element(editedMacro).not.toBeNull();

  await expect(getMacroByTitle(expectedTitle)).resolves.not.toBeFalsy();

  await editedMacro.click();

  await vi.waitFor(
    async () => {
      const clipboardContents = await navigator.clipboard.readText();
      expect(clipboardContents).toEqual(expectedContent);
    },
    {
      timeout: 5_000,
      interval: 100,
    },
  );
});
