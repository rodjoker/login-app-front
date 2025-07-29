// src/components/auth/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { LuLogIn } from 'react-icons/lu';
import { loginUser } from '@/app/services/authService';
import { useAuth } from '../../context/AuthContext'; // <--- IMPORTANTE: Importa el hook useAuth

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login: authContextLogin } = useAuth(); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(username, password);
        if (!response || !response.access_token) {
            throw new Error('No se recibió un token válido.');
        }
      authContextLogin(response.access_token); 
      console.log('¡Login exitoso! Token:', response.access_token);

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Root className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Iniciar Sesión
      </h2>

      <Form.Field name="username" className="flex flex-col gap-2">
        <Form.Label className="font-semibold text-gray-700">Usuario</Form.Label>
        <Form.Control asChild>
          <input
            className="p-3 border border-gray-300 rounded-md text-base
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Control>
        <Form.Message className="text-red-500 text-sm mt-1" match="valueMissing">
          Por favor, introduce tu nombre de usuario.
        </Form.Message>
      </Form.Field>

      <Form.Field name="password" className="flex flex-col gap-2">
        <Form.Label className="font-semibold text-gray-700">Contraseña</Form.Label>
        <Form.Control asChild>
          <input
            className="p-3 border border-gray-300 rounded-md text-base
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Control>
        <Form.Message className="text-red-500 text-sm mt-1" match="valueMissing">
          Por favor, introduce tu contraseña.
        </Form.Message>
      </Form.Field>

      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

      <Form.Submit asChild>
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-bold
                     hover:bg-blue-700 transition-colors duration-200
                     flex items-center justify-center gap-2
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Cargando...' : <>Iniciar Sesión <LuLogIn className="text-xl" /></>}
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default LoginForm;