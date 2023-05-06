import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRegister, fetchUserData, fetchAuthMe } from './asyncActions';
import { AuthSliceState, Status } from './types';
import { RootState } from '../store';

const initialState: AuthSliceState = {
  data: null,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null;
    }
  },

  extraReducers: (builder) => {
    //login
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = Status.LOADING;
    })

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    })

    builder.addCase(fetchUserData.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
    })

    //get user
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = Status.LOADING;
    })

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    })

    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = Status.ERROR;
    })
    
    //register
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = Status.LOADING;
    })

    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    })

    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
    })
  }
});

export const {logOut} = authSlice.actions;

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data)

export default authSlice.reducer;
