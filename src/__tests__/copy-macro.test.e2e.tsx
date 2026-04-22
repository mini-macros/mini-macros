import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { expect, test, beforeEach } from "vitest";
import App from "../App";

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
    name: `${sampleTitle}`,
    exact: true,
  });
  await expect.element(createdMacro).not.toBeNull();

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

  const dropdownBtn = page.getByTitle(sampleTitle + " Dropdown");
  await dropdownBtn.click();

  const copyBtn = page.getByRole("button", { name: "Copy" });
  await expect.element(copyBtn).toBeVisible();

  await copyBtn.click();
  const clipboardContents = await navigator.clipboard.readText();
  expect(clipboardContents).toEqual(sampleContent);
});
