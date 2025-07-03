import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProductFilters = ({ 
  filters, 
  genres, 
  onGenreChange, 
  onSearchChange, 
  onBestsellerChange, 
  onPromoChange,
  addRoute,
  addButtonText 
}) => {
  const navigate = useNavigate();
  const { canEditProducts } = useAuth();

  return (
    <BarraFiltros>
      <Filtros>
        <SearchInput
          type="text"
          placeholder="Buscar por título, autor o artista..."
          value={filters.search}
          onChange={e => onSearchChange(e.target.value)}
        />
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={filters.bestseller}
            onChange={e => onBestsellerChange(e.target.checked)}
          />
          Más vendidos
        </CheckboxLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={filters.promo}
            onChange={e => onPromoChange(e.target.checked)}
          />
          Promociones
        </CheckboxLabel>
        <Select value={filters.genre} onChange={e => onGenreChange(e.target.value)}>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Select>
      </Filtros>
      {canEditProducts && canEditProducts() && (
        <AddButton onClick={() => navigate(addRoute)}>
          {addButtonText}
        </AddButton>
      )}
    </BarraFiltros>
  );
};

// Styled Components
const BarraFiltros = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Filtros = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const SearchInput = styled.input`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  width: 220px;
  &::placeholder {
    color: #888;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  color: #bdbdbd;
  input[type="checkbox"] {
    accent-color: #01be96;
    width: 1rem;
    height: 1rem;
  }
`;

const Select = styled.select`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
`;

const AddButton = styled.button`
  background: #181818;
  color: #fff;
  border: 2px solid #00ff00;
  border-radius: 2rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0,255,0,0.08);
  transition: all 0.2s;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    background: #00ff00;
    color: #181818;
    box-shadow: 0 6px 24px rgba(0,255,0,0.18);
    border-color: #00ff00;
  }
`;

export default ProductFilters;
