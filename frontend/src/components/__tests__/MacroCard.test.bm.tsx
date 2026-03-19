import { render } from "vitest-browser-react";
import { expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import MacroCard from "../MacroCard";

const showToastMock = vi.fn();

test("copies macro content to clipboard", async () => {
  const titleMock = "test";
  const contentMock = "content";

  await render(
    <MacroCard
      id={crypto.randomUUID()}
      title={titleMock}
      content={contentMock}
      showToast={showToastMock}
    />,
  );

  await userEvent.click(page.getByRole("button"));

  const clipboardContent = await navigator.clipboard.readText();
  expect(clipboardContent).toEqual(contentMock);
});
