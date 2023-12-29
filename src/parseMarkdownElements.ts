import { v4 } from "uuid";
import { MarkdownElement } from "./App";

export function parseMarkdownElements(
  textareaContent: string
): MarkdownElement[] {
  const elements: MarkdownElement[] = [];
  const lines = textareaContent.split("\n");
  for (const line of lines) {
    if (line.startsWith("# ")) {
      const content = line.slice(2);
      elements.push({
        type: "h1",
        content,
        id: v4(),
      });
    }
  }

  return elements;
}
