import { Form as AntdForm, Col, ColProps } from 'antd';
import {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FormGridContext } from './form-grid-context';
import { FormItemContext } from './form-item-context';
import { itemId } from './utils';

export interface FormGridItemProps {
  flex?: ColProps['flex'];
  /**
   * 栅格占位格数
   */
  span?: number;
  /**
   * 栅格左侧的间隔格数，间隔内不可以有栅格
   */
  offset?: number;
  /**
   * 占据的栏位数，如果设置了 `span`，则该属性无效
   *
   * 会自动考虑 controlColspan 的宽度，跨越多栏也会保证尾部整齐
   *
   * 默认 1 栏
   */
  colspan?: number;
  /**
   * 偏移的栏位数，如果设置了 `offset`，则该属性无效
   *
   * 默认不偏移
   */
  coloffset?: number;
  /**
   * 是否为吊尾元素
   *
   * 吊尾元素会自动占据剩余的空间，若控件不足则会另起一行
   */
  tailing?: boolean;
}

/**
 * 表单栅格布局的布局单元，会自动服从 `Form` 中的 `columns` 参数分配的栅格大小
 */
export const FormGridItem: FC<PropsWithChildren<FormGridItemProps>> = (
  props,
) => {
  const colspan = props.colspan ?? 1;
  const coloffset = props.coloffset ?? 0;
  const idRef = useRef(itemId());
  const [visible, setVisible] = useState(true);
  const { span, controlSpan, formGridRef } = useContext(FormGridContext);

  useEffect(() => {
    const id = idRef.current;

    // 初始化的时候以及配置发生变化的时候会重新注册表单项
    // TODO：这里实现并不完全，表单项还可以通过 span 来自定义宽度，这里没有考虑这种情况
    // 这个功能一般用在查询表单中，查询表单一般不怎么会用到自定义宽度
    formGridRef.register(id, {
      id: id,
      colspan,
      tailing: props.tailing ?? false,
      disabled: false,
      onToggle: (v) => {
        setVisible(v);
      },
    });

    return () => {
      formGridRef.unregister(id);
    };
  }, [colspan, props.tailing, formGridRef]);

  if (!visible) {
    return null;
  }

  if (props.tailing) {
    return (
      <FormItemContext.Provider value={{ colspan, controlSpan, grid: true }}>
        <div className="flex items-end justify-end flex-auto px-1">
          <AntdForm.Item>{props.children}</AntdForm.Item>
        </div>
      </FormItemContext.Provider>
    );
  }

  const colProps: ColProps = {
    offset: props.offset ?? coloffset * span,
  };

  if (props.flex) {
    colProps.flex = props.flex;
  } else {
    colProps.span = props.span ?? colspan * span;
  }

  return (
    <FormItemContext.Provider value={{ colspan, controlSpan, grid: true }}>
      <Col {...colProps}>{props.children}</Col>
    </FormItemContext.Provider>
  );
};
