export const searchCompanies = async (
  query: string,
  page: number = 1,
  limit: number = 10
) => {
  const baseURL = 'http://localhost:3000/';
  const url = `${baseURL}csv/buscar?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error en la búsqueda: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
