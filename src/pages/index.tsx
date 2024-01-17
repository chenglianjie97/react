import { Menu } from "antd";
import { InputGroup } from "./antd";
import { Form } from "./form/form-grid";
import { Search } from "./search";
import "antd/dist/antd.css";
export default function HomePage() {
  return (
    <div style={{ width: "100%" }}>
      <h2>组件</h2>
      <div>
        <InputGroup></InputGroup>
      </div>
      <div style={{ width: 1200, margin: "0 auto", border: "1px solid red" }}>
        <Search></Search>
      </div>
    </div>
  );
}
