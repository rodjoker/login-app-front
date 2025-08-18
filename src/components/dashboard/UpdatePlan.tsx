'use client';

import React from 'react';

// Definimos un tipo para el plan para mejorar la legibilidad y la seguridad del tipo de datos
interface Plan {
  name: string;
  price: number;
  features: string[];
  isMostPopular: boolean;
}

// Datos de ejemplo para los planes
const plans: Plan[] = [
  {
    name: 'Básico',
    price: 29,
    features: [
      '100 consultas mensuales',
      'Información básica de empresas',
      'Exportación de datos',
      'Soporte por email',
      'Analytics detallados',
      'API de acceso',
      'Soporte prioritario',
    ],
    isMostPopular: false,
  },
  {
    name: 'Premium',
    price: 79,
    features: [
      '500 consultas mensuales',
      'Información básica de empresas',
      'Exportación de datos',
      'Soporte por email',
      'Analytics detallados',
      'API de acceso',
      'Soporte prioritario',
    ],
    isMostPopular: true,
  },
  {
    name: 'Enterprise',
    price: 199,
    features: [
      'Consultas ilimitadas',
      'Información básica de empresas',
      'Exportación de datos',
      'Soporte por email',
      'Analytics detallados',
      'API de acceso',
      'Soporte prioritario',
    ],
    isMostPopular: false,
  },
];

const UpdatePlan = () => {
  // Manejador de clic para el botón 'Actualizar Plan'
  const handleUpdatePlan = (planName: string) => {
    // Aquí puedes añadir la lógica para la API o redirección para procesar el pago.
    // Por ejemplo: router.push('/checkout?plan=' + planName);
    console.log(`Actualizar plan a: ${planName}`);
    alert(`Has seleccionado el plan ${planName}. La lógica de pago debería ir aquí.`);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-gray-100">
            Planes Disponibles
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Elige el plan que mejor se adapte a tus necesidades.
          </p>
        </div>

        <div className="mt-12 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                bg-white dark:bg-gray-800 rounded-2xl shadow-xl
                p-8 flex flex-col items-center justify-between
                transition-all duration-300 transform
                hover:scale-105
                border-4 border-transparent
                ${plan.isMostPopular ? 'border-indigo-600 dark:border-indigo-500 relative' : ''}
              `}
            >
              {plan.isMostPopular && (
                <div className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white text-sm font-semibold py-1 px-4 rounded-full shadow-md">
                  Más Popular
                </div>
              )}
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  {plan.name}
                </h3>
                <div className="mt-4 text-center">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                    €{plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                    /mes
                  </span>
                </div>
                <ul className="mt-8 space-y-4 text-gray-500 dark:text-gray-400 text-left w-full">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-600 dark:text-gray-300">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleUpdatePlan(plan.name)}
                className={`mt-8 w-full py-3 px-6 rounded-md text-base font-medium text-white transition-colors duration-300 shadow-md ${
                  plan.isMostPopular
                    ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    : 'bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400'
                }`}
              >
                Actualizar Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatePlan;