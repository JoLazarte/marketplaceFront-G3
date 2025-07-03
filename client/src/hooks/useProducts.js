import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { 
  fetchBooks, 
  fetchAlbums,
  setBooksFilter,
  setAlbumsFilter,
  resetBooksFilters,
  resetAlbumsFilters 
} from '../store/slices/productsSlice';
import {
  selectBooks,
  selectAlbums,
  selectFilteredBooks,
  selectBooksLoading,
  selectBooksError,
  selectBooksGenres,
  selectBooksFilters,
  selectFilteredAlbums,
  selectAlbumsLoading,
  selectAlbumsError,
  selectAlbumsGenres,
  selectAlbumsFilters
} from '../store/selectors/productsSelectors';

// Hook para manejar libros
export const useBooks = () => {
  const dispatch = useDispatch();
  
  const books = useSelector(selectFilteredBooks);
  const loading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);
  const genres = useSelector(selectBooksGenres);
  const filters = useSelector(selectBooksFilters);
  const allBooks = useSelector(selectBooks);

  const fetchBooksData = useCallback(() => {
    // Solo hacer fetch si no hay datos y no se está cargando
    if (allBooks.length === 0 && !loading) {
      dispatch(fetchBooks());
    }
  }, [dispatch, allBooks.length, loading]);

  const forceFetchBooks = useCallback(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const setFilter = useCallback((filterType, value) => {
    dispatch(setBooksFilter({ filterType, value }));
  }, [dispatch]);

  const resetFilters = useCallback(() => {
    dispatch(resetBooksFilters());
  }, [dispatch]);

  return {
    books,
    loading,
    error,
    genres,
    filters,
    fetchBooksData,
    forceFetchBooks,
    setFilter,
    resetFilters
  };
};

// Hook para manejar álbumes
export const useAlbums = () => {
  const dispatch = useDispatch();
  
  const albums = useSelector(selectFilteredAlbums);
  const loading = useSelector(selectAlbumsLoading);
  const error = useSelector(selectAlbumsError);
  const genres = useSelector(selectAlbumsGenres);
  const filters = useSelector(selectAlbumsFilters);
  const allAlbums = useSelector(selectAlbums);

  const fetchAlbumsData = useCallback(() => {
    // Solo hacer fetch si no hay datos y no se está cargando
    if (allAlbums.length === 0 && !loading) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, allAlbums.length, loading]);

  const forceFetchAlbums = useCallback(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const setFilter = useCallback((filterType, value) => {
    dispatch(setAlbumsFilter({ filterType, value }));
  }, [dispatch]);

  const resetFilters = useCallback(() => {
    dispatch(resetAlbumsFilters());
  }, [dispatch]);

  return {
    albums,
    loading,
    error,
    genres,
    filters,
    fetchAlbumsData,
    forceFetchAlbums,
    setFilter,
    resetFilters
  };
};

// Hook combinado para productos
export const useProducts = () => {
  const booksData = useBooks();
  const albumsData = useAlbums();

  return {
    books: booksData,
    albums: albumsData
  };
};
