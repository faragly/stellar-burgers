import {
  getUserApi,
  handleApiError,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, IApiError } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      const { user, accessToken, refreshToken } = response;
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return user;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Failed to register user'));
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      const { user, accessToken, refreshToken } = response;
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return user;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Failed to login user'));
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      return (await getUserApi()).user;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Failed to fetch user'));
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      return (await updateUserApi(data)).user;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Failed to update user'));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      const errorResponse = error as IApiError;
      return rejectWithValue('Failed to logout user: ' + errorResponse.message);
    }
  }
);

type TUserState = {
  isChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
};

const initialState: TUserState = {
  isChecked: false,
  isLoading: false,
  user: null,
  error: null
};

const commonPendingHandler = (state: TUserState) => {
  state.isLoading = true;
  state.error = null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commonRejectedHandler = (state: TUserState, action: any) => {
  state.isLoading = false;
  state.error = action.error.message;
};

const commonFulfilledHandler = (state: TUserState) => {
  state.isLoading = false;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, commonPendingHandler)
      .addCase(registerUser.rejected, commonRejectedHandler)
      .addCase(registerUser.fulfilled, commonFulfilledHandler);
    builder
      .addCase(loginUser.pending, commonPendingHandler)
      .addCase(loginUser.rejected, commonRejectedHandler)
      .addCase(loginUser.fulfilled, commonFulfilledHandler);
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isChecked = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isChecked = true;
        commonFulfilledHandler(state);
      });
    builder
      .addCase(updateUser.pending, commonPendingHandler)
      .addCase(updateUser.rejected, commonRejectedHandler)
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        commonFulfilledHandler(state);
      });
    builder
      .addCase(logoutUser.pending, commonPendingHandler)
      .addCase(logoutUser.rejected, commonRejectedHandler)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        commonFulfilledHandler(state);
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserLoadingState: state => state.isLoading,
    selectUserCheckedState: state => state.isChecked,
    selectUserError: state => state.error
  }
});

export const userReducer = userSlice.reducer;
export const { authCheck } = userSlice.actions;
export const { selectUser, selectUserLoadingState, selectUserCheckedState, selectUserError } = userSlice.selectors;
