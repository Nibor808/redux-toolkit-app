import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {fetcherReducer} from '../redux/fetcherSlice';

export const store = configureStore({
  reducer: {
    todos: fetcherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
