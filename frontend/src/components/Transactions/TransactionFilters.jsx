// Archivo: src/components/Transactions/TransactionFilters.jsx
import { useState, useEffect } from 'react';

const TransactionFilters = ({ categories, onFilterChange, resultsCount }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category_id: '',
  });

  // Debounce para la búsqueda (espera 500ms después de que el usuario deje de escribir)
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search]);

  // Para tipo y categoría, aplicar inmediatamente
  useEffect(() => {
    onFilterChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.type, filters.category_id]);

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleTypeChange = (e) => {
    setFilters({ ...filters, type: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category_id: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: '',
      category_id: '',
    });
  };

  const hasActiveFilters = filters.search || filters.type || filters.category_id;

  return (
    <div className="search-filter-bar">
      <input
        type="text"
        placeholder="Buscar por descripción o monto..."
        value={filters.search}
        onChange={handleSearchChange}
      />

      <select value={filters.type} onChange={handleTypeChange}>
        <option value="">Todos los tipos</option>
        <option value="INCOME">Ingreso</option>
        <option value="EXPENSE">Gasto</option>
      </select>

      <select value={filters.category_id} onChange={handleCategoryChange}>
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          className="btn btn-secondary"
          onClick={handleClearFilters}
          style={{ padding: '10px 15px' }}
        >
          Borrar filtros
        </button>
      )}

      {resultsCount !== null && (
        <span style={{ color: '#9fa6ad', fontSize: '0.9rem', marginLeft: '10px' }}>
          {resultsCount} {resultsCount === 1 ? 'resultado' : 'resultados'}
        </span>
      )}
    </div>
  );
};

export default TransactionFilters;