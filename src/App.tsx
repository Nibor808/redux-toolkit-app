import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {fetchTodosAsync, resetTodos, selectTodos} from './redux/fetcherSlice';
import {TodoView} from './features/Todo';
import {AsyncValueState, ToDo} from './types';

function App() {
  const dispatch = useAppDispatch();
  const {todos} = useAppSelector(selectTodos);

  const hasToDos =
    todos.state !== AsyncValueState.fetching && todos.state !== AsyncValueState.error;

  return (
    <div className="app_root">
      <h1>Todo List</h1>

      {hasToDos && todos.latestValue.map((todo: ToDo) => <TodoView todo={todo} />)}

      <button aria-label="Fetch todos" onClick={() => dispatch(fetchTodosAsync())}>
        +
      </button>

      <button aria-label="Reset todos" onClick={() => dispatch(resetTodos())}>
        -
      </button>
    </div>
  );
}

export default App;
