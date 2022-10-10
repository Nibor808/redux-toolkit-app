import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {fetchTodos, resetTodos, selectTodos} from './redux/fetcherSlice';
import {TodoView} from './features/TodoView';
import {AsyncValueState, ToDo} from './types';

function App() {
  const dispatch = useAppDispatch();
  const {todos} = useAppSelector(selectTodos);

  const hasToDos =
    todos.state !== AsyncValueState.fetching && todos.state !== AsyncValueState.error;

  return (
    <div className="app_root">
      <h1>Todo List</h1>

      {todos.state === AsyncValueState.error && <p>{todos.latestError?.message}</p>}

      {hasToDos &&
        todos.latestValue.map((todo: ToDo) => {
          return (
            <div key={todo.title}>
              <TodoView todo={todo} />
            </div>
          );
        })}

      <button
        aria-label="Fetch todos"
        onClick={() => dispatch(fetchTodos())}
        style={{marginRight: 40}}
      >
        Fetch Todos
      </button>

      <button aria-label="Reset todos" onClick={() => dispatch(resetTodos())}>
        Clear Todos
      </button>
    </div>
  );
}

export default App;
