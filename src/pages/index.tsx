import "antd/dist/antd.css";
import { Example, Example2 } from "./jotai";
import { RowSelectTable } from "./tanstack-table";
export default function HomePage() {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h2>练习场</h2>
      <div style={{ margin: "20px auto", width: "1000px", border: "1px solid red" }}>
        {/* jotai 练习 */}
        {/* <Example></Example> */}
        <Example2></Example2>
        <RowSelectTable></RowSelectTable>
      </div>
    </div>
  );
}
