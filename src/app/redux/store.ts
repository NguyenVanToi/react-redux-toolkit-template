import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import authReducer from './../redux/slices/authSlice';
import transactionReducer from './../redux/slices/transactionSlice';
import lenderReducer from './../redux/slices/lenderSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    transaction: transactionReducer,
    lender: lenderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
