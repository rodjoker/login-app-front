// src/components/dashboard/Sidebar.tsx
'use client';

import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { FaBars, FaTimes, FaSearch, FaDatabase, FaChartBar, FaCreditCard, FaCog } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';  

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { logout } = useAuth(); // Usamos el logout del AuthContext

  const handleLogout = () => {
    logout(); // Llama a la función de logout de tu contexto
    // Podrías añadir una redirección a la página de login aquí si tu contexto no la maneja
    console.log("Sesión cerrada desde el sidebar.");
  };

  return (
    <>
      {/* Botón de Hamburguesa para Móviles (se mueve aquí) */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-700 bg-white rounded-md shadow-md"
        >
          {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Menú Vertical (Sidebar) */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-6 flex flex-col justify-between
                   transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                   md:relative md:translate-x-0 md:flex md:w-64 z-40 transition-transform duration-300 ease-in-out`}
      >
        <div>
          <div className="text-2xl font-bold text-gray-800 mb-8">BiData</div>
          <p className="text-gray-500 text-sm mb-8">Business Intelligence</p>
          <nav>
            <ul>
              <li className="mb-4">
                <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 font-semibold"
                   onClick={() => setIsSidebarOpen(false)}>
                  <MdDashboard className="text-lg" />
                  <span className="ml-2">Dashboard</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center text-gray-700 hover:text-blue-600"
                   onClick={() => setIsSidebarOpen(false)}>
                  <FaSearch className="text-lg" />
                  <span className="ml-2">Buscar Empresas</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center text-gray-700 hover:text-blue-600"
                   onClick={() => setIsSidebarOpen(false)}>
                  <FaDatabase className="text-lg" />
                  <span className="ml-2">Mi Base de Datos</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center text-gray-700 hover:text-blue-600"
                   onClick={() => setIsSidebarOpen(false)}>
                  <FaChartBar className="text-lg" />
                  <span className="ml-2">Analytics</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Sección de Cuenta y Configuración */}
        <div>
          <h3 className="text-gray-500 uppercase text-xs font-semibold mb-4">Cuenta</h3>
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600"
                 onClick={() => setIsSidebarOpen(false)}>
                <FaCreditCard className="text-lg" />
                <span className="ml-2">Suscripción</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600"
                 onClick={() => setIsSidebarOpen(false)}>
                <FaCog className="text-lg" />
                <span className="ml-2">Configuración</span>
              </a>
            </li>
          </ul>
        </div>
        {/* Botón de Cerrar Sesión en el sidebar */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-gray-600 text-white py-2 px-4 rounded-md text-base font-semibold
                     hover:bg-gray-800 transition-colors duration-200
                     flex items-center justify-center gap-2"
        >
          Cerrar Sesión <LuLogOut className="text-lg" />
        </button>
      </aside>

      {/* Overlay para cuando el menú está abierto en móviles (se mueve aquí) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;