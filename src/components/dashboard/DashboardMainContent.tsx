import React from 'react';
import { FaFileAlt, FaChartLine, FaUsers, FaSearch } from 'react-icons/fa'; // Iconos para las tarjetas

const DashboardMainContent: React.FC = () => {
  return (
    <div className="space-y-6">
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-1">Total Empresas</h2>
            <p className="text-4xl font-bold text-gray-800">12,847</p>
            <p className="text-green-500 text-sm">+2.5% desde el mes pasado</p>
          </div>
          <FaFileAlt className="text-5xl text-blue-400 opacity-20" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-1">Búsquedas Hoy</h2>
            <p className="text-4xl font-bold text-gray-800">89</p>
            <p className="text-green-500 text-sm">+12% desde el mes pasado</p>
          </div>
          <FaSearch className="text-5xl text-green-400 opacity-20" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-1">Plan Actual</h2>
            <p className="text-3xl font-bold text-gray-800">Premium</p>
            <p className="text-gray-500 text-sm">500/500 desde el mes pasado</p>
          </div>
          <FaChartLine className="text-5xl text-purple-400 opacity-20" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-1">Contactos Guardados</h2>
            <p className="text-4xl font-bold text-gray-800">1,234</p>
            <p className="text-green-500 text-sm">+45 desde el mes pasado</p>
          </div>
          <FaUsers className="text-5xl text-yellow-400 opacity-20" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uso del Plan Premium</h2>
        <p className="text-gray-600 mb-4">
          Has utilizado <span className="font-bold">350</span> de <span className="font-bold">500</span> consultas este mes
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: '70%' }} 
          ></div>
        </div>
        <div className="flex justify-between text-gray-500 text-sm mb-4">
          <span>Consultas realizadas</span>
          <span>350/500</span>
        </div>
        <p className="text-gray-500 text-sm mb-6">Se renueva en 12 días</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
          Actualizar Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Búsquedas Recientes</h2>
          <p className="text-gray-600 mb-4">Tus últimas consultas en la base de datos</p>
          <div className="border-b border-gray-200 py-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">TechCorp SA</p>
              <p className="text-gray-500 text-sm">Tecnología - Hace 2 horas</p>
            </div>
            <FaSearch className="text-blue-500" />
          </div>
          <div className="border-b border-gray-200 py-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">Global Logistics Inc.</p>
              <p className="text-gray-500 text-sm">Logística - Ayer</p>
            </div>
            <FaSearch className="text-blue-500" />
          </div>
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">Green Energy Solutions</p>
              <p className="text-gray-500 text-sm">Energía Renovable - Hace 3 días</p>
            </div>
            <FaSearch className="text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acciones Rápidas</h2>
          <p className="text-gray-600 mb-4">Herramientas más utilizadas</p>
          <div className="flex items-center border border-gray-300 rounded-md p-3 mb-4">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar Empresa por Nombre"
              className="flex-1 outline-none text-gray-700"
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors mb-2">
            Generar Reporte
          </button>
          <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors">
            Administrar Contactos
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainContent;
