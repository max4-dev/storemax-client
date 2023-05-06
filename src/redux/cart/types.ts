import { GoodItem } from "../goods/types";

export interface CartSliceState {
  items: GoodItem[],
  totalCount: number,
  totalPrice: number,
}