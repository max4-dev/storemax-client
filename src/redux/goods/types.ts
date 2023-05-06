import { OrderEnum, SortPropertyEnum } from "../filter/types"

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'rejected',
}

export type GoodItem = {
  _id: string,
  imageUrl: string,
  title: string,
  price: number,
  category: number,
  rating: number,
  count: number
}

export type FetchGoodsProps = {
  category: string,
  sortFilter: SortPropertyEnum,
  searchValue: string,
  order: OrderEnum,
}

export interface GoodsSliceState {
  items: GoodItem[],
  status: Status,
}