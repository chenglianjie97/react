import { Button } from "antd";
import _ from "lodash";
import { FC, useState, useEffect } from "react";

import "./index.scss";

export type SpecItem = {
  select: boolean;
  value: string;
  disable?: boolean;
};
type SkuItem = {
  key: number | string;
  price: number | string;
  hold: number;
  skuId: string;
  properties: { name: string; value: string }[];
  [key: string]: any;
};
type Data = {
  skus: SkuItem[];
  [key: string]: any;
};
export type Spec = {
  [key: string]: SpecItem[];
};
type PostBody = {
  skuId: string;
  itemId: string;
  // num: number;
};
interface Props {
  /** 商品数据 */
  data: Data;
  /** 点击确定按钮 */
  onPressConfirm?: (p: PostBody) => void;
  /** 所选规格变化触发 */
  optionsChange?: (s: Spec) => void;
}
const SkuSelect: FC<Props> = (props) => {
  const { data, optionsChange, onPressConfirm } = props;
  const [spec, setSpec] = useState<Spec>({});
  // 是否可以点击确定按钮
  const [canFlag, setCanFlag] = useState(false);
  // const [skuHold, setSkuHold] = useState(0);
  useEffect(() => {
    initSkuSelect();
  }, [data]);
  /**
   * 通过skus初始化 各个规格
   */
  const initSkuSelect = () => {
    console.log("初始化时的data", data);
    const skus = data?.skus;
    const _spec = data?.spec;
    let _tags: Spec = {};
    // 用于初始化默认选项
    if (_spec) {
      _tags = _spec;
    } else {
      const _tempTagsStrArray: any = {}; // 临时字符串数组
      skus?.forEach((s) => {
        s?.properties?.forEach((p) => {
          if (!_tags[p.name]) {
            _tags[p.name] = [];
            _tempTagsStrArray[p.name] = [];
          }
          if (!_tempTagsStrArray[p.name].includes(p.value)) {
            _tempTagsStrArray[p.name].push(p.value);
            _tags[p.name].push({
              value: p.value,
              disable: false,
              select: false,
            });
          }
        });
      });
    }
    let _canFlag = !data.canFlag ? false : true;
    if (skus?.length === 1 && !skus[0].properties?.length && skus[0].hold <= 0) {
      _canFlag = false;
    }
    setCanFlag(_canFlag);
    // 判断属性是否可以点击
    setSpecDisable(_tags);
  };
  /**
   *
   * @param _spec 规格属性
   * @param sk 该sku下的 sk这个key的值
   *
   * 不传sk的话返回所有信息
   */
  const getSkuInfoByKey = (_spec: Spec, sk?: string) => {
    // 已选的规格：[{ name:规格名称, value:已选规格内容 }]
    const selectedSpec: { name: string; value: string }[] = [];
    Object.keys(_spec).forEach((k) => {
      const selectedValue = _spec[k].find((sv) => sv.select);
      if (selectedValue) {
        // 这块部分也可以在选择的时候直接处理
        selectedSpec.push({
          name: k,
          value: selectedValue.value,
        });
      }
    });
    // 在规格没有全选的情况下 不执行查询操作
    if (selectedSpec.length !== Object.keys(_spec).length) {
      return;
    }
    const { skus } = data;
    const querySku = skus.find((sku) => {
      // 对比两个数组找到 两个都不存在的sku 如果为0 则说明完全匹配就是该sku
      const diffSkus = _.xorWith(selectedSpec, sku.properties, _.isEqual);
      return !diffSkus.length;
    });
    if (querySku && querySku[sk ?? ""]) {
      return querySku[sk ?? ""];
    } else if (querySku) {
      return querySku;
    } else {
      return null;
    }
  };
  /** 判断是否可以添加进购物车，比如属性是否有选，库存情况等 */
  const judgeCanAdd = (skus: any[] | undefined) => {
    const sks = Object.keys(spec);
    let s = sks.filter((sk) => spec[sk].some((sv) => sv.select)).length; // 已经选择的规格个数
    let _cf = s === sks.length;
    if (!skus || !skus.length) {
      _cf = false;
    }
    if (skus?.length === 1 && !skus[0]?.properties?.length && skus[0].hold <= 0) {
      _cf = false;
    }
    setCanFlag(_cf);
    return _cf;
  };
  /** 用于规格都没选中的时候 设置那些规格是否可以点击，该路径上如果跟该属性的组合没库存则该属性不能点击 */
  const setSpecDisable = (tags: any) => {
    const { skus } = data;
    Object.keys(tags).forEach((sk) => {
      tags[sk].forEach((sv: SpecItem) => {
        const currentSpec = `${sk}:${sv.value}`;
        // 找到含有该规格的路径下 库存不为0的 sku
        const querySku = skus.find((sku) => {
          const queryProperty = sku.properties.find((sp) => `${sp.name}:${sp.value}` === currentSpec);
          return queryProperty && sku.hold;
        });
        // 如果找到对应该属性的路径，sku有不为0 的则可选
        sv.disable = !querySku;
      });
    });
    setSpec({ ...tags });
  };
  /**
   * 核心代码
   * @param selectedSpec 已选中的数组
   * @param currentSpecName 当前点击的规格的名称
   */
  const skuCore = (selectedSpec: string[], attrName?: string) => {
    const { skus } = data;
    Object.keys(spec).forEach((sk: string) => {
      if (sk !== attrName) {
        console.log("sk", sk);
        // 找出该规格中选中的值
        const currentSpecSelectedValue = spec[Object.keys(spec).find((_sk) => sk === _sk) || ""].find(
          (sv) => sv.select
        );
        console.log("currentSpecSelectedValue", currentSpecSelectedValue);
        spec[sk].forEach((sv: SpecItem) => {
          // 判断当前的规格的值是否是选中的，如果是选中的 就不要判断是否可以点击直接跳过循环
          if (!sv.select) {
            const _ssTemp = [...selectedSpec];
            // 如果当前规格有选中的值
            if (!!currentSpecSelectedValue) {
              const sIndex = _ssTemp.findIndex((_sv) => _sv === `${sk}:${currentSpecSelectedValue.value}`);
              _ssTemp.splice(sIndex, 1);
            }
            _ssTemp.push(`${sk}:${sv.value}`);
            const _tmpPath: SkuItem[] = [];
            console.log("_ssTemp", _ssTemp);
            // 找到包含该路径的全部sku
            skus.forEach((sku: SkuItem) => {
              // 找出skus里面包含目前所选中的规格的路径的数组的数量
              const querSkus = _ssTemp.filter((_sst: string) => {
                const querySpec = sku.properties.some((p) => {
                  return `${p.name}:${p.value}` === _sst;
                });
                return querySpec;
              });
              const i = querSkus.length;
              if (i === _ssTemp.length) {
                _tmpPath.push(sku); // 把包含该路径的sku全部放到一个数组里
              }
            });
            console.log("_tmpPath", _tmpPath);
            const hasHoldPath = _tmpPath.find((p) => p.hold); // 判断里面是要有个sku不为0 则可点击
            let isNotEmpty = hasHoldPath ? hasHoldPath.hold : 0;
            sv.disable = !isNotEmpty;
          }
        });
      }
    });
    judgeCanAdd(skus);
  };
  /** 规格选项点击事件 */
  const onPressSpecOption = (attrName: string, attrObj: any) => {
    let isCancel = false;
    // setCount(1);
    // 找到在全部属性spec中对应的属性
    const currentSpects = spec[Object.keys(spec).find((sk) => sk === attrName) || ""] || [];
    // 判断是否有上一个被选中的的属性
    const prevSelectedSpectValue: any = currentSpects.find((cspec) => cspec.select) || {};
    // 设置前一个被选中的值为未选中
    prevSelectedSpectValue.select = false;
    // 只有当当前点击的属性值不等于上一个点击的属性值时候设置为选中状态
    if (prevSelectedSpectValue === attrObj) {
      isCancel = true;
    } else {
      // 设置当前点击的状态为选中
      attrObj.select = true;
    }
    // 全部有选中的规格数组
    const selectedSpec = Object.keys(spec)
      .filter((sk: string) => spec[sk].find((sv) => sv.select))
      .reduce((prev: string[], currentSpecKey) => {
        return [...prev, `${currentSpecKey}:${spec[currentSpecKey].find((__v) => __v.select)?.value}`];
      }, []);
    console.log("selectedSpec", selectedSpec);
    if (isCancel) {
      // 如果是取消且全部没选中
      if (!selectedSpec.length) {
        // 初始化是否可点
        setSpecDisable(spec);
      }
    }
    // 如果规格中有选中的 则对整个规格就行 库存判断 是否可点
    if (selectedSpec.length) {
      skuCore(selectedSpec, attrName);
    }
    setSpec({ ...spec });
    // 如果props传了属性变化的函数，就调用
    optionsChange && optionsChange(spec);
  };
  /**
   * 点击确认按钮
   */
  const onPressConfirmButton = () => {
    if (!judgeCanAdd(data?.skus)) {
      return;
    }
    const skuId = getSkuInfoByKey(spec, "skuId");
    const postData: PostBody = {
      skuId,
      itemId: data?.itemId,
    };
    onPressConfirm?.(postData);
  };
  console.log("spec", spec);
  return (
    <div className="drawer-inner">
      <div className="prod-info">
        <div className="prod-img">
          <img alt="" src={data.image} />
        </div>
        <div className="content">
          <div className="item-title">{data.title}</div>
          <div>
            <div className="price-wrap">
              <span>¥{22}</span>
            </div>
            <div className="sku-hold">库存 {2} 件</div>
          </div>
        </div>
      </div>
      <div className="spec-inner">
        {Object.keys(spec).map((attrName, index) => {
          return (
            <div key={`${index + 1}`} className="items">
              {/* 属性名称 */}
              <div className="title">{attrName}</div>
              <div className="tags">
                {spec[attrName].map((attrObj, index) => {
                  return (
                    <div
                      key={`${index + index}`}
                      onClick={() => !attrObj.disable && onPressSpecOption(attrName, attrObj)}
                      className={attrObj.select ? "tag active" : attrObj.disable ? "tag disable" : "tag"}
                    >
                      {attrObj.value}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="btn-wrap">
          <Button disabled={!canFlag} type="primary" onClick={onPressConfirmButton}>
            确认
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkuSelect;
