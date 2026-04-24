import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');

  const handleSave = async () => {
    if (!title.trim()) return;
    await onEdit(todo._id, {
      title: title.trim(),
      description: description.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />
      {isEditing ? (
        <div className="todo-edit">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <div className="actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel} className="secondary">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <div className="todo-text">
            <strong>{todo.title}</strong>
            {todo.description && <p>{todo.description}</p>}
          </div>
          <div className="actions">
            <button onClick={() => setIsEditing(true)} className="secondary">
              Edit
            </button>
            <button onClick={() => onDelete(todo._id)} className="danger">
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
