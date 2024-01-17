import { ColProps } from 'antd';
import { FormGridItemProps } from './form-grid-item';

export function getColspan(colspan?: number) {
  return colspan ?? 1;
}

export function getColProps(
  props: FormGridItemProps,
  colspan: number,
  span: number,
) {
  const coloffset = props.coloffset ?? 0;

  const colProps: ColProps = {
    offset: props.offset ?? coloffset * span,
  };

  if (props.flex) {
    colProps.flex = props.flex;
  } else {
    colProps.span = props.span ?? colspan * span;
  }

  return colProps;
}

export function itemId() {
  return `${Date.now()}$${Math.floor(Math.random() * 10000)}`;
}
