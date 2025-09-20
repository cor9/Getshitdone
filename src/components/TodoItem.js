import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggleTodo, onDeleteTodo, onEdit, onCancelEdit, isEditing, onStartEdit, isDarkMode = false }) => {
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    if (editText.trim() && editCategory.trim()) {
      onEdit(todo.id, editText.trim(), editCategory.trim(), editPriority);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditCategory(todo.category);
    setEditPriority(todo.priority);
    onCancelEdit();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ff4757';
      case 'Medium': return '#ffa502';
      case 'Low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  if (isEditing) {
    return (
      <div className={`todo-item editing ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="edit-category"
            placeholder="Category"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="edit-priority"
          >
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">💾 Save</button>
            <button onClick={handleCancel} className="cancel-btn">❌ Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="todo-content">
        <div className="todo-main">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleTodo(todo.id)}
            className="todo-checkbox"
          />
          <span className="todo-text">{todo.text}</span>
        </div>
        
        <div className="todo-meta">
          <span 
            className="todo-category"
            style={{ backgroundColor: getPriorityColor(todo.priority) }}
          >
            📁 {todo.category}
          </span>
          <span className="todo-priority">
            {getPriorityIcon(todo.priority)} {todo.priority}
          </span>
        </div>
      </div>
      
      <div className="todo-actions">
        <button onClick={onStartEdit} className="edit-btn">
          ✏️ Edit
        </button>
        <button onClick={() => onDeleteTodo(todo.id)} className="delete-btn">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

