// src/components/dashboard/Dashboard.tsx
'use client'; // Necesario porque vamos a usar useAuth y useRouter

import React from 'react';
import CompanyDetails, { CompanyData } from './CompanyDetails';
import { useAuth } from '../../context/AuthContext'; // Importa el hook de autenticación
import { useRouter } from 'next/navigation'; // Importa useRouter para la redirección
import { LuLogOut } from 'react-icons/lu'; // Ícono para el botón de logout

// Datos cableados de múltiples empresas
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
  const { logout } = useAuth(); // Obtén la función logout del contexto
  const router = useRouter(); // Inicializa el router

  const handleLogout = () => {
    logout(); // Llama a la función logout del contexto (elimina el token de estado y localStorage)
    router.push('/'); // Redirige al usuario a la página de login (la raíz)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex justify-between items-center"> 
        <h1 className="text-4xl font-extrabold text-gray-800">
          Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white py-2 px-4 rounded-md text-base font-semibold
                     hover:bg-gray-800 transition-colors duration-200
                     flex items-center gap-2"
        >
          Cerrar Sesión <LuLogOut className="text-lg" />
        </button>
      </header>
      <main className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map(company => (
            <CompanyDetails key={company.id} company={company} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;