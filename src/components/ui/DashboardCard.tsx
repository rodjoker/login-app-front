// src/components/ui/DashboardCard.tsx
import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default DashboardCard;