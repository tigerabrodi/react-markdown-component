import { v4 } from "uuid";
import { GetTypesStartingWithPrefix, MarkdownElement } from "./types";

const BREAKPOINT = "\n";

const GET_ENTIRE_HEADING_LEVEL_REGEX = /#/g; // This will match all #s. `g` means global, so it will match all #s.

type HeadingLevel = GetTypesStartingWithPrefix<MarkdownElement, "h">;

function getHeadingLevel(textareaContent: string) {
  return textareaContent.match(GET_ENTIRE_HEADING_LEVEL_REGEX)
    ?.length as number;
}

function getHeadingEnd(textareaContent: string, headingStart: number) {
  return textareaContent.includes(BREAKPOINT)
    ? textareaContent.indexOf(BREAKPOINT, headingStart)
    : textareaContent.length;
}

export function parseMarkdownElements(
  textareaContent: string
): MarkdownElement[] {
  const elements: MarkdownElement[] = [];

  for (let i = 0; i < textareaContent.length; i++) {
    if (textareaContent[i] === "#") {
      // Get heading level via counting number of #s through Regex
      const headingLevel = getHeadingLevel(textareaContent.slice(i));

      // If #s do not end with space, then we do not want to parse yet
      if (textareaContent[i + headingLevel] !== " ") {
        continue;
      }

      const headingStart = i + headingLevel + 1;
      const headingEnd = getHeadingEnd(textareaContent, headingStart);
      const headingContent = textareaContent.slice(headingStart, headingEnd);

      elements.push({
        type: `h${headingLevel}` as HeadingLevel,
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
