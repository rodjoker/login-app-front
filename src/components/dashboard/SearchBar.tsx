'use client';

import React, { useState, useEffect, useRef } from 'react';
import { searchCompanies } from '@/app/services/searchService';
import CompanyDetails, { CompanyData } from './CompanyDetails';

interface SearchBarProps {
  onResults: (results: CompanyData[]) => void;
  onBackClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onResults, onBackClick }) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // refs
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentRequestId = useRef(0);
  const ignoreNextPageFetch = useRef(false); // cuando cambiamos page a 1 por nuevo query

  // Fetch seguro: si llega respuesta "vieja" (requestId distinto) la ignoramos
  const fetchCompanies = async (searchQuery: string, searchPage: number) => {
    if (!searchQuery.trim()) {
      setCompanies([]);
      onResults([]);
      setTotalPages(1);
      return;
    }

    const thisRequestId = ++currentRequestId.current;
    setLoading(true);
    try {
      const response = await searchCompanies(searchQuery, searchPage, limit);
      // asegúrate que la api responde con { data: [...] , totalPages: N, page: x }
      const arrayData = Array.isArray(response?.data) ? response.data : [];
      console.log('fetchCompanies -> requestId', thisRequestId, { query: searchQuery, page: searchPage, returnedCount: arrayData.length });

      // Si entre tanto se disparó otra petición, ignoramos esta respuesta
      if (thisRequestId !== currentRequestId.current) {
        console.log('Respuesta stale. Ignorada requestId', thisRequestId);
        return;
      }

      setCompanies(arrayData);
      onResults(arrayData);
      setTotalPages(response?.totalPages ?? 1);
    } catch (err) {
      // solo loguear; no sobrescribimos si es stale porque el guard ya lo maneja
      console.error('Error buscando empresas', err);
    } finally {
      // solo limpiar loading si seguimos siendo la última petición
      if (thisRequestId === currentRequestId.current) {
        setLoading(false);
      }
    }
  };

  // Handler del boton Buscar (buscar ya)
  const handleSearchClick = () => {
    // cancelar debounce pendiente
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    fetchCompanies(query, page);
  };

  // Cuando el user escribe: reseteamos a page 1 y lanzamos debounce 4s
  const onChangeQuery = (value: string) => {
    setQuery(value);
    // si cambiamos la query, queremos que la próxima fetch use page 1
    // pero no queremos que el efecto de 'page' dispare un fetch inmediato:
    ignoreNextPageFetch.current = true;
    setPage(1);
    // debounce: limpia prev y crea uno nuevo
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchCompanies(value, 1);
      debounceRef.current = null;
    }, 4000);
  };

  // Efecto para cambios de page: fetch inmediato cuando page cambia por interacción del usuario.
  useEffect(() => {
    // si no hay query, no hacemos nada
    if (!query.trim()) {
      setCompanies([]);
      setTotalPages(1);
      return;
    }

    // Si el cambio de page fue porque reseteamos a 1 por nueva query, evitamos el fetch inmediato
    if (ignoreNextPageFetch.current) {
      ignoreNextPageFetch.current = false;
      return;
    }

    // limpiar debounce pendiente porque vamos a fetch inmediato
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    fetchCompanies(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // limpiado on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      // no podemos cancelar fetch si searchCompanies no expone AbortSignal,
      // pero currentRequestId evita que respuestas viejas sobrescriban el estado.
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <button
        onClick={onBackClick}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 self-start"
      >
        ← Volver
      </button>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Buscar empresa..."
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
        />
        <button
          onClick={handleSearchClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      <div className="flex-1 mt-6">
        {companies.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mt-6">
            {companies.map((company) => (
              <CompanyDetails key={company.RUC} company={company} />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="flex justify-center items-center h-full text-gray-500">
              No hay resultados
            </div>
          )
        )}
      </div>

      <div className="fixed bottom-0 sm:left-0 md:left-35 w-full flex justify-center">
        <div className="bg-gray-100 py-2 flex justify-center gap-2 w-full max-w-7xl px-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
            disabled={page >= totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
