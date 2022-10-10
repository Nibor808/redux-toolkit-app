import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppState} from '../app/store';
import {AsyncValueState, ToDosState} from '../types';
import {fetchTodosSaga} from './fetcherApi';

export interface FetcherState {
    todos: ToDosState;
}

const initialState: FetcherState = {
    todos: {
        state: AsyncValueState.idle,
        latestValue: [],
    },
};

const fetcherKey = 'fetcher';

export const fetchTodosAsync = createAsyncThunk(`${fetcherKey}/todos`, fetchTodosSaga);

export const fetcherSlice = createSlice({
    name: fetcherKey,
    initialState,
    reducers: {
        resetTodos: (state: FetcherState) => {
            state.todos.latestValue = [];
            state.todos.state = AsyncValueState.idle;
        },
    },
    extraReducers: ({addCase}) => {
        addCase(fetchTodosAsync.fulfilled, (state, action) => {
            state.todos.state = AsyncValueState.success;
            state.todos.latestValue = action.payload;
        });
        addCase(fetchTodosAsync.pending, (state) => {
            state.todos.state = AsyncValueState.fetching;
        });
        addCase(fetchTodosAsync.rejected, (state) => {
            state.todos.state = AsyncValueState.error;
            state.todos.latestError = new Error('fetch todos failed');
        });
    },
});

export const {resetTodos} = fetcherSlice.actions;

export const selectTodos = (state: AppState) => state.todos;

export const fetcherReducer = fetcherSlice.reducer;
