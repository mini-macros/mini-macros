import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import CreateMacroModal from "../CreateMacroModal";
import Toast from "../Toast";
import { ToastState } from "../../types/props";

const onCloseMock = vi.fn();
const showToastMock = vi.fn((type: ToastState, msg: string) => {
  const COUNTDOWN_IN_MS = 4 * 1000;
  setTimeout(() => render(<Toast type={type} msg={msg} />), COUNTDOWN_IN_MS);
});

test("return null when isOpen is false", () => {
  const successMsg = "Macro created successfully!";
  const { container } = render(
    <CreateMacroModal
      onClose={onCloseMock}
      showToast={() => showToastMock(ToastState.SUCCESS, successMsg)}
      isOpen={false}
    />,
  );
  expect(container.firstChild).toBeNull();
});

test("return modal when isOpen is true", () => {
  const successMsg = "Macro created successfully!";
  const { container } = render(
    <CreateMacroModal
      onClose={onCloseMock}
      showToast={() => showToastMock(ToastState.SUCCESS, successMsg)}
      isOpen={true}
    />,
  );
  expect(container.firstChild).not.toBeNull();
});
