import "./styles.css";
import { useState } from "react";
import Editor from "./Editor";

export default function App() {
  const [markdown, setMarkdown] = useState("Bold Italic");
  console.log("markdown", markdown);
  return (
    <div className="App">
      <Editor onChange={setMarkdown} value={markdown} />
      <div>{markdown}</div>
      {/* <Editor value={markdown} isDisabled key={markdown} onChange={() => {}} /> */}
    </div>
  );
}
