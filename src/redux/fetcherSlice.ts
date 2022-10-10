import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '../app/store';
import {AsyncValueState, ToDo, ToDosState} from '../types';

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

export const fetcherSlice = createSlice({
    name: fetcherKey,
    initialState,
    reducers: {
        fetchTodos: (state: FetcherState) => {
            state.todos.state = AsyncValueState.fetching;
        },
        fetchTodoSuccess: (state: FetcherState, action: PayloadAction<ToDo[]>) => {
            state.todos.state = AsyncValueState.success;
            state.todos.latestValue = action.payload;
        },
        fetchTodosError: (state: FetcherState, action: PayloadAction<Error>) => {
            state.todos.state = AsyncValueState.error;
            state.todos.latestError = action.payload;
        },
        resetTodos: (state: FetcherState) => {
            state.todos.latestValue = [];
            state.todos.state = AsyncValueState.idle;
        },
    },
});

export const {fetchTodos, fetchTodoSuccess, fetchTodosError, resetTodos} = fetcherSlice.actions;

export const selectTodos = (state: AppState) => state.todos;

export const fetcherReducer = fetcherSlice.reducer;
