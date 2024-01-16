import { Input, Select } from "antd";
import { AdvanceInput } from "./advance-input/advance-input";
export const InputGroup: React.FC = () => {
  return (
    <div style={{ padding: 4, width: 400 }}>
      <Input.Group compact>
        <Select style={{ width: 100 }} options={[{ label: "采购单", value: 1 }]}></Select>
        <AdvanceInput
          modal={{
            title: "批量查询",
          }}
          textarea={{
            placeholder: "每行输入一个搜索条件",
          }}
        ></AdvanceInput>
      </Input.Group>
    </div>
  );
};
