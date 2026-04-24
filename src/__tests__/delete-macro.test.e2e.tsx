import { render } from "vitest-browser-react";
import { expect, test, beforeEach } from "vitest";
import { page, userEvent } from "vitest/browser";
import App from "../App";
import { getMacroByTitle } from "../utils/macro-crud";

beforeEach(async () => {
  localStorage.clear();
  window.focus();
  await navigator.clipboard.writeText("");
});

test("create macro and delete it", async () => {
  await render(<App />);
  window.focus();
  await navigator.clipboard.writeText("");
  const sampleTitle = "my title";
  const sampleContent = "very cool content";

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

  const dropdownBtn = page.getByTitle(sampleTitle + " Dropdown");
  await dropdownBtn.click();

  const deleteBtn = page.getByRole("button", { name: "Delete" });
  await expect.element(deleteBtn).toBeVisible();

  await deleteBtn.click();

  await expect.element(createdMacro).not.toBeInTheDocument();
  await expect(getMacroByTitle(sampleTitle)).resolves.toBeFalsy();
});

test("create multiple macros and delete only one", async () => {
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

  const macroToDelete = page.getByRole("button", {
    name: testMacros[0].title,
    exact: true,
  });

  const dropdownBtn = page.getByTitle(testMacros[0].title + " Dropdown");
  await dropdownBtn.click();

  const deleteBtn = page.getByRole("button", { name: "Delete" });
  await expect.element(deleteBtn).toBeVisible();

  await deleteBtn.click();

  await expect.element(macroToDelete).not.toBeInTheDocument();
  await expect(getMacroByTitle(testMacros[0].title)).resolves.toBeFalsy();
});
