import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import IconButton from "../IconButton";
import { FaNoteSticky } from "react-icons/fa6";

test("onClick runs the handler", async () => {
  const onClickMock = vi.fn();
  const screen = render(
    <IconButton Icon={FaNoteSticky} onClick={onClickMock} />,
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole("button"));

  expect(onClickMock).toHaveBeenCalled();
});
