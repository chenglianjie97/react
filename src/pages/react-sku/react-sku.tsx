import React, { useState } from "react";
import { Button } from "antd";
import "./App.css";
import SkuCreator from "./component/SkuCreator";
import SkuSelect from "./component/SkuSelect";
const defaultSku = [
  {
    key: 0,
    skuId: "8665a4d9-e889-4f6c-9cac-97a1948e06b5",
    properties: [
      {
        name: "颜色",
        value: "红色",
      },
      {
        name: "尺码",
        value: "s",
      },
    ],
    hold: 1,
    price: "1",
  },
  {
    key: 1,
    skuId: "19feeaa6-5be5-412c-be9a-4b1f72251e58",
    properties: [
      {
        name: "颜色",
        value: "红色",
      },
      {
        name: "尺码",
        value: "xxl",
      },
    ],
    hold: 0,
    price: "1",
  },
  {
    key: 2,
    skuId: "b4e0c50a-ab2e-477a-b6da-66e926d5c854",
    properties: [
      {
        name: "颜色",
        value: "红色",
      },
      {
        name: "尺码",
        value: "m",
      },
    ],
    hold: 0,
    price: "1",
  },
  {
    key: 3,
    skuId: "c8c707c4-f8a0-4fe1-8a0e-62bfdceecc53",
    properties: [
      {
        name: "颜色",
        value: "黄色",
      },
      {
        name: "尺码",
        value: "s",
      },
    ],
    hold: 1,
    price: "1",
  },
  {
    key: 4,
    skuId: "0d96f107-6897-4ab0-94c9-b9aec2244b48",
    properties: [
      {
        name: "颜色",
        value: "黄色",
      },
      {
        name: "尺码",
        value: "xxl",
      },
    ],
    hold: 0,
    price: "1",
  },
  {
    key: 5,
    skuId: "28fa36bd-b9cd-43ec-bbcd-667579b7432f",
    properties: [
      {
        name: "颜色",
        value: "黄色",
      },
      {
        name: "尺码",
        value: "m",
      },
    ],
    hold: 0,
    price: "1",
  },
  {
    key: 6,
    skuId: "19c56871-2a1d-42aa-be9c-55ddbda4dbd1",
    properties: [
      {
        name: "颜色",
        value: "黑色",
      },
      {
        name: "尺码",
        value: "s",
      },
    ],
    hold: 0,
    price: "1",
  },
  {
    key: 7,
    skuId: "398db150-d855-4bfd-8d5d-44c0a18094be",
    properties: [
      {
        name: "颜色",
        value: "黑色",
      },
      {
        name: "尺码",
        value: "xxl",
      },
    ],
    hold: 0,
    price: "1",
  },
];
let tempSKus: any = [];
const mockItemData = {
  title: "react-sku组件",
  minPrice: 1,
  itemId: "test_csdfdge8je3nnc",
};
const App = () => {
  const [skus, setSkus] = useState<any[]>(defaultSku);
  const confirmSkus = () => {
    setSkus([...tempSKus]);
    console.log([...tempSKus]);
  };
  return (
    <div className="app">
      <div style={{ background: "#f7f7f7" }}>
        <div className="sku-select-wrap">
          <SkuSelect
            optionsChange={(spec) => {
              // console.log("点击的规格属性变化", spec);
            }}
            onPressConfirm={(data) => {
              console.info("提交的数据", data);
            }}
            data={{ skus: defaultSku, ...mockItemData }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
