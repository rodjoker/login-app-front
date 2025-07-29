import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      {children}
    </div>
  );
};

export default Card;