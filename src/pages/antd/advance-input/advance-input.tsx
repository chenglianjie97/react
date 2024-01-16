import { ReactNode, forwardRef, useState, CSSProperties } from "react";
import { TextAreaRef } from "antd/es/input/TextArea";
import useMergedState from "rc-util/lib/hooks/useMergedState";
import type { InputProps, TextAreaProps } from "antd/es/input";
import { Input, Modal, ModalProps } from "antd";
import TextTag from "./text-tag";
export interface AdvanceInputProps {
  disabled?: boolean;
  maxLength?: number;
  textarea: TextAreaProps;
  input?: InputProps;
  modal: ModalProps;
  label?: ReactNode;
  defaultValue?: string | number | undefined;
  value?: string | number | undefined;
  // 弹窗上面的附加组件
  extra?: ReactNode;
  onChange?: (text: string | undefined) => void;
  onPressEnter?: () => void;
  textTagStyles?: CSSProperties;
}
export const AdvanceInput = forwardRef<TextAreaRef, AdvanceInputProps>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useMergedState(props.defaultValue, {
    value: props.value,
  });
  const {
    maxLength,
    extra,
    modal: modalProps,
    label,
    textarea: textareaProps,
    input: inputProps,
    onChange,
    textTagStyles,
  } = props;
  const { onDoubleClick, onChange: onInputChange, ...restInputProps } = inputProps ?? {};
  const { onChange: onTextAreaChange, ...restTextareaProps } = textareaProps;
  const { onCancel, onOk, ...restModalProps } = modalProps;
  function fixControlledValue<T>(value: T) {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return String(value);
  }
  function showMultipleText(value: string) {
    const codes = value.split("\n").filter((v) => {
      return v !== "";
    });
    return codes.length > 1;
  }
  function onClear() {
    setValue("");
    if (typeof onChange === "function") {
      onChange("");
    }
  }

  function onEdit() {
    setOpen(true);
  }
  return (
    <>
      {showMultipleText(fixControlledValue(value)) ? (
        <TextTag
          text={fixControlledValue(value)}
          onPressTags={onEdit}
          onClear={onClear}
          textTagStyles={{ width: 280 }}
        />
      ) : (
        <Input
          allowClear
          maxLength={maxLength ?? 1000}
          placeholder="双击可批量输入"
          value={fixControlledValue(value)}
          onChange={(e) => {
            if (props.value === undefined) {
              setValue(e.target.value);
            }
            if (typeof onInputChange === "function") {
              onInputChange(e);
            }
            if (typeof onChange === "function") {
              onChange(e.target.value);
            }
          }}
          onDoubleClick={(e) => {
            setOpen(true);
          }}
          onPressEnter={() => {
            props.onPressEnter?.();
          }}
          style={{ width: 280 }}
          {...restInputProps}
        />
      )}
      <Modal
        open={open}
        onCancel={(e) => {
          setOpen(false);
          if (typeof onCancel === "function") {
            onCancel(e);
          }
        }}
        onOk={(e) => {
          setOpen(false);
          if (typeof onOk === "function") {
            onOk(e);
          }
        }}
        {...restModalProps}
      >
        <div>
          {extra}
          {label && <div>{label}</div>}
          <Input.TextArea
            ref={ref}
            rows={4}
            wrap="off"
            value={fixControlledValue(value)}
            onChange={(e) => {
              if (props.value === undefined) {
                setValue(e.target.value);
              }
              if (typeof onTextAreaChange === "function") {
                onTextAreaChange(e);
              }
              if (typeof onChange === "function") {
                onChange(e.target.value);
              }
            }}
            {...restTextareaProps}
          ></Input.TextArea>
        </div>
      </Modal>
    </>
  );
});
