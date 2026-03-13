import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import CreateMacroModal from "../CreateMacroModal";

const onCloseMock = vi.fn();
const onSaveMock = vi.fn();

test("return null when isOpen is false", () => {
  const { container } = render(
    <CreateMacroModal
      onClose={onCloseMock}
      onSave={onSaveMock}
      isOpen={false}
    />,
  );
  expect(container.firstChild).toBeNull();
});

test("return modal when isOpen is true", () => {
  const { container } = render(
    <CreateMacroModal
      onClose={onCloseMock}
      onSave={onSaveMock}
      isOpen={true}
    />,
  );
  expect(container.firstChild).not.toBeNull();
});
