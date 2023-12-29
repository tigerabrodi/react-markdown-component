import { parseMarkdownElements } from "./parseMarkdownElements";
import { it, expect } from "vitest";

it("should parse a single heading", () => {
  const markdown = "# Hello World";
  const elements = parseMarkdownElements(markdown);
  expect(elements).toEqual([
    {
      type: "h1",
      content: "Hello World",
    },
  ]);
});
