import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo, isDarkMode = false }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id, text, category, priority) => {
    onEditTodo(id, text, category, priority);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (todos.length === 0) {
    return (
      <div className={`empty-state ${isDarkMode ? 'dark-mode' : ''}`}>
        <p>🎯 No tasks found. Add some tasks to get started!</p>
      </div>
    );
  }

  return (
    <div className={`todo-list ${isDarkMode ? 'dark-mode' : ''}`}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onEdit={handleEdit}
          onCancelEdit={handleCancelEdit}
          isEditing={editingId === todo.id}
          onStartEdit={() => setEditingId(todo.id)}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};

export default TodoList;

