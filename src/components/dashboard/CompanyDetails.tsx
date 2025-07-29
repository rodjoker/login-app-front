// src/components/dashboard/CompanyDetails.tsx
import React from 'react';
import DashboardCard from '../ui/DashboardCard';

// Define la interfaz de los datos de una sola empresa
export interface CompanyData { // <-- Hacemos la interfaz exportable
  id: string; // Añadir un ID para la key en la iteración
  name: string;
  taxId: string; // Número de Registro Fiscal
  email: string;
  businessObject: string; // Objeto de la empresa
}

interface CompanyDetailsProps {
  company: CompanyData; // Ahora CompanyDetails espera una prop 'company'
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company }) => {
  return (
    <DashboardCard title={company.name}> {/* El título de la tarjeta puede ser el nombre de la empresa */}
      <div className="space-y-3 text-gray-700 text-sm"> {/* Ajustamos el tamaño del texto para que quepa bien */}
        <p>
          <strong className="font-semibold text-gray-800">No. Registro Fiscal:</strong> {company.taxId}
        </p>
        <p>
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