import { createContext } from "react";
import { FormGridRef } from "./form-grid-ref";

export interface FormGridContextValues {
  grid: boolean | "auto";
  span: number;
  controlSpan: number;
  formGridRef: FormGridRef;
}

export const FormGridContext = createContext<FormGridContextValues>({
  grid: false,
  span: 24,
  controlSpan: 24,
  formGridRef: new FormGridRef({
    collapsed: false,
    columns: 1,
    gird: false,
  }),
});
