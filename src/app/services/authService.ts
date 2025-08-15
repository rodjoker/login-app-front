interface LoginResponse {
  access_token: string; 
}

interface LoginError {
  message: string;
  statusCode: number;
  error: string;
}
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://auth-server-project.onrender.com';

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  console.log('API_BASE_URL:', API_BASE_URL);
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // Si la respuesta no es OK (ej. 401, 403, 500)
      const errorData: LoginError = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error en el servicio de login:", error);
    throw error; // Re-lanza el error para que el componente pueda manejarlo
  }
};