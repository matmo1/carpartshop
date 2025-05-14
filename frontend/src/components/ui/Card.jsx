// frontend/src/components/ui/Card.jsx
import React from 'react';

const Card = ({ title, description, children }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md">
      {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
      {description && <p className="text-gray-600 mb-2">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
