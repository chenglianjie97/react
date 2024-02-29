import "antd/dist/antd.css";
import { Example, Example2 } from "./jotai";
import { RowSelectTable } from "./tanstack-table";
import App from "./rich-text/App";
export default function HomePage() {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h2>富文本</h2>
      <App></App>
    </div>
  );
}
