import { render } from "vitest-browser-react";
import { expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import MacroCard from "../MacroCard";
import Toast from "../Toast";
import { ToastState } from "../../types/props";

const showToastMock = vi.fn((type: ToastState, msg: string) => {
  const COUNTDOWN_IN_MS = 4 * 1000;
  setTimeout(
    async () => await render(<Toast type={type} msg={msg} />),
    COUNTDOWN_IN_MS,
  );
});

test("copies macro content to clipboard", async () => {
  const titleMock = "test";
  const contentMock = "content";
  const successMsg = "Macro copied successfully!";

  await render(
    <MacroCard
      key={crypto.randomUUID()}
      title={titleMock}
      content={contentMock}
      showToast={() => showToastMock(ToastState.SUCCESS, successMsg)}
    />,
  );

  await userEvent.click(page.getByRole("button"));

  const clipboardContent = await navigator.clipboard.readText();
  expect(clipboardContent).toEqual(contentMock);
});
