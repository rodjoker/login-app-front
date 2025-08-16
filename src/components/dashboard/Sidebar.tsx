// src/components/dashboard/Sidebar.tsx
'use client';

import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { FaBars, FaTimes, FaSearch, FaDatabase, FaChartBar, FaCreditCard, FaCog } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';  
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { logout, setUpdatePlanMode, setSearchMode } = useAuth(); // Usamos el logout del AuthContext
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Llama a la función de logout de tu contexto
    // Podrías añadir una redirección a la página de login aquí si tu contexto no la maneja
    console.log("Sesión cerrada desde el sidebar.");
  };

    // Maneja la navegación a una ruta específica
  // const navigateTo = (path: string) => {
  //   router.push(path);
  //   setIsSidebarOpen(false);
  // };

  const handleSubscriptionClick = () => {
    setUpdatePlanMode(true); // Establece updatePlanMode en true
    setSearchMode(false); // Establece setSearchMode en false
    setIsSidebarOpen(false); // Cierra la barra lateral
  };
  const handleDashboardClick = () => {
    setUpdatePlanMode(false); // Establece updatePlanMode en true
    setSearchMode(false); // Establece setSearchMode en false
    setIsSidebarOpen(false); // Cierra la barra lateral
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
                   onClick={handleDashboardClick}>
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
                 //</li>onClick={() => setIsSidebarOpen(false)}>
                 onClick={handleSubscriptionClick}>
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

         {/* <div>
          <h3 className="text-gray-500 uppercase text-xs font-semibold mb-4">Cuenta</h3>
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600"
                 onClick={() => navigateTo('/dashboard/suscripcion')}>
                <svg className="text-lg w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m4 0h1M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="ml-2">Suscripción</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600"
                 onClick={() => navigateTo('/dashboard/settings')}>
                <svg className="text-lg w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="ml-2">Configuración</span>
              </a>
            </li>
          </ul>
        </div> */}

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