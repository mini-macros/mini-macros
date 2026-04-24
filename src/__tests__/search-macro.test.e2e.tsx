import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { expect, test, beforeEach } from "vitest";
import App from "../App";
import { getMacroByTitle } from "../utils/macro-crud";

beforeEach(async () => {
  localStorage.clear();
  window.focus();
  await navigator.clipboard.writeText("");
});

test("create multiple macros and search for existing one with full query", async () => {
  await render(<App />);
  const testMacros = [
    {
      title: "very cool title",
      content: "very cool content",
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
  const searchQuery = testMacros[0].title;

  for (const macro of testMacros) {
    const createMacroBtn = page.getByTitle("Create Macro");
    await createMacroBtn.click();

    const titleBox = page.getByPlaceholder("My Macro");
    await userEvent.fill(titleBox, macro.title);

    const editor = page.getByTestId("editor");
    await userEvent.fill(editor, macro.content);

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

  const searchBar = page.getByPlaceholder("Search macros...");
  await userEvent.fill(searchBar, searchQuery);

  const expectedMacro = page.getByRole("button", {
    name: testMacros[0].title,
    exact: true,
  });
  await expect.element(expectedMacro).toBeVisible();

  for (let i = 1; i < testMacros.length; i++) {
    const hiddenMacro = page.getByRole("button", {
      name: testMacros[i].title,
      exact: true,
    });
    await expect.element(hiddenMacro).not.toBeInTheDocument();
  }
});

test("create multiple macros and search for existing one with partial query", async () => {
  await render(<App />);
  const testMacros = [
    {
      title: "very cool title",
      content: "very cool content",
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
  const searchQuery = "silly";

  for (const macro of testMacros) {
    const createMacroBtn = page.getByTitle("Create Macro");
    await createMacroBtn.click();

    const titleBox = page.getByPlaceholder("My Macro");
    await userEvent.fill(titleBox, macro.title);

    const editor = page.getByTestId("editor");
    await userEvent.fill(editor, macro.content);

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

  const searchBar = page.getByPlaceholder("Search macros...");
  await userEvent.fill(searchBar, searchQuery);

  const expectedMacro = page.getByRole("button", {
    name: testMacros[2].title,
    exact: true,
  });
  await expect.element(expectedMacro).toBeVisible();

  for (let i = 0; i < testMacros.length; i++) {
    if (i == 2) {
      continue;
    }
    const hiddenMacro = page.getByRole("button", {
      name: testMacros[i].title,
      exact: true,
    });
    await expect.element(hiddenMacro).not.toBeInTheDocument();
  }
});

test("create multiple macros and search for all existing with partial query", async () => {
  await render(<App />);
  window.focus();
  await navigator.clipboard.writeText("");
  const testMacros = [
    {
      title: "very cool title",
      content: "very cool content",
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
  const searchQuery = "very";

  for (const macro of testMacros) {
    const createMacroBtn = page.getByTitle("Create Macro");
    await createMacroBtn.click();

    const titleBox = page.getByPlaceholder("My Macro");
    await userEvent.fill(titleBox, macro.title);

    const editor = page.getByTestId("editor");
    await userEvent.fill(editor, macro.content);

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

  const searchBar = page.getByPlaceholder("Search macros...");
  await userEvent.fill(searchBar, searchQuery);

  const expectedMacro = page.getByRole("button", {
    name: testMacros[0].title,
    exact: true,
  });
  await expect.element(expectedMacro).toBeVisible();

  const otherExpectedMacro = page.getByRole("button", {
    name: testMacros[1].title,
    exact: true,
  });
  await expect.element(otherExpectedMacro).toBeVisible();

  for (let i = 0; i < testMacros.length; i++) {
    if (i == 0 || i == 1) {
      continue;
    }
    const hiddenMacro = page.getByRole("button", {
      name: testMacros[i].title,
      exact: true,
    });
    await expect.element(hiddenMacro).not.toBeInTheDocument();
  }
});
