import { searchText } from "./search";
import { useAtom } from "jotai";
import { Button } from "antd";
export const Main: React.FC = () => {
  const [text, setText] = useAtom(searchText);
  return (
    <div>
      显示组件 <div>{text}</div>
      <Button
        onClick={() => {
          setText("88");
        }}
      >
        按钮
      </Button>
    </div>
  );
};
