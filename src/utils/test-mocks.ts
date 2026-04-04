import type { Macro } from "../types/types";

export const macrosMock: Macro[] = [
  {
    id: "1",
    title: "test macro 1",
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"new content for test 1"}]}]}',
    clickCount: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: "2",
    title: "test macro 2",
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"new content for test 2"}]}]}',
    clickCount: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: "3",
    title: "test macro 3",
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"new content for test 3"}]}]}',
    clickCount: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: "4",
    title: "test macro 4",
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"new content for test 4"}]}]}',
    clickCount: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];
