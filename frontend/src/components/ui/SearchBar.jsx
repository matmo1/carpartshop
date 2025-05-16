// frontend/src/components/ui/SearchBar.jsx
import React from 'react';
import Input from './Input';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search...",
  onClear,
  className = ""
}) => {
  return (
    <div className={`input-group ${className}`}>
      <span className="input-group-text bg-white">
        <i className="bi bi-search"></i>
      </span>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-start-0"
      />
      {value && (
        <button 
          className="btn btn-outline-secondary" 
          type="button"
          onClick={onClear}
          aria-label="Clear search"
        >
          <i className="bi bi-x"></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;