import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { discs as albums } from '../components/Disco/Discs';
import ProductCardDiscs from '../components/Disco/ProductCardDiscs';
import { useNavigate } from 'react-router-dom';

const getAllGenres = (albums) => {
  const genres = new Set();
  albums.forEach(album => album.genres.forEach(g => genres.add(g)));
  return ['Todos', ...Array.from(genres)];
};

const AlbumsPage = () => {
  const [genre, setGenre] = useState('Todos');
  const [search, setSearch] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [promo, setPromo] = useState(false);
  const navigate = useNavigate();

  // Simulación: más vendidos = primeros 3, promociones = precio < 25
  const filteredAlbums = useMemo(() => {
    let filtered = albums;

    if (genre !== 'Todos') {
      filtered = filtered.filter(album => album.genres.includes(genre));
    }
    if (search.trim() !== '') {
      filtered = filtered.filter(album =>
        album.title.toLowerCase().includes(search.toLowerCase()) ||
        album.author.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (bestseller) {
      filtered = [...filtered].sort((a, b) => a.id - b.id).slice(0, 3);
    }
    if (promo) {
      filtered = filtered.filter(album => album.price < 25);
    }
    return filtered;
  }, [genre, search, bestseller, promo]);

  return (
    <Bg>
      <Wrapper>
        <Header>
          <h1>Álbumes</h1>
        </Header>
        <BarraFiltros>
          <Filtros>
            <SearchInput
              type="text"
              placeholder="Buscar por título o artista..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={bestseller}
                onChange={e => setBestseller(e.target.checked)}
              />
              Más vendidos
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={promo}
                onChange={e => setPromo(e.target.checked)}
              />
              Promociones
            </CheckboxLabel>
            <Select value={genre} onChange={e => setGenre(e.target.value)}>
              {getAllGenres(albums).map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Select>
          </Filtros>
          <AddButton
            onClick={() => navigate('/album-form')}
          >
            + Agregar Álbum
          </AddButton>
        </BarraFiltros>
        <Grid>
          {filteredAlbums.length === 0 ? (
            <Empty>No se encontraron álbumes.</Empty>
          ) : (
            filteredAlbums.map(album => (
              <ProductCardDiscs key={album.id} item={album} />
            ))
          )}
        </Grid>
      </Wrapper>
    </Bg>
  );
};

export default AlbumsPage;

// --- Estilos ---
const Bg = styled.div`
  min-height: 80vh;
  background: #181818;
  color: #fff;
  padding-bottom: 3rem;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 0 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }
`;

const BarraFiltros = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  justify-content: space-between;
`;

const Filtros = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
`;

const Empty = styled.div`
  color: #888;
  font-size: 1.2rem;
  grid-column: 1/-1;
  text-align: center;
  margin-top: 2rem;
`;