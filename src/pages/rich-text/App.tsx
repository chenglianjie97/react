import data from "./data.json";
import { ProductDto } from "./data.dto";
import { Checkbox } from "antd";
import { useMemo, useState } from "react";

const productDto: ProductDto = data;
const skus = productDto.productInfo.skuInfos;

function App() {
  const [value, setValue] = useState<Map<string, string | undefined>>(new Map());

  // 从所有可用的 SKU 构造出所有可选的规格
  const allSpecMap = useMemo(() => {
    const specMap = new Map<string, Set<string>>();

    skus.forEach((sku) => {
      sku.attributes.forEach((attr) => {
        const attrs = specMap.get(attr.attributeDisplayName) ?? new Set();
        attrs.add(attr.attributeValue);
        specMap.set(attr.attributeDisplayName, attrs);
      });
    });

    return specMap;
  }, [skus]);

  // 根据已选的规格值过滤出相兼容的 SKU
  const validSkus = useMemo(() => {
    return skus.filter((sku) => {
      // 比较所有的属性，只有所有属性都满足才算
      return sku.attributes.every((attr) => {
        // 如果当前规格用户未选中，则无所谓，自动满足要求
        if (value.get(attr.attributeDisplayName) == null) {
          return true;
        }

        // 如果属性值相等就说明是兼容的
        return value.get(attr.attributeDisplayName) === attr.attributeValue;
      });
    });
  }, [value]);

  // 根据可选的 SKU，再构造出可选的各种规格的范围
  const validSpecMap = useMemo(() => {
    const specMap = new Map<string, Set<string>>();

    validSkus.forEach((sku) => {
      sku.attributes.forEach((attr) => {
        const attrs = specMap.get(attr.attributeDisplayName) ?? new Set();
        attrs.add(attr.attributeValue);
        specMap.set(attr.attributeDisplayName, attrs);
      });
    });

    return specMap;
  }, [validSkus]);

  return (
    <ul>
      {Array.from(allSpecMap).map(([specName, specs]) => {
        return (
          <li key={specName}>
            <h3>{specName}</h3>
            <Checkbox.Group
              value={value.get(specName) ? [value.get(specName)!] : []}
              options={Array.from(specs).map((item) => ({
                label: item,
                value: item,
                disabled: !validSpecMap.get(specName)?.has(item),
              }))}
              onChange={(checkedKeys) => {
                const [key1, key2] = checkedKeys;
                const newValue = new Map(value);

                if (key1 != null && key2 == null) {
                  newValue.set(specName, key1);
                } else if (key1 != null && key2 != null) {
                  newValue.set(specName, key2);
                } else {
                  newValue.set(specName, void 0);
                }

                console.log(newValue);

                setValue(newValue);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default App;
