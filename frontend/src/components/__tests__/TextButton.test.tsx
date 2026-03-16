import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import TextButton from "../TextButton";

test("onClick runs the handler", async () => {
  const onClickMock = vi.fn();
  const screen = render(<TextButton onClick={onClickMock} />);
  const user = userEvent.setup();

  await user.click(screen.getByRole("button"));

  expect(onClickMock).toHaveBeenCalled();
});
