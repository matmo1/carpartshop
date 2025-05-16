import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Button = ({ children, onClick, type = 'button', variant }) => {
  const variantClass = variant === 'destructive' ? 'btn btn-danger' : 'btn btn-primary';

  return (
    <button
      type={type}
      onClick={onClick}
      className={variantClass}
    >
      {children}
    </button>
  );
};

export default Button;
