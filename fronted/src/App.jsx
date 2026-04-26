import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import * as api from './api.js';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await api.fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async ({ title, description }) => {
    const todo = await api.createTodo({ title, description });
    setTodos((prev) => [todo, ...prev]);
  };

  const handleToggle = async (todo) => {
    const updated = await api.updateTodo(todo._id, {
      completed: !todo.completed,
    });
    setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await api.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  const handleEdit = async (id, data) => {
    const updated = await api.updateTodo(id, data);
    setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header>
        <h1>MERN Todo</h1>
        <p className="subtitle">
          {remaining} of {todos.length} remaining
        </p>
      </header>
      <TodoForm onAdd={handleAdd} />
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p className="muted">Loading...</p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
