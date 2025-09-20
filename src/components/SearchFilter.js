import React from 'react';
import './SearchFilter.css';

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  categories,
  filterCategory,
  onCategoryChange,
  priorities,
  filterPriority,
  onPriorityChange,
  isDarkMode = false
}) => {
  return (
    <div className={`search-filter ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="filter-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Search tasks..."
          className="search-input"
        />
      </div>
      
      <div className="filter-group">
        <select
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'All' ? '📂 All Categories' : `📁 ${category}`}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <select
          value={filterPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="filter-select"
        >
          {priorities.map(priority => (
            <option key={priority} value={priority}>
              {priority === 'All' ? '⚡ All Priorities' : `${priority === 'High' ? '🔴' : priority === 'Medium' ? '🟡' : '🟢'} ${priority}`}
            </option>
          ))}
        </select>
      </div>
      
      {(searchTerm || filterCategory !== 'All' || filterPriority !== 'All') && (
        <button
          onClick={() => {
            onSearchChange('');
            onCategoryChange('All');
            onPriorityChange('All');
          }}
          className="clear-filters-btn"
        >
          🧹 Clear Filters
        </button>
      )}
    </div>
  );
};

export default SearchFilter;

