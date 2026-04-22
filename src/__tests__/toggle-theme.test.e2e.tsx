import { render } from "vitest-browser-react";
import { expect, test, beforeEach } from "vitest";
import App from "../App";

beforeEach(() => localStorage.clear());

test("toggle theme to dark mode", async () => {
  const screen = await render(<App />);
  await screen.getByTitle("Toggle Theme").click();

  const hasDark = document.documentElement.classList.contains("dark");
  expect(hasDark).toBe(true);
});

test("toggle theme to dark mode and back to light mode", async () => {
  const screen = await render(<App />);
  await screen.getByTitle("Toggle Theme").click();

  const hasDark = document.documentElement.classList.contains("dark");
  expect(hasDark).toBe(true);

  await screen.getByTitle("Toggle Theme").click();

  const hasLight = !document.documentElement.classList.contains("dark");
  expect(hasLight).toBe(true);
});
