import { v4 } from "uuid";
import { GetTypesStartingWithPrefix, MarkdownElement } from "./types";

const BREAKPOINT = "\n";

const GET_ENTIRE_HEADING_LEVEL_REGEX = /#/g; // This will match all #s. `g` means global, so it will match all #s.

export function parseMarkdownElements(
  textareaContent: string
): MarkdownElement[] {
  const elements: MarkdownElement[] = [];

  for (let i = 0; i < textareaContent.length; i++) {
    if (textareaContent[i] === "#") {
      // 1. Get heading level via counting number of #s through Regex
      const headingLevel = textareaContent.match(GET_ENTIRE_HEADING_LEVEL_REGEX)
        ?.length as number;

      // 2. If #s do not end with space, then we do not want to parse yet
      if (textareaContent[i + headingLevel] !== " ") {
        continue;
      }

      // 3. If #s do end with space, then we want to parse the heading
      const headingStart = i + headingLevel + 1;

      const headingEnd = textareaContent.includes(BREAKPOINT)
        ? textareaContent.indexOf(BREAKPOINT, headingStart)
        : textareaContent.length;

      const headingContent = textareaContent.slice(headingStart, headingEnd);

      elements.push({
        type: `h${headingLevel}` as GetTypesStartingWithPrefix<
          MarkdownElement,
          "h"
        >,
        content: headingContent,
        id: v4(),
      });
    }

    if (textareaContent[i] === BREAKPOINT) {
      elements.push({
        type: "breakpoint",
        id: v4(),
      });
    }
  }

  return elements;
}
