import { Transaction } from './../../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactions } from '../../api/transactionApi';
import { StatusLoading } from '../../ pages/utils/constant';

export interface TransactionState {
  transactions: Transaction[];
  loading: string;
  errorMessage?: string;
}

const initialState: TransactionState = {
  transactions: [] as Transaction[],
  loading: StatusLoading.IDLE,
};

export const fetchTransactionsAsync = createAsyncThunk(
  'transaction/fetch',
  async (filter: any, { rejectWithValue }) => {
    try {
      const response = await fetchTransactions(filter);
      return response;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.loading = StatusLoading.LOADING;
      })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        state.loading = StatusLoading.IDLE;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsAsync.rejected, (state, action) => {
        console.log('reject');
        state.loading = StatusLoading.FAILED;
        state.errorMessage = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
