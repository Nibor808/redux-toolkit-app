import {call, put} from 'redux-saga/effects';
import {ToDo} from '../types';
import {fetchTodosError, fetchTodoSuccess} from './fetcherSlice';

const fetcher = async (url: string): Promise<Response> => {
    const response = await fetch(url);
    return response.ok ? await response.json() : [];
};

export function* fetchTodosSaga() {
    try {
        const todos: ToDo[] = yield call(() =>
            fetcher('https://jsonplaceholder.typicode.com/users/1/todos')
        );

        if (!todos.length) {
            yield put(fetchTodosError(new Error('Unkown error')));
            return;
        }
        yield put(fetchTodoSuccess(todos));
    } catch (e) {
        yield put(fetchTodosError(new Error('fetch todos failed')));
    }
}
