import {ToDo} from '../types';

export const fetchTodosSaga = async (): Promise<ToDo[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
    return response.ok ? await response.json() : [];
};
