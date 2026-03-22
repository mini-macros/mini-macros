import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import Toast from "../Toast";
import { ToastState } from "../../types/props";
import * as styles from "../../styles/toast-styles";

test("ERROR type generates error msg in styled Toast", async () => {
  const typeMock: ToastState = ToastState.ERROR;
  const msgMock = "an error has occurred";
  const screen = await render(<Toast type={typeMock} msg={msgMock} />);

  const footer = screen.getByRole("contentinfo");
  const span = screen.getByText(msgMock);

  await expect.element(footer).not.toBeNull();
  await expect.element(span).not.toBeNull();

  await expect
    .element(footer)
    .toHaveAttribute(
      "class",
      styles.baseToastStyles + " " + styles.errorToastStyles,
    );
  await expect.element(footer).toContainElement(span);
});

test("SUCCESS type generates success msg in styled Toast", async () => {
  const typeMock: ToastState = ToastState.SUCCESS;
  const msgMock = "something good happened!";
  const screen = await render(<Toast type={typeMock} msg={msgMock} />);

  const footer = screen.getByRole("contentinfo");
  const span = screen.getByText(msgMock);

  await expect.element(footer).not.toBeNull();
  await expect.element(span).not.toBeNull();

  await expect
    .element(footer)
    .toHaveAttribute(
      "class",
      styles.baseToastStyles + " " + styles.successToastStyles,
    );
  await expect.element(footer).toContainElement(span);
});

test("WARNING type generates warning msg in styled Toast", async () => {
  const typeMock: ToastState = ToastState.WARNING;
  const msgMock = "let's...try something else.";
  const screen = await render(<Toast type={typeMock} msg={msgMock} />);

  const footer = screen.getByRole("contentinfo");
  const span = screen.getByText(msgMock);

  await expect.element(footer).not.toBeNull();
  await expect.element(span).not.toBeNull();

  await expect
    .element(footer)
    .toHaveAttribute(
      "class",
      styles.baseToastStyles + " " + styles.warningToastStyles,
    );
  await expect.element(footer).toContainElement(span);
});

test("no type generates neutral msg in styled Toast", async () => {
  const msgMock = "hey listen!";
  const screen = await render(<Toast msg={msgMock} />);

  const footer = screen.getByRole("contentinfo");
  const span = screen.getByText(msgMock);

  await expect.element(footer).not.toBeNull();
  await expect.element(span).not.toBeNull();

  await expect
    .element(footer)
    .toHaveAttribute(
      "class",
      styles.baseToastStyles + " " + styles.neutralToastStyles,
    );
  await expect.element(footer).toContainElement(span);
});
