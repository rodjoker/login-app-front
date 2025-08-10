// src/components/dashboard/CompanyDetails.tsx
import React from 'react';
import DashboardCard from '../ui/DashboardCard';
import { FaArrowLeft } from 'react-icons/fa';

// Define la interfaz de los datos de la empresa
export interface CompanyData {
  NOMBRE: string;
  RUC: string;
  CORREO: string;
  REPRESENTANTE: string;
  EXPEDIENTE: string;
  SITUACIÓN_LEGAL: string;
  FECHA_CONSTITUCION: string;
  TIPO: string;
  PAÍS: string;
  REGIÓN: string;
  CANTÓN: string;
  CIUDAD: string;
  CALLE: string;
  NÚMERO: string;
  INTERSECCIÓN: string;
  BARRIO: string;
  TELÉFONO: string;
  CAPITAL_SUSCRITO: string;
  CIIU_NIVEL_1: string;
  CIIU_NIVEL_0: string;
ÚLTIMO_BALANCE: string;
}

interface CompanyDetailsProps {
  company: CompanyData;
  //onBackClick: () => void;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company,  }) => {
  const renderField = (label: string, value: string | undefined) => {
    if (!value || value === '') {
      return null;
    }
    return (
      <div className="flex flex-col">
        <strong className="font-semibold text-gray-800">{label}:</strong>
        <span className="text-gray-700 break-words">{value}</span>
      </div>
    );
  };

  return (
    <DashboardCard title={company.NOMBRE}>
     

      {/* Contenedor principal con diseño responsivo */}
      <div className="mt-4 p-4 text-sm flex flex-col lg:flex-row lg:justify-between">
        
        {/* Columna Izquierda: Información Principal */}
        <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r lg:border-gray-200 mb-6 lg:mb-0">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Datos Generales</h3>
          <div className="space-y-4">
            {renderField('RUC', company.RUC)}
            {renderField('Representante', company.REPRESENTANTE)}
            {renderField('Tipo de Sociedad', company.TIPO)}
            {renderField('Fecha de Constitución', company.FECHA_CONSTITUCION)}
            {renderField('Capital Suscrito', company.CAPITAL_SUSCRITO)}
            {renderField('Expediente', company.EXPEDIENTE)}
            {renderField('Situación Legal', company.SITUACIÓN_LEGAL)}
            {renderField('Último Balance', company.ÚLTIMO_BALANCE)}
          </div>
        </div>
        
        {/* Columna Derecha: Contacto y Dirección */}
        <div className="w-full lg:w-1/2 lg:pl-8">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Contacto y Ubicación</h3>
          <div className="space-y-4">
            {renderField('Correo Electrónico', company.CORREO)}
            {renderField('Teléfono', company.TELÉFONO)}
            {renderField('País', company.PAÍS)}
            {renderField('Región', company.REGIÓN)}
            {renderField('Cantón', company.CANTÓN)}
            {renderField('Ciudad', company.CIUDAD)}
            {renderField('Calle', company.CALLE)}
            {renderField('Número', company.NÚMERO)}
            {renderField('Intersección', company.INTERSECCIÓN)}
            {renderField('Barrio', company.BARRIO)}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default CompanyDetails;