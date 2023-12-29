import { v4 as uuidv4 } from "uuid";
import { GetTypesStartingWithPrefix, MarkdownElement } from "./types";

const BREAKPOINT = "\n\n";
const NEWLINE = "\n";

const REGEX_HEADING = /^#+/; // ^ means start of string, #+ means one or more '#'

function getHeadingLevel(text: string): number {
  const match = text.match(REGEX_HEADING);
  const fullMatch = match && match[0];
  return fullMatch ? fullMatch.length : 0;
}

function parseHeading(
  text: string,
  startIndex: number
): { element: MarkdownElement; endIndex: number } {
  const headingLevel = getHeadingLevel(text.slice(startIndex));

  const isNotEndingWithNewline = text.indexOf(NEWLINE, startIndex) === -1;
  const headingEndIndex = isNotEndingWithNewline
    ? text.length
    : text.indexOf(NEWLINE, startIndex);

  const additionToSkipSpaceAfterHash = 1;

  const content = text
    .slice(
      startIndex + headingLevel + additionToSkipSpaceAfterHash,
      headingEndIndex
    )
    .trim(); // only trims beginning and end

  return {
    element: {
      type: `h${headingLevel}` as GetTypesStartingWithPrefix<
        MarkdownElement,
        "h"
      >,
      content,
      id: uuidv4(),
    },
    endIndex: headingEndIndex,
  };
}

export function parseMarkdownElements(text: string): MarkdownElement[] {
  const elements: MarkdownElement[] = [];
  let index = 0;

  while (index < text.length) {
    if (text[index] === "#") {
      const { element, endIndex } = parseHeading(text, index);
      elements.push(element);
      index = endIndex;
    } else if (text.startsWith(BREAKPOINT, index)) {
      elements.push({ type: "breakpoint", id: uuidv4() });
      index += BREAKPOINT.length;
    } else {
      const endOfCurrentLine =
        text.indexOf(NEWLINE, index) === -1
          ? text.length
          : text.indexOf(NEWLINE, index);
      const textFromCurrentPositionToEnd = text.slice(index, endOfCurrentLine);

      elements.push({
        type: "p",
        content: textFromCurrentPositionToEnd,
        id: uuidv4(),
      });

      index = endOfCurrentLine;
    }
  }

  return elements;
}
