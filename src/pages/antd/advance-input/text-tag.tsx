import { CloseCircleFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import clsx from "clsx";
import { CSSProperties, HTMLAttributes, MouseEventHandler, useMemo } from "react";

export interface TextTagProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  onPressTags?: MouseEventHandler<HTMLSpanElement>;
  onClear?: MouseEventHandler<HTMLSpanElement>;
  textTagStyles?: CSSProperties;
}
function splitValueItem(value: string) {
  return value.split("\n").filter((v) => {
    return v !== "";
  });
}
function TextTag(props: TextTagProps) {
  const { text, onPressTags, className, onClear, textTagStyles, ...restProps } = props;

  const convertText = useMemo(() => {
    const textNodes = splitValueItem(text);

    if (textNodes.length >= 1) {
      return `${textNodes[0]}`;
    }
    return ``;
  }, [text]);

  const lengthText = useMemo(() => {
    const textNodes = splitValueItem(text);
    if (textNodes.length > 1) {
      return `+${textNodes.length - 1}条`;
    } else {
      return ``;
    }
  }, [text]);

  return (
    <span className="ant-input-affix-wrapper" style={textTagStyles}>
      <div className={clsx("ant-input", className)} {...restProps}>
        <Tooltip title="点击编辑">
          <div
            onClick={onPressTags}
            style={{
              background: "#f0f0f0",
              color: "#595959",
            }}
            className="max-w-full flex-1 flex rounded px-1"
          >
            <span className="break-all cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
              {convertText}
            </span>
            <span className="break-keep whitespace-nowrap">{lengthText}</span>
          </div>
        </Tooltip>
      </div>
      <span className="ant-input-suffix" onClick={onClear}>
        <span className="ant-input-clear-icon" role="button" tabIndex={-1}>
          <CloseCircleFilled />
        </span>
      </span>
    </span>
  );
}

export default TextTag;
