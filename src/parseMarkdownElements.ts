import { v4 } from "uuid";
import { GetTypesStartingWithPrefix, MarkdownElement } from "./types";

const BREAKPOINT = "\n\n";
const NEWLINE = "\n";

const GET_ENTIRE_HEADING_LEVEL_REGEX = /#/g; // This will match all #s. `g` means global, so it will match all #s.

type HeadingLevel = GetTypesStartingWithPrefix<MarkdownElement, "h">;

function getHeadingLevel(textareaContent: string) {
  return textareaContent.match(GET_ENTIRE_HEADING_LEVEL_REGEX)
    ?.length as number;
}

function getHeadingEnd(textareaContent: string, headingStart: number) {
  return textareaContent.includes(NEWLINE)
    ? textareaContent.indexOf(NEWLINE, headingStart)
    : textareaContent.length;
}

export function parseMarkdownElements(
  textareaContent: string
): MarkdownElement[] {
  const elements: MarkdownElement[] = [];

  let index = 0;

  while (index < textareaContent.length) {
    if (textareaContent[index] === "#") {
      // Get heading level via counting number of #s through Regex
      const headingLevel = getHeadingLevel(textareaContent.slice(index));
      console.log("headingLevel", headingLevel);

      const indexOfSpace = index + headingLevel;

      // If #s do not end with space, then we do not want to parse yet
      if (textareaContent[indexOfSpace] !== " ") {
        continue;
      }

      const headingStart = indexOfSpace + 1;
      const headingEnd = getHeadingEnd(textareaContent, headingStart);
      const headingContent = textareaContent.slice(headingStart, headingEnd);

      elements.push({
        type: `h${headingLevel}` as HeadingLevel,
        content: headingContent,
        id: v4(),
      });

      index = headingEnd;

      continue;
    }

    // Handle double line break for breakpoint
    if (textareaContent.substring(index, index + 2) === BREAKPOINT) {
      elements.push({
        type: "breakpoint",
        id: v4(),
      });
      index += 2; // Move past the double line break
      continue;
    } else if (textareaContent[index] === "\n") {
      index++; // Skip the single line break
      continue;
    }

    index++; // Move to next character
  }

  return elements;
}
