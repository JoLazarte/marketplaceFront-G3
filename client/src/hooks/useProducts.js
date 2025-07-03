import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
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
  selectBooksState,
  selectFilteredAlbums,
  selectAlbumsLoading,
  selectAlbumsError,
  selectAlbumsGenres,
  selectAlbumsFilters,
  selectAlbumsState
} from '../store/selectors/productsSelectors';

// Hook para manejar libros
export const useBooks = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAdmin } = useAuth();
  
  const books = useSelector(state => selectFilteredBooks(state));
  const loading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);
  const genres = useSelector(selectBooksGenres);
  const filters = useSelector(selectBooksFilters);
  const allBooks = useSelector(selectBooks);
  const booksState = useSelector(selectBooksState);

  const fetchBooksData = useCallback(() => {
    const isUserAdmin = isAdmin();
    const shouldFetchOnlyActive = !isUserAdmin; // Solo productos activos para no-admin
    
    // Solo hacer fetch si no hay datos o si cambió el contexto de admin
    const needsRefetch = allBooks.length === 0 || 
                        !booksState?.lastFetchParams ||
                        booksState.lastFetchParams.isAdmin !== isUserAdmin;
    
    if (needsRefetch && !loading) {
      console.log('Fetching books for user:', { isAdmin: isUserAdmin, activeOnly: shouldFetchOnlyActive });
      dispatch(fetchBooks({ 
        isAdmin: isUserAdmin, 
        activeOnly: shouldFetchOnlyActive 
      }));
    }
  }, [dispatch, allBooks.length, loading, isAdmin, booksState?.lastFetchParams?.isAdmin]);

  const forceFetchBooks = useCallback(() => {
    const isUserAdmin = isAdmin();
    const shouldFetchOnlyActive = !isUserAdmin;
    
    console.log('Force fetching books for user:', { isAdmin: isUserAdmin, activeOnly: shouldFetchOnlyActive });
    dispatch(fetchBooks({ 
      isAdmin: isUserAdmin, 
      activeOnly: shouldFetchOnlyActive 
    }));
  }, [dispatch, isAdmin]);

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
    resetFilters,
    isAdmin: isAdmin()
  };
};

// Hook para manejar álbumes
export const useAlbums = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAdmin } = useAuth();
  
  const albums = useSelector(state => selectFilteredAlbums(state));
  const loading = useSelector(selectAlbumsLoading);
  const error = useSelector(selectAlbumsError);
  const genres = useSelector(selectAlbumsGenres);
  const filters = useSelector(selectAlbumsFilters);
  const allAlbums = useSelector(selectAlbums);
  const albumsState = useSelector(selectAlbumsState);

  const fetchAlbumsData = useCallback(() => {
    const isUserAdmin = isAdmin();
    const shouldFetchOnlyActive = !isUserAdmin; // Solo productos activos para no-admin
    
    // Solo hacer fetch si no hay datos o si cambió el contexto de admin
    const needsRefetch = allAlbums.length === 0 || 
                        !albumsState.lastFetchParams ||
                        albumsState.lastFetchParams.isAdmin !== isUserAdmin;
    
    if (needsRefetch && !loading) {
      console.log('Fetching albums for user:', { isAdmin: isUserAdmin, activeOnly: shouldFetchOnlyActive });
      dispatch(fetchAlbums({ 
        isAdmin: isUserAdmin, 
        activeOnly: shouldFetchOnlyActive 
      }));
    }
  }, [dispatch, allAlbums.length, loading, isAdmin, albumsState?.lastFetchParams?.isAdmin]);

  const forceFetchAlbums = useCallback(() => {
    const isUserAdmin = isAdmin();
    const shouldFetchOnlyActive = !isUserAdmin;
    
    console.log('Force fetching albums for user:', { isAdmin: isUserAdmin, activeOnly: shouldFetchOnlyActive });
    dispatch(fetchAlbums({ 
      isAdmin: isUserAdmin, 
      activeOnly: shouldFetchOnlyActive 
    }));
  }, [dispatch, isAdmin]);

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
    resetFilters,
    isAdmin: isAdmin()
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
