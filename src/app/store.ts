import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {takeEvery} from 'redux-saga/effects';
import {fetcherReducer, fetchTodos} from '../redux/fetcherSlice';
import {fetchTodosSaga} from '../redux/fetcherApi';

export function* rootSaga() {
  yield takeEvery(fetchTodos, fetchTodosSaga);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({thunk: false, serializableCheck: false}),
    sagaMiddleware,
  ],
  reducer: {
    todos: fetcherReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
