import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderHistory = createAsyncThunk(
  'orderHistory/getOrderHistory',
  getOrdersApi
);

type TOrderHistoryState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TOrderHistoryState = {
  orders: [],
  loading: false,
  error: null
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderHistory.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? null;
      })
      .addCase(getOrderHistory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload;
      });
  },
  selectors: {
    selectOrderHistory: (state) => state
  }
});

export const orderHistoryReducer = orderHistorySlice.reducer;
export const { selectOrderHistory } = orderHistorySlice.selectors;