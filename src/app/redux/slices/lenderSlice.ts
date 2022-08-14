import { Lender } from './../../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { StatusLoading } from '../../ pages/utils/constant';
import { fetchLenders } from '../../api/lenderApi';

export interface LenderState {
  data: Lender[];
  loading: string;
  errorMessage?: string;
}

export type LenderWithTrans = Lender & {
  totalTrans?: number;
};

const initialState: LenderState = {
  data: [] as Lender[],
  loading: StatusLoading.IDLE,
};

export const fetchLendersAsync = createAsyncThunk(
  'lender/fetchWithTransaction',
  async (filter: any, { rejectWithValue }) => {
    try {
      const response = await fetchLenders();
      return response;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const createLenderAsync = createAsyncThunk(
  'lender/create',
  async (filter: any, { rejectWithValue }) => {
    try {
      const response = await fetchLenders();
      return response;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const editLenderAsync = createAsyncThunk(
  'lender/edit',
  async (filter: any, { rejectWithValue }) => {
    try {
      const response = await fetchLenders();
      return response;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const lenderSlice = createSlice({
  name: 'lender',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLendersAsync.pending, (state) => {
        state.loading = StatusLoading.LOADING;
      })
      .addCase(fetchLendersAsync.fulfilled, (state, action) => {
        state.loading = StatusLoading.IDLE;
        state.data = action.payload;
      })
      .addCase(fetchLendersAsync.rejected, (state, action) => {
        console.log('reject');
        state.loading = StatusLoading.FAILED;
        state.errorMessage = action.payload as string;
      });
  },
});

export default lenderSlice.reducer;
