import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (ingredients: string[]) => {
    const res = await orderBurgerApi(ingredients);
    return res.order;
  }
);

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postOrder.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? null;
      })
      .addCase(postOrder.fulfilled, (state, { payload }) => {
        state.order = payload;
        state.loading = false;
      });
  },
  selectors: {
    selectOrder: (state) => state
  }
});

export const orderReducer = orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
export const { selectOrder } = orderSlice.selectors;
