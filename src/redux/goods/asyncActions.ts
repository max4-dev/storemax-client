import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { FetchGoodsProps, GoodItem } from "./types";

export const fetchGoods = createAsyncThunk<GoodItem[], FetchGoodsProps>('goods/fetchByIdStatus', async (props) => {
  const { category, sortFilter, searchValue, order } = props;
  
  const { data } = await axios.get<GoodItem[]>(`/goods?${category}&sortBy=${sortFilter}&order=${order}&${searchValue}`);

  // const { data } = await axios.get<GoodItem[]>(
  //   `https://638d373d4190defdb73ffb73.mockapi.io/items?${category}&sortBy=${sortFilter}&order=${order}&${searchValue}`,
  // );
  return data;
});

export const fetchCreateGoods = createAsyncThunk<GoodItem[], FetchGoodsProps>('goods/fetchCreateGoods', async (params) => {
  const { data } = await axios.post<GoodItem[]>(`/goods`, params);

  return data;
});

export const fetchDeleteGoods = createAsyncThunk('goods/fetchDeleteGoods', async (_id: string) => {
  const { data } = await axios.delete(`/goods/${_id}`);

  return data;
});