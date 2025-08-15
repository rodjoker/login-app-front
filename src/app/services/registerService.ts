// Define la interfaz para el payload de registro
interface RegisterPayload {
  username: string; // este es el email
  password: string;
  name: string;
  lastname: string;
  rol: string;
  suscription: string;
}

// Define la interfaz para la respuesta esperada del backend (ajusta según lo que realmente devuelva tu API)
interface RegisterResponse {
  message: string;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  console.log('API_BASE_URL:', API_BASE_URL);
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
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

  } catch (error) { // TypeScript infiere el tipo de error, por lo que no es necesario explicitarlo
    const errorMessage = (error as Error).message || 'Error de red o del servidor al registrar usuario.';
    console.error('Error en registerUser service:', error);
    throw new Error(errorMessage);
  }
};