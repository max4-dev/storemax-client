import { RootState } from "../store";

export const selectTotalCount = (state: RootState) => state.cart.totalCount;