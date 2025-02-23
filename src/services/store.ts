import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {
  burgerConstructorReducer,
  ingredientsReducer,
  orderFeedReducer,
  orderHistoryReducer,
  orderReducer,
  userReducer
} from './slices';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  orderFeed: orderFeedReducer,
  orderHistory: orderHistoryReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
