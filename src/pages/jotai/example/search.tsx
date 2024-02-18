import { Input } from "antd";
import { atom, useAtom } from "jotai";
export let searchText = atom("");
export const Search: React.FC = () => {
  const [text, setText] = useAtom(searchText);
  return (
    <div>
      <Input
        style={{ width: "200px" }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};
