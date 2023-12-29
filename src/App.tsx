import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import "./App.css";

type MarkdownElement = {
  // TODO: add more types
  type: "h1";
  content: string;
  id: string;
};

export function App() {
  const [textareaContent, setTextareaContent] = useState("");
  const [markdownElements, setMarkdownElements] = useState<MarkdownElement[]>(
    []
  );

  // useCallback is required for debounce to work
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedMarkdownOnTextareaChange = useCallback(
    debounce(async (textareaContent: string) => {
      // do something with the textareaContent
      console.log(textareaContent);
    }, 500),

    []
  );

  useEffect(() => {
    debouncedMarkdownOnTextareaChange(textareaContent);
  }, [textareaContent, debouncedMarkdownOnTextareaChange]);

  return (
    <main>
      <h1>Markdown Preview Playground</h1>
      <div className="wrapper">
        <div className="markdown">
          <label htmlFor="markdown">Enter markdown here</label>
          <textarea
            placeholder="# This is a title"
            id="markdown"
            value={textareaContent}
            onChange={(event) => setTextareaContent(event.target.value)}
          />
        </div>

        <div className="preview">
          <h2>Preview</h2>
          <div className="content">
            {markdownElements.map((markdownElement, index) => (
              <markdownElement.type key={markdownElement.id}>
                {markdownElement.content}
              </markdownElement.type>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
