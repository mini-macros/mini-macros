import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import { page, userEvent } from "vitest/browser";
import MacroCard from "../MacroCard";

test("copies macro content to clipboard", async () => {
  const titleMock = "test";
  const contentMock = "content";

  await render(<MacroCard title={titleMock} content={contentMock} />);

  await userEvent.click(page.getByRole("button"));

  const clipboardContent = await navigator.clipboard.readText();
  expect(clipboardContent).toEqual(contentMock);
});
