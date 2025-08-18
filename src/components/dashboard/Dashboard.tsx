'use client';

import React, { useEffect, useState } from 'react';
import CompanyDetails, { CompanyData } from './CompanyDetails';
import Sidebar from './Sidebar';
import DashboardMainContent from './DashboardMainContent';
import { FaSearch } from 'react-icons/fa';
import SearchBar from './SearchBar';
import { useAuth } from '../../context/AuthContext';
import UpdatePlan from './UpdatePlan';


const Dashboard: React.FC = () => {
  const { searchMode, setSearchMode, updatePlanMode } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [companies, setCompanies] = useState<CompanyData[]>([]);

  const handleNewSearchClick = () => {
    setSearchMode(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 pt-16 px-4 pb-4 md:p-8 overflow-auto">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 md:mb-0">
            Panel de Control
          </h1>
          <button
            onClick={handleNewSearchClick}
            className="bg-blue-600 text-white py-2 px-4 rounded-md text-base font-semibold
                       hover:bg-blue-700 transition-colors duration-200
                       flex items-center gap-2"
          >
            <FaSearch className="text-lg" />
            Nueva Búsqueda
          </button>
        </header>

        <main className="container mx-auto max-w-7xl">

          {searchMode ? (
            <SearchBar onResults={setCompanies} onBackClick={() => setSearchMode(false)} />
          ) : updatePlanMode ? (
            <UpdatePlan />
          ) : (
            <DashboardMainContent />
          )}
        </main>

      </div>
    </div>
  );
};

export default Dashboard;
