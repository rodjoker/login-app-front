'use client'; // Necesario porque usamos useState

import React, { useState } from 'react';
import CompanyDetails, { CompanyData } from './CompanyDetails'; 
import Sidebar from './Sidebar'; 
import DashboardMainContent from './DashboardMainContent'; 
import { FaSearch } from 'react-icons/fa'; 
const companies: CompanyData[] = [
  {
    id: "comp1",
    name: "Soluciones Descartables S.A.",
    taxId: "RFC123456789",
    email: "contacto@solucionesdescartables.com",
    businessObject: "Fabricación y distribución de productos descartables para hostelería y sanidad.",
  },
  {
    id: "comp2",
    name: "Envases Eco-Amigables Ltd.",
    taxId: "CIF987654321",
    email: "info@envaseseco.com",
    businessObject: "Producción de envases biodegradables y compostables para alimentos y bebidas.",
  },
  {
    id: "comp3",
    name: "CleanSupply Innova",
    taxId: "NIF11223344A",
    email: "ventas@cleansupply.es",
    businessObject: "Suministro de productos de limpieza industrial y soluciones de higiene profesional.",
  },
  {
    id: "comp4",
    name: "Distribuciones Plásticas del Sur",
    taxId: "B55667788",
    email: "comercial@dispelsur.net",
    businessObject: "Distribución mayorista de plásticos y materiales de embalaje para la industria.",
  },
  {
    id: "comp5",
    name: "Distribuciones de equipos e oficina S.A.",
    taxId: "B556665555",
    email: "distribucioneoff@mail.com",
    businessObject: "Distribución mayorista de equipos para tu oficina.",
  },
  {
    id: "comp6",
    name: "Distribuciones de equipos de jardineria S.A.",
    taxId: "B556665555",
    email: "distribucionjardineriaff@mail.com",
    businessObject: "Distribución mayorista de equipos para tu jardin.",
  },
];

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  const handleNewSearchClick = () => {
    setShowCompanyDetails(true); 
  };

  const handleGoToDashboardMain = () => {
    setShowCompanyDetails(false); 
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
          {showCompanyDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map(company => (
                <CompanyDetails key={company.id} company={company} onBackClick={handleGoToDashboardMain} />
              ))}
            </div>
          ) : (
            <DashboardMainContent />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
