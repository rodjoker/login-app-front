// src/app/page.tsx
'use client'; // Necesitamos que sea un Client Component para usar el hook useAuth

import React from 'react';
import Card from '../components/ui/Card'; // Necesario para el LoginForm
import LoginForm from '../components/auth/LoginForm';
import Dashboard from '../components/dashboard/Dashboard';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import utilStyles from '../styles/utilities.module.css'; // Si todavía usas esto para centrar, aunque Tailwind es preferible

const HomePage: React.FC = () => {
  const { token, isLoading } = useAuth(); // Obtén el token y el estado de carga del contexto

  if (isLoading) {
    // Puedes mostrar un spinner de carga aquí
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700 text-lg">
        Cargando autenticación...
      </div>
    );
  }

  return (
    <>
      {token ? (
        <Dashboard />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Card>
            <LoginForm />
          </Card>
        </div>
      )}
    </>
  );
};

export default HomePage;