import { createContext } from 'react';

export interface FormItemContextValues {
  grid: boolean;
  colspan: number;
  controlSpan: number;
}

export const FormItemContext = createContext<FormItemContextValues>({
  grid: false,
  colspan: 1,
  controlSpan: 24,
});
