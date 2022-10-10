import React from 'react';
import {ToDo} from '../types';

export const TodoView: React.FC<{todo: ToDo}> = ({todo}) => {
    return (
        <div key={todo.title}>
            <h2>Todo</h2>
            <p>ID: {todo.id}</p>
            <p>User ID: {todo.userId}</p>
            <p>Title: {todo.title}</p>
        </div>
    );
};
