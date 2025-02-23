import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') state.bun = payload;
        else state.ingredients.push(payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = crypto.randomUUID();
        return { payload: { ...ingredient, id } satisfies TConstructorIngredient };
      }
    },
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      const id = payload.id;
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === id
      );
      if (index !== -1) state.ingredients.splice(index, 1);
    },
    moveUpIngredient: (state, { payload }: PayloadAction<number>) => {
      const index = payload;
      if (index > 0) {
        const newIndex = index - 1;
        [state.ingredients[index], state.ingredients[newIndex]] = [
          state.ingredients[newIndex],
          state.ingredients[index]
        ];
      }
    },
    moveDownIngredient: (state, { payload }: PayloadAction<number>) => {
      const index = payload;
      if (index < state.ingredients.length - 1) {
        const newIndex = index + 1;
        [state.ingredients[index], state.ingredients[newIndex]] = [
          state.ingredients[newIndex],
          state.ingredients[index]
        ];
      }
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectBurgerConstructor: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearIngredients
} = burgerConstructorSlice.actions;
export const { selectBurgerConstructor } = burgerConstructorSlice.selectors;
