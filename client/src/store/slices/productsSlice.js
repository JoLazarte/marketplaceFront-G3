import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks para obtener productos
export const fetchBooks = createAsyncThunk(
  'products/fetchBooks',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Evitar múltiples llamadas si ya hay datos
      const state = getState();
      if (state.products.books.data.length > 0) {
        return state.products.books.data;
      }
      
      const response = await fetch('http://localhost:8080/books');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.content || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAlbums = createAsyncThunk(
  'products/fetchAlbums',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Evitar múltiples llamadas si ya hay datos
      const state = getState();
      if (state.products.albums.data.length > 0) {
        return state.products.albums.data;
      }
      
      const response = await fetch('http://localhost:8080/musicAlbums');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.content || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Función auxiliar para obtener géneros únicos
const getAllGenres = (products, genreKey) => {
  const genres = new Set();
  products.forEach(product => {
    const productGenres = product[genreKey] || [];
    productGenres.forEach(genre => genres.add(genre));
  });
  return Array.from(genres);
};

// Función auxiliar para filtrar productos
const filterProducts = (products, filters, genreKey) => {
  let filtered = [...products];

  if (filters.genre !== 'Todos') {
    filtered = filtered.filter(product => 
      (product[genreKey] || []).includes(filters.genre)
    );
  }

  if (filters.search.trim() !== '') {
    filtered = filtered.filter(product => {
      const titleMatch = product.title?.toLowerCase().includes(filters.search.toLowerCase());
      const authorMatch = product.author?.toLowerCase().includes(filters.search.toLowerCase());
      const artistMatch = product.artist?.toLowerCase().includes(filters.search.toLowerCase());
      return titleMatch || authorMatch || artistMatch;
    });
  }

  if (filters.bestseller) {
    filtered = filtered.sort((a, b) => a.id - b.id).slice(0, 3);
  }

  if (filters.promo) {
    filtered = filtered.filter(product => product.price < 20);
  }

  return filtered;
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    books: {
      data: [],
      filteredData: [],
      loading: false,
      error: null,
      genres: ['Todos'],
      filters: {
        genre: 'Todos',
        search: '',
        bestseller: false,
        promo: false,
      },
    },
    albums: {
      data: [],
      filteredData: [],
      loading: false,
      error: null,
      genres: ['Todos'],
      filters: {
        genre: 'Todos',
        search: '',
        bestseller: false,
        promo: false,
      },
    },
  },
  reducers: {
    // Filtros para libros
    setBooksFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.books.filters[filterType] = value;
      state.books.filteredData = filterProducts(
        state.books.data,
        state.books.filters,
        'genreBooks'
      );
    },
    resetBooksFilters: (state) => {
      state.books.filters = {
        genre: 'Todos',
        search: '',
        bestseller: false,
        promo: false,
      };
      state.books.filteredData = [...state.books.data];
    },
    // Filtros para álbumes
    setAlbumsFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.albums.filters[filterType] = value;
      state.albums.filteredData = filterProducts(
        state.albums.data,
        state.albums.filters,
        'genres'
      );
    },
    resetAlbumsFilters: (state) => {
      state.albums.filters = {
        genre: 'Todos',
        search: '',
        bestseller: false,
        promo: false,
      };
      state.albums.filteredData = [...state.albums.data];
    },
  },
  extraReducers: (builder) => {
    builder
      // Casos para libros
      .addCase(fetchBooks.pending, (state) => {
        state.books.loading = true;
        state.books.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books.loading = false;
        state.books.data = action.payload;
        state.books.filteredData = action.payload;
        state.books.genres = ['Todos', ...getAllGenres(action.payload, 'genreBooks')];
        state.books.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.books.loading = false;
        state.books.error = action.payload;
        state.books.data = [];
        state.books.filteredData = [];
      })
      // Casos para álbumes
      .addCase(fetchAlbums.pending, (state) => {
        state.albums.loading = true;
        state.albums.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums.loading = false;
        state.albums.data = action.payload;
        state.albums.filteredData = action.payload;
        state.albums.genres = ['Todos', ...getAllGenres(action.payload, 'genres')];
        state.albums.error = null;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.albums.loading = false;
        state.albums.error = action.payload;
        state.albums.data = [];
        state.albums.filteredData = [];
      });
  },
});

export const {
  setBooksFilter,
  resetBooksFilters,
  setAlbumsFilter,
  resetAlbumsFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
