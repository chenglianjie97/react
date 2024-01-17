import { FormItemProps } from 'antd';
import { set as lodashSet, template } from 'lodash-es';
import {
  Children,
  Fragment,
  ReactNode,
  cloneElement,
  isValidElement,
  useMemo,
} from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldError,
  FieldPath,
  UseFormStateReturn,
} from 'react-hook-form';
import { Form } from './form-grid';

export type FieldValues = Record<string, any>;

export interface FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<FormItemProps, 'rules' | 'name'>,
    Omit<ControllerProps<TFieldValues, TName>, 'render'> {
  render?: ControllerProps<TFieldValues, TName>['render'];
  afterAddon?: ReactNode;
  beforeAddon?: ReactNode;
}

export function FormControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormControlProps<TFieldValues, TName>) {
  const { name, control, defaultValue, rules, shouldUnregister } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState, formState }) => {
        return (
          <InnerFormItem
            {...props}
            field={field}
            fieldState={fieldState}
            formState={formState}
          ></InnerFormItem>
        );
      }}
    />
  );
}

export interface InnerFormItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends FormControlProps<TFieldValues, TName> {
  field: ControllerRenderProps<TFieldValues, TName>;

  fieldState: ControllerFieldState;

  formState: UseFormStateReturn<TFieldValues>;
}

export function InnerFormItem<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InnerFormItemProps<TFieldValues, TName>) {
  const {
    name,
    render,
    beforeAddon,
    afterAddon,
    field,
    fieldState,
    formState,
    rules,
    ...restProps
  } = props;

  const children = useMemo(() => {
    let child = render?.({ field, fieldState, formState });

    if (props.children && isValidElement(props.children)) {
      let onlyChild = Children.only(props.children);

      if (onlyChild.type === Fragment) {
        const fragmentChild = Children.only(onlyChild.props.children);
        onlyChild = fragmentChild;
      }

      const valuePropName = restProps.valuePropName ?? 'value';

      child = cloneElement(onlyChild, {
        ...field,
        [valuePropName]: field.value,
        onChange: (...args: unknown[]) => {
          onlyChild.props.onChange?.(...args);
          field.onChange(...args);
        },
        onBlur: (...args: unknown[]) => {
          onlyChild.props.onBlur?.(...args);
          field.onBlur();
        },
      } as any);
    }

    const beforeChild = beforeAddon && (
      <div className="flex-none">{beforeAddon}</div>
    );
    const afterChild = afterAddon && (
      <div className="flex-none">{afterAddon}</div>
    );

    if (beforeChild || afterChild) {
      return (
        <div className="w-full flex items-center">
          {beforeAddon && <div className="flex-none">{beforeAddon}</div>}
          <div className="flex-auto min-w-0">{child}</div>
          {afterAddon && <div className="flex-none">{afterAddon}</div>}
        </div>
      );
    }

    return child;
  }, [
    afterAddon,
    beforeAddon,
    field,
    fieldState,
    formState,
    props.children,
    restProps.valuePropName,
    render,
  ]);

  const validateStatus = useMemo(
    () => getValidateStatus(formState, fieldState),
    [formState, fieldState],
  );

  const help = useMemo(() => {
    return validateStatus === 'error'
      ? getErrorTip(name, restProps.label, fieldState.error)
      : void 0;
  }, [validateStatus, name, restProps.label, fieldState.error]);

  return (
    <Form.Item
      status="error"
      validateStatus={validateStatus}
      help={help}
      {...restProps}
    >
      {children}
    </Form.Item>
  );
}

export function shouldShowError<TFieldValues extends FieldValues = FieldValues>(
  formState: UseFormStateReturn<TFieldValues>,
  fieldState: ControllerFieldState,
) {
  const { isTouched, isDirty, invalid } = fieldState;
  const { isSubmitted } = formState;

  return (isTouched || isDirty || isSubmitted) && invalid;
}

export function getValidateStatus<
  TFieldValues extends FieldValues = FieldValues,
>(
  formState: UseFormStateReturn<TFieldValues>,
  fieldState: ControllerFieldState,
): FormItemProps['validateStatus'] {
  if (shouldShowError(formState, fieldState)) {
    return 'error';
  }
}

export function getErrorTip(
  name: string,
  label: ReactNode,
  error: FieldError | undefined,
) {
  if (!error) {
    return undefined;
  }

  if (!error.message) {
    return undefined;
  }

  const data = {};
  lodashSet(data, name, label);

  // 如果校验规则中未设置 label，则使用 Form.Item 的 label
  return template(error.message)(data);
}
