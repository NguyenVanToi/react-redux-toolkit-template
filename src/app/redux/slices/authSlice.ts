import { StatusLoading } from './../../ pages/utils/constant';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../../api/accountApi';
import { AppThunk } from '../store';
export interface AuthState {
  account: any;
  isSignIn: boolean;
  status: string;
  errorMessage?: string;
}
export interface LoginForm {
  email: string;
  password: string;
}

const initialState: AuthState = {
  account: {},
  isSignIn: false,
  status: StatusLoading.IDLE,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (loginForm: LoginForm, { rejectWithValue }) => {
    try {
      const response = await login(loginForm);
      return response;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await logout();
      return response;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = StatusLoading.LOADING;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = StatusLoading.IDLE;
        state.isSignIn = true;
        state.account = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log('reject');
        state.status = StatusLoading.FAILED;
        state.errorMessage = action.payload as string;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = StatusLoading.LOADING;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        console.log('fullfilled');
        state.status = StatusLoading.IDLE;
        state.isSignIn = false;
        state.account = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        console.log('reject');
        state.status = StatusLoading.FAILED;
        state.errorMessage = action.payload as string;
      });
  },
});

export default authSlice.reducer;
