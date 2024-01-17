export interface FormGirdItemData {
  id: string;

  /**
   * 表单项所占列数
   */
  colspan: number;

  /**
   * 是否是尾部
   *
   * 尾部的表单项总是可见
   */
  tailing?: boolean;

  /**
   * 是否停用，停用掉的表单项不可见
   */
  disabled?: boolean;

  /**
   * 停用表单项的回调
   * @param disabled 是否停用
   * @returns
   */
  onToggle?: (disabled: boolean) => void;
}

export interface FormGridRefConfig {
  /**
   * 一行总列数
   */
  columns: number;
  /**
   * 是否开启栅格化
   */
  gird: boolean;
  /**
   * 是否折叠状态
   */
  collapsed: boolean;
  /**
   * 初始展示行数(默认一行，采购单列表需要默认展示两行)
   */
  initialDisplayRows?: number;
}

export class FormGridRef {
  private items = new Map<string, FormGirdItemData>();

  private tailingItems = new Map<string, FormGirdItemData>();

  private _columns: number;

  private _grid: boolean;

  private _collapsed: boolean;

  private _initialDisplayRows: number;

  /**
   * 一行总列数
   */
  get columns() {
    return this._columns;
  }

  set columns(v: number) {
    if (this._columns === v) {
      return;
    }

    this._columns = v;
    this.recalculate();
  }

  /**
   * 是否折叠状态
   */
  get collapsed() {
    return this._collapsed;
  }

  set collapsed(v: boolean) {
    if (this._collapsed === v) {
      return;
    }

    this._collapsed = v;
    this.recalculate();
  }

  constructor(config: FormGridRefConfig) {
    this._columns = config.columns;
    this._grid = config.gird;
    this._collapsed = config.collapsed;
    this._initialDisplayRows = config.initialDisplayRows ?? 1;
  }

  /**
   * 注册表单项
   * @param id 表单项 ID
   * @param data 表单项的配置信息
   */
  register(id: string, data: FormGirdItemData) {
    if (data.tailing) {
      this.tailingItems.set(id, data);
    } else {
      this.items.set(id, data);
    }

    this.recalculate();
  }

  /**
   * 移除表单项
   * @param id 需要移除的表单项 ID
   */
  unregister(id: string) {
    const data = this.items.get(id);

    if (data) {
      data.disabled = true;
    }

    const tail = this.tailingItems.get(id);

    if (tail) {
      tail.disabled = true;
    }

    this.recalculate();
  }

  /**
   * 重新计算展示的项
   *
   * 当影响布局的参数发生改变的时候需要重新计算
   * @returns
   */
  private recalculate() {
    if (!this._grid) {
      return;
    }

    let remainedColumns = this._columns * this._initialDisplayRows;

    // 先扣除尾部表单项的列数，尾部表单总是可见
    for (const item of this.tailingItems.values()) {
      if (item.disabled) {
        continue;
      }

      remainedColumns -= item.colspan;
    }

    for (const item of this.items.values()) {
      if (item.disabled) {
        continue;
      }

      if (this.collapsed) {
        if (remainedColumns >= item.colspan) {
          item.onToggle?.(true);
        } else {
          item.onToggle?.(false);
        }

        remainedColumns -= item.colspan;
      } else {
        item.onToggle?.(true);
      }
    }
  }
}
