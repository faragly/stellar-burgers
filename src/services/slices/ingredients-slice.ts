import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? null;
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.ingredients = payload;
      });
  },
  selectors: {
    selectIngredients: (state) => state
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { selectIngredients } = ingredientsSlice.selectors;