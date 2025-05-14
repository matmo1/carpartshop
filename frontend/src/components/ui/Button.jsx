import React from 'react';

const Button = ({ children, onClick, type = 'button', variant }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
