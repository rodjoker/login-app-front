// src/app/services/registerService.ts

// Define la interfaz para el payload de registro
interface RegisterPayload {
  username: string; // En tu caso, este es el email
  password: string;
  name: string;
  lastname: string;
  rol: string;
  suscription: string;
}

// Define la interfaz para la respuesta esperada del backend (ajusta según lo que realmente devuelva tu API)
interface RegisterResponse {
  message: string;
  // Podrías añadir más campos si tu API los devuelve, por ejemplo:
  // userId: string;
  // token: string; // Aunque normalmente el token no se devuelve en el registro, sino en el login
}

const REGISTER_API_URL = 'http://localhost:3001/auth/register';

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  try {
    const response = await fetch(REGISTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Manejo de errores HTTP
    if (!response.ok) {
      // Intenta parsear el mensaje de error del backend si está disponible
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Error desconocido al registrar usuario.';
      throw new Error(errorMessage);
    }

    // Si la respuesta es exitosa, parsea el JSON y devuélvelo
    return await response.json();

  } catch (error: any) {
    console.error('Error en registerUser service:', error);
    // Vuelve a lanzar el error para que el componente que llama lo pueda manejar
    throw new Error(error.message || 'Error de red o del servidor al registrar usuario.');
  }
};