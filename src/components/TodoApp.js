import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import SearchFilter from './SearchFilter';
import './TodoApp.css';

const TodoApp = () => {
  // Initialize todos from localStorage immediately
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        const parsed = JSON.parse(savedTodos);
        console.log('Initial load from localStorage:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error loading initial todos:', error);
      localStorage.removeItem('todos');
    }
    return [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [saveStatus, setSaveStatus] = useState('saved');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme === 'true';
  });

  // No need for separate load effect since we initialize from localStorage

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    setSaveStatus('saving');
    const todosToSave = JSON.stringify(todos);
    console.log('Saving to localStorage:', todosToSave);
    localStorage.setItem('todos', todosToSave);
    setTimeout(() => setSaveStatus('saved'), 500);
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      text: todo.text,
      category: todo.category,
      priority: todo.priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, updatedText, updatedCategory, updatedPriority) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, text: updatedText, category: updatedCategory, priority: updatedPriority }
        : todo
    ));
  };

  const manualSave = () => {
    setSaveStatus('saving');
    localStorage.setItem('todos', JSON.stringify(todos));
    setTimeout(() => setSaveStatus('saved'), 500);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setTodos([]);
      localStorage.removeItem('todos');
      setSaveStatus('saved');
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  // Filter todos based on search term, category, and priority
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || todo.category === filterCategory;
    const matchesPriority = filterPriority === 'All' || todo.priority === filterPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Debug logging
  console.log('Total todos:', todos.length);
  console.log('Filtered todos:', filteredTodos.length);
  console.log('Search term:', searchTerm);
  console.log('Filter category:', filterCategory);
  console.log('Filter priority:', filterPriority);

  // Get unique categories for filter dropdown
  const categories = ['All', ...new Set(todos.map(todo => todo.category))];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  return (
    <div className={`todo-app ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="todo-header">
        <div className="header-content">
          <div className="title-section">
            <h1>💪 Get SHIT Done</h1>
            <p>Stop procrastinating and organize your tasks with categories and priorities</p>
          </div>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>
      
      <TodoForm onAddTodo={addTodo} existingCategories={categories.filter(cat => cat !== 'All')} isDarkMode={isDarkMode} />
      
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories}
        filterCategory={filterCategory}
        onCategoryChange={setFilterCategory}
        priorities={priorities}
        filterPriority={filterPriority}
        onPriorityChange={setFilterPriority}
        isDarkMode={isDarkMode}
      />
      
      <TodoList
        todos={filteredTodos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
        onEditTodo={editTodo}
        isDarkMode={isDarkMode}
      />
      
      <div className="todo-stats">
        <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length} | Remaining: {todos.filter(t => !t.completed).length}</p>
        <div className="save-status">
          {saveStatus === 'saving' && <span className="saving-indicator">💾 Saving...</span>}
          {saveStatus === 'saved' && <span className="saved-indicator">✅ All changes saved</span>}
        </div>
        <div className="debug-controls">
          <button onClick={manualSave} className="debug-btn save-btn">💾 Manual Save</button>
          <button onClick={clearAllData} className="debug-btn clear-btn">🗑️ Clear All Data</button>
          <button onClick={() => {
            console.log('Current todos:', todos);
            console.log('localStorage todos:', localStorage.getItem('todos'));
          }} className="debug-btn test-btn">🔍 Debug Info</button>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

