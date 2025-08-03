// src/components/dashboard/CompanyDetails.tsx
import React from 'react';
import DashboardCard from '../ui/DashboardCard';
import { FaArrowLeft } from 'react-icons/fa'; // Importa el icono de flecha

// Define la interfaz de los datos de una sola empresa
export interface CompanyData {
  id: string; 
  name: string;
  taxId: string; // Número de Registro Fiscal
  email: string;
  businessObject: string; 
}

interface CompanyDetailsProps {
  company: CompanyData; 
  onBackClick: () => void; 
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company, onBackClick }) => {
  return (
    <DashboardCard title={company.name}> 
      <button
        onClick={onBackClick}
        className="absolute top-4 right-4 bg-gray-200 text-gray-700 p-2 rounded-full
                   hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
        aria-label="Volver al Dashboard"
      >
        <FaArrowLeft className="text-lg" />
      </button>

      <div className="space-y-3 text-gray-700 text-sm mt-4"> 
        <p>
          <strong className="font-semibold text-gray-800">No. Registro Fiscal:</strong> {company.taxId}
        </p>
        <p className="break-words"> 
          <strong className="font-semibold text-gray-800">Email:</strong> {company.email}
        </p>
        <p>
          <strong className="font-semibold text-gray-800">Objeto de la Empresa:</strong> {company.businessObject}
        </p>
      </div>
    </DashboardCard>
  );
};

export default CompanyDetails;
