import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDeleteGoods, fetchGoods } from './asyncActions';
import { GoodItem, GoodsSliceState, Status } from './types';

const initialState: GoodsSliceState = {
  items: [],
  status: Status.LOADING,
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<GoodItem[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGoods.pending, (state) => {
      state.status = Status.LOADING;
    })

    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })

    builder.addCase(fetchGoods.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    })

    // delete
    builder.addCase(fetchDeleteGoods.pending, (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.meta.arg)
    })
  }
});

export const { setItems } = goodsSlice.actions;
export default goodsSlice.reducer;
