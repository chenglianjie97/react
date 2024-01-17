import { Input } from "antd";
import { Form } from "./form/form-grid";
import { useForm } from "react-hook-form";
export const Search: React.FC = () => {
  const form = useForm();
  const { control, reset, handleSubmit, getValues, trigger, formState, setValue } = form;
  return (
    <Form grid dense columns={8}>
      <Form.GridItem>
        <Form.Control control={control} name="supplier_title" label="供应商">
          <Input></Input>
        </Form.Control>
      </Form.GridItem>
    </Form>
  );
};
