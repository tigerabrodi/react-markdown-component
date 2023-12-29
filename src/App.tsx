import "./App.css";

export function App() {
  return (
    <main>
      <h1>Markdown Preview Playground</h1>
      <div className="wrapper">
        <div className="markdown">
          <label htmlFor="markdown">Enter markdown here</label>
          <textarea placeholder="# This is a title" id="markdown" />
        </div>

        <div className="preview">
          <h2>Preview</h2>
          <div className="content">
            this is where the preview will be rendered
          </div>
        </div>
      </div>
    </main>
  );
}
