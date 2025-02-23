import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderFeed = createAsyncThunk(
  'orderFeed/getOrderFeed',
  getFeedsApi
);

type TOrderFeedState = {
  orderFeed: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderFeedState = {
  orderFeed: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderFeed.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? null;
      })
      .addCase(getOrderFeed.fulfilled, (state, { payload }) => {
        state.orderFeed = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.loading = false;
        state.error = null;
      });
  },
  selectors: {
    selectOrderFeed: (state) => state
  }
});

export const orderFeedReducer = orderFeedSlice.reducer;
export const { selectOrderFeed } = orderFeedSlice.selectors;