import { parseMarkdownElements } from "./parseMarkdownElements";
import { it, expect, describe } from "vitest";
import { MarkdownElement } from "./types";

describe("headings", () => {
  it("should parse a single heading", () => {
    const markdown = "# Hello World";
    const elements = parseMarkdownElements(markdown);
    expect(elements).toEqual([
      {
        type: "h1",
        content: "Hello World",
        id: expect.any(String),
      },
    ] satisfies MarkdownElement[]);
  });

  it("should parse heading one with breakpoint", () => {
    const markdown = "# Hello World\n\n";
    const elements = parseMarkdownElements(markdown);
    expect(elements).toEqual([
      {
        type: "h1",
        content: "Hello World",
        id: expect.any(String),
      },
      {
        type: "breakpoint",
        id: expect.any(String),
      },
    ] satisfies MarkdownElement[]);
  });

  it("should parse different headings with many breakpoints", () => {
    const markdown = "# Hello World\n\n## Hello World\n\n### Hello World\n\n";
    const elements = parseMarkdownElements(markdown);
    expect(elements).toEqual([
      {
        type: "h1",
        content: "Hello World",
        id: expect.any(String),
      },
      {
        type: "breakpoint",
        id: expect.any(String),
      },
      {
        type: "h2",
        content: "Hello World",
        id: expect.any(String),
      },
      {
        type: "breakpoint",
        id: expect.any(String),
      },
      {
        type: "h3",
        content: "Hello World",
        id: expect.any(String),
      },
      {
        type: "breakpoint",
        id: expect.any(String),
      },
    ] satisfies MarkdownElement[]);
  });
});
