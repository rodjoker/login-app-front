// src/app/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/services/registerService'; // IMPORTA EL NUEVO SERVICIO
import { loginUser } from '../services/authService';
import { useAuth } from '@/context/AuthContext';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState(''); // Este será el email del usuario
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login: authContextLogin } = useAuth();
  const router = useRouter();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        setLoading(false);
        return;
    }

    const payload = {
        username,
        password,
        name,
        lastname,
        rol: "user",
        suscription: "free"
    };

    try {
        const registerResponse = await registerUser(payload);
        setSuccessMessage(registerResponse.message || '¡Registro exitoso! Iniciando sesión...');

        const loginResponse = await loginUser(username, password);
        
        if (!loginResponse || !loginResponse.access_token) {
            throw new Error('Registro exitoso, pero no se pudo iniciar sesión. Por favor, intenta de nuevo.');
        }

        authContextLogin(loginResponse.access_token);
        router.push('/'); 
    } catch (err: any) {
        setError(err.message || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
          Crear una Cuenta
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor="email" className="font-semibold text-gray-700 block mb-2">
              Correo Electrónico (Email)
            </label>
            <input
              id="email"
              className="p-3 border border-gray-300 rounded-md text-base w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name" className="font-semibold text-gray-700 block mb-2">
              Nombre
            </label>
            <input
              id="name"
              className="p-3 border border-gray-300 rounded-md text-base w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastname" className="font-semibold text-gray-700 block mb-2">
              Apellido
            </label>
            <input
              id="lastname"
              className="p-3 border border-gray-300 rounded-md text-base w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="font-semibold text-gray-700 block mb-2">
              Contraseña
            </label>
            <input
              id="password"
              className="p-3 border border-gray-300 rounded-md text-base w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="font-semibold text-gray-700 block mb-2">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              className="p-3 border border-gray-300 rounded-md text-base w-full
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm text-center mt-2">{successMessage}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-bold
                       hover:bg-blue-700 transition-colors duration-200
                       flex items-center justify-center gap-2
                       disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/" className="text-blue-600 hover:underline font-semibold">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;