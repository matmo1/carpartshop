// frontend/src/components/ui/Tabs.jsx
import React, { useState } from 'react';

export const Tabs = ({ value, onValueChange, children }) => {
  return <div>{children}</div>;
};

export const TabsList = ({ children }) => {
  return <div className="flex space-x-4 mb-4">{children}</div>;
};

export const TabsTrigger = ({ value, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border-b-2 border-transparent hover:border-blue-500"
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }) => {
  return <div>{children}</div>;
};
