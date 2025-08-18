'use client'; 

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define el tipo para el valor del contexto
interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
  isLoading: boolean; 
  searchMode: boolean;
  setSearchMode: (mode: boolean) => void; 
  updatePlanMode: boolean; 
  setUpdatePlanMode: (mode: boolean) => void; 
}

// Crea el contexto con un valor por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto de forma sencilla
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Componente proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [searchMode, setSearchMode] = useState(false);
  const [updatePlanMode, setUpdatePlanMode] = useState(false); // Nuevo estado para el componente UpdatePlan

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false); // Una vez que intentamos cargar, terminamos la carga
  }, []);

  // Función para iniciar sesión (guardar token)
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken); // Persistir el token
  };

  // Función para cerrar sesión (eliminar token)
  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken'); // Eliminar el token persistente
  };

  const value = {
    token,
    login,
    logout,
    isLoading,
    searchMode,
    setSearchMode, 
    updatePlanMode, 
    setUpdatePlanMode, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
