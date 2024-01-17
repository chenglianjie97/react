import { Form as AntdForm, FormProps as AntdFormProps, Row } from "antd";
import { FormGridContext } from "./form-grid-context";
import clsx from "clsx";
import { Children, ReactNode, useEffect, useMemo, useRef } from "react";
import { DEFAULT_COLUMNS, DEFAULT_GUTTER, TOTAL_SPAN } from "./constants";
import { FormGridRef } from "./form-grid-ref";
import { FormControl } from "./form-control";
import { FormGridItem } from "./form-grid-item";
import { FormItemWrapper } from "./form-item-wrapper";
import S from "./form.module.less";
/**
 * 可用的栏目数
 */
export type ValidColumns = 1 | 2 | 3 | 4 | 6 | 8 | 12;
export interface FormGridProps<TValues = any> extends Omit<AntdFormProps<TValues>, "children"> {
  /**
   * 开启后将支持网格化布局
   *
   * 默认需要使用 `FormGridItem` 对表单控件进行网格化布局
   *
   * 使用 `auto` 已开启自动化网格布局
   */
  grid?: boolean | "auto";
  /**
   * 表单的栏数
   *
   * 默认为 1 栏
   */
  columns?: ValidColumns;
  /**
   * 栏间距
   *
   * 默认为 16px
   */
  gutter?: number;
  /**
   * 表单控件宽度，用分数表示
   *
   * 默认为 1
   */
  controlColspan?: "1/2" | "3/4" | "1";
  /**
   * 表单吊尾元素
   *
   * 可以放置按钮之类的一些东西
   */
  tail?: ReactNode;
  /**
   * 这个 children 不再支持 antd form 的 render props 用法
   */
  children?: any;
  /**
   * 使用紧凑的风格
   */
  dense?: boolean;
  /**
   * 是否收起列表
   */
  collapsed?: boolean;
  /**
   * 初始展示行数(默认一行，采购单列表需要默认展示两行)
   */
  initialDisplayRows?: number;
}
function FormGrid<TValues = any>(props: FormGridProps<TValues>) {
  let {
    grid,
    columns,
    gutter,
    controlColspan,
    tail,
    children,
    wrapperCol,
    dense,
    collapsed,
    initialDisplayRows,
    ...restProps
  } = props;
  const _columns = columns ?? DEFAULT_COLUMNS;
  const span = TOTAL_SPAN / _columns;
  gutter ??= DEFAULT_GUTTER;
  const formGridRef = useRef(
    new FormGridRef({
      collapsed: collapsed ?? false,
      columns: _columns,
      gird: !!grid,
      initialDisplayRows: initialDisplayRows ?? 1,
    })
  );
  useEffect(() => {
    formGridRef.current.collapsed = collapsed ?? false;
    formGridRef.current.columns = _columns;
  }, [collapsed, _columns]);
  let controlSpan = TOTAL_SPAN;
  switch (controlColspan ?? "1") {
    case "1/2":
      controlSpan = TOTAL_SPAN * 0.5;
      break;
    case "3/4":
      controlSpan = TOTAL_SPAN * 0.75;
      break;
    case "1":
      controlSpan = TOTAL_SPAN;
      break;
    default:
      console.warn("controlColspan 只能取 1, 1/2 或 3/4 其中之一");
  }
  if (grid) {
    wrapperCol ??= {};
    wrapperCol.span = controlSpan;
  }
  /**
   * 只有有效的 `grid` 参数才会开启栅格化表单
   */
  children = useMemo(() => {
    if (!grid) {
      return props.children;
    }

    if (grid === true) {
      return (
        <FormGridContext.Provider value={{ grid, span, controlSpan, formGridRef: formGridRef.current }}>
          <Row gutter={gutter}>{props.children}</Row>
        </FormGridContext.Provider>
      );
    }
    // if (grid === 'auto') {
    //   return (
    //     <FormGridContext.Provider
    //       value={{ grid, span, controlSpan, formGridRef: formGridRef.current }}
    //     >
    //       <Row gutter={gutter}>
    //         {Children.map(props.children, (child) => (
    //           <FormGridItem>{child}</FormGridItem>
    //         ))}
    //         {tail && <FormGridItem tailing>{tail}</FormGridItem>}
    //       </Row>
    //     </FormGridContext.Provider>
    //   );
    // }
  }, [props.children, grid, span, controlSpan, tail, gutter]);
  return (
    <AntdForm
      layout="vertical"
      wrapperCol={wrapperCol}
      {...restProps}
      className={clsx(restProps.className, {
        [S.dense]: dense,
      })}
    >
      {children}
    </AntdForm>
  );
}
FormGrid.GridItem = FormGridItem;
FormGrid.Item = FormItemWrapper;
FormGrid.Control = FormControl;
export { FormGrid as Form };
