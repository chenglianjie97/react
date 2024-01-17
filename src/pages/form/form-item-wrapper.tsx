import { Form as AntdForm, FormItemProps as AntdFormItemProps } from 'antd';
import { cloneElement, useContext } from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import { TOTAL_SPAN } from './constants';
import { FormItemContext } from './form-item-context';

type CustomControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  ControllerProps<TFieldValues, TName>,
  'render' | 'rules' | 'shouldUnregister' | 'defaultValue' | 'name'
>;

type CustomAntdFormItemProps = Omit<AntdFormItemProps, 'name'>;

export interface FormItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends CustomAntdFormItemProps,
    CustomControllerProps<TFieldValues, TName> {
  name?: TName;
}

/**
 * 扩展的 antd `FormItem`，增加了对栅格布局的感知能力
 *
 * 能够自动计算 FormItem 的大小，计算的时候会自动考虑 controlSpan 的大小
 *
 * 默认的 antd `Form.Item` 需要手动设置栅格大小，如果想要使用 Form 的栅格能力需要使用改组件替代
 */
export function FormItemWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormItemProps<TFieldValues, TName>) {
  const { name, control, ...restProps } = props;
  const { colspan, controlSpan, grid } = useContext(FormItemContext);

  let formItem = <AntdForm.Item name={name} {...restProps} />;

  if (grid) {
    formItem = (
      <AntdForm.Item
        name={name}
        wrapperCol={{
          ...props.wrapperCol,
          span:
            props.wrapperCol?.span ??
            (TOTAL_SPAN / colspan) * (colspan - 1) + controlSpan / colspan,
        }}
        {...restProps}
      />
    );
  }

  if (!name || !control) {
    return formItem;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState, formState }) => {
        const { isTouched, isDirty, invalid } = fieldState;
        const { isSubmitted } = formState;

        const shouldShowError =
          (isTouched || isDirty || isSubmitted) && invalid;

        const getValidateStatus = (): FormItemProps['validateStatus'] => {
          if (shouldShowError) {
            return 'error';
          }
        };

        return cloneElement(formItem, {
          validateStatus: getValidateStatus() ?? props.validateStatus,
        });
      }}
    />
  );
}
