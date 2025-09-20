import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onAddTodo, existingCategories = [], isDarkMode = false }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [customCategory, setCustomCategory] = useState('');
  const [useCustomCategory, setUseCustomCategory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = useCustomCategory ? customCategory.trim() : category;
    if (text.trim() && finalCategory) {
      onAddTodo({ text: text.trim(), category: finalCategory, priority });
      setText('');
      setCategory('');
      setCustomCategory('');
      setUseCustomCategory(false);
      setPriority('Medium');
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setUseCustomCategory(true);
      setCategory('');
    } else {
      setUseCustomCategory(false);
      setCategory(value);
      setCustomCategory('');
    }
  };

  return (
    <form className={`todo-form ${isDarkMode ? 'dark-mode' : ''}`} onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your task..."
          className="task-input"
          required
        />
      </div>
      
      <div className="form-group">
        {!useCustomCategory ? (
          <select
            value={category}
            onChange={handleCategoryChange}
            className="category-select"
            required
          >
            <option value="">📁 Select a category...</option>
            {existingCategories.map(cat => (
              <option key={cat} value={cat}>
                📁 {cat}
              </option>
            ))}
            <option value="custom">➕ Create new category</option>
          </select>
        ) : (
          <div className="custom-category-group">
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter new category name..."
              className="category-input"
              autoFocus
              required
            />
            <button
              type="button"
              onClick={() => {
                setUseCustomCategory(false);
                setCustomCategory('');
              }}
              className="cancel-custom-btn"
            >
              ❌
            </button>
          </div>
        )}
      </div>
      
      <div className="form-group">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="High">🔴 High Priority</option>
          <option value="Medium">🟡 Medium Priority</option>
          <option value="Low">🟢 Low Priority</option>
        </select>
      </div>
      
      <button type="submit" className="add-button">
        ➕ Add Task
      </button>
    </form>
  );
};

export default TodoForm;

