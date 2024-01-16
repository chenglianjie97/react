import { Input, Select, Button } from "antd";
import { useForm } from "react-hook-form";
import { FormControl } from "./form-control";

export const FormDemo: React.FC = () => {
  const form = useForm();
  const { control, reset, handleSubmit, getValues, trigger, formState, setValue } = form;
  return (
    <div>
      <FormControl name="name" control={control}>
        <Input placeholder="请输入" style={{ width: 200 }}></Input>
      </FormControl>
      <FormControl name="year" control={control}>
        <Select
          placeholder="请选择"
          style={{ width: "130px" }}
          options={[
            {
              label: "2024",
              value: "2024",
            },
            {
              label: "2023",
              value: "2023",
            },
          ]}
          dropdownMatchSelectWidth={false}
        />
      </FormControl>
      <Button
        type="primary"
        onClick={handleSubmit((value) => {
          console.log("value", value);
        })}
      >
        提交
      </Button>
    </div>
  );
};
