import React, { useState } from "react";
import { Button } from "antd";
import "./App.css";
import SkuCreator from "./component/SkuCreator";
import SkuSelect from "./component/SkuSelect";

let tempSKus: any = [];
const mockItemData = {
  title: "react-sku组件",
  minPrice: 1,
  itemId: "test_csdfdge8je3nnc",
};
const App = () => {
  const [skus, setSkus] = useState<any[]>([
    {
      key: 0,
      skuId: "98e5c522-ed1b-4778-8e3d-946cbdb79203",
      properties: [
        {
          name: "颜色",
          value: "red",
        },
        {
          name: "大小",
          value: "s",
        },
      ],
      price: "1",
      hold: 1,
    },
    {
      key: 1,
      skuId: "b2d924d7-a5ca-45f1-98a9-804ba0972e1b",
      properties: [
        {
          name: "颜色",
          value: "red",
        },
        {
          name: "大小",
          value: "m",
        },
      ],
      price: "1",
      hold: 1,
    },
    {
      key: 2,
      skuId: "28aade84-cf45-4c4b-b274-66256e394201",
      properties: [
        {
          name: "颜色",
          value: "red",
        },
        {
          name: "大小",
          value: "l",
        },
      ],
      price: "1",
      hold: 0,
    },
    {
      key: 3,
      skuId: "cc6bce64-7bae-4e8d-a8bd-238973493453",
      properties: [
        {
          name: "颜色",
          value: "yeellow",
        },
        {
          name: "大小",
          value: "s",
        },
      ],
      price: "1",
      hold: 0,
    },
    {
      key: 4,
      skuId: "b05e47e8-6ef7-464f-9697-10c48a80ad85",
      properties: [
        {
          name: "颜色",
          value: "yeellow",
        },
        {
          name: "大小",
          value: "m",
        },
      ],
      price: "1",
      hold: 1,
    },
    {
      key: 5,
      skuId: "3bbe24f9-d7e7-4eee-95c8-86ad790a3487",
      properties: [
        {
          name: "颜色",
          value: "yeellow",
        },
        {
          name: "大小",
          value: "l",
        },
      ],
      price: "1",
      hold: 1,
    },
  ]);
  const confirmSkus = () => {
    console.log("tempSKus", tempSKus);
    setSkus([...tempSKus]);
  };
  console.log("skus", skus);

  return (
    <div className="app">
      <div className="sku-creator-wrap">
        {/* <SkuCreator
          onChange={(skus) => {
            tempSKus = skus;
          }}
          skus={[]}
        />
        <Button type="primary" onClick={confirmSkus}>
          确认添加
        </Button> */}
      </div>
      <div style={{ background: "#f7f7f7" }}>
        <div className="sku-select-wrap">
          <SkuSelect
            optionsChange={(spec) => {
              console.log("点击的规格属性变化", spec);
            }}
            onPressConfirm={(data) => {
              console.info("提交的数据", data);
            }}
            data={{ skus, ...mockItemData }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
