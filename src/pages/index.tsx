import { Menu } from "antd";
import { InputGroup } from "./antd";
import { FormDemo } from "./form-control/form";
import "antd/dist/antd.css";
export default function HomePage() {
  return (
    <div>
      <h2>组件</h2>
      <div>
        <InputGroup></InputGroup>
        <FormDemo></FormDemo>
      </div>
    </div>
  );
}
