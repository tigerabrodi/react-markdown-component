import { FC, ReactNode, useState } from "react";
import "./App.css";
import { parseMarkdownElements } from "./parseMarkdownElements";

export type MarkdownElement = {
  // TODO: add more types
  type: "h1";
  content: string;
  id: string;
};

type MarkdownComponentType = FC<{ children: ReactNode }>;

const MarkdownComponents: Record<
  MarkdownElement["type"],
  MarkdownComponentType
> = {
  h1: ({ children }) => <h1>{children}</h1>,
};

const DefaultComponent: MarkdownComponentType = ({ children }) => (
  <div>{children}</div>
);

export function App() {
  const [textareaContent, setTextareaContent] = useState("");
  const [markdownElements, setMarkdownElements] = useState<MarkdownElement[]>(
    []
  );

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
            onChange={(event) => {
              setTextareaContent(event.target.value);
              setMarkdownElements(parseMarkdownElements(event.target.value));
            }}
          />
        </div>

        <div className="preview">
          <h2>Preview</h2>
          <div className="content">
            {markdownElements.map((markdownElement) => {
              const Component =
                MarkdownComponents[markdownElement.type] || DefaultComponent;
              return (
                <Component key={markdownElement.id}>
                  {markdownElement.content}
                </Component>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
