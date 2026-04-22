/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import { playwright } from "@vitest/browser-playwright";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr({ include: "**/*.svg?react" })],
  test: {
    testTimeout: 45_000,
    reporters: [["verbose", { summary: false }]],
    projects: [
      {
        test: {
          environment: "jsdom",
          globals: true,
          name: "unit",
          include: ["./**/*.test.tsx", "./**/*.test.ts"],
          exclude: ["**/node_modules/**", "**/.git/**"],
        },
      },
      {
        extends: true,
        test: {
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
              contextOptions: {
                permissions: ["clipboard-read", "clipboard-write"],
              },
            }),
            instances: [{ browser: "chromium" }],
          },
          name: "integration",
          include: ["./**/*.test.int.tsx", "./**/*.test.int.ts"],
          exclude: ["**/node_modules/**", "**/.git/**"],
        },
      },
      {
        extends: true,
        test: {
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
              contextOptions: {
                permissions: ["clipboard-read", "clipboard-write"],
              },
            }),
            instances: [{ browser: "chromium" }],
          },
          name: "e2e",
          include: ["./**/*.test.e2e.tsx", "./**/*.test.e2e.ts"],
          exclude: ["**/node_modules/**", "**/.git/**"],
        },
      },
    ],
  },
});
