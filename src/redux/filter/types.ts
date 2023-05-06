export enum SortPropertyEnum {
  PRICE = 'price',
  TITLE = 'title',
  RATING = 'rating'
}

export enum OrderEnum {
  DESC = 'desc',
  ASC = 'asc',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
  type: number,
  search: string,
  title: string,
  activePage: number,
  order: OrderEnum,
  sort: SortType,
}

export interface FiltersProps {
  sortProperty: SortPropertyEnum,
  activePage: string,
  type: number,
  sort: SortType
}