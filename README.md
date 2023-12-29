# React Markdown Live Preview Component

Building a Markdown component from scratch.

# Learnings

## IndexOf

`indexOf` returns the index of the first occurrence of a substring in a string, or -1 if it's not found. It takes an optional second argument, which is the index to start searching from.

Example: `indexOf('hello world', 'world')` returns 6, 6 being the index of the 7th character in the string.

## \n

`\n` is the newline character. It's used to indicate a new line in a string. It's treated as a single character. Twice would not mean 4 characters, but 2.

## startsWith

string.startsWith takes a second argument, which is the index to start searching from.

## string.match

string.match takes a regex as an argument, and returns an array of matches. If there are no matches, it returns null. The first item in the array is the full match, and the rest are the capture groups. Capture groups are the parts of the regex that are wrapped in parentheses.
