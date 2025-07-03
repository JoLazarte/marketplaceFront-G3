// Selectores para libros
export const selectBooksState = (state) => state.products.books;
export const selectBooks = (state) => state.products.books.data;
export const selectFilteredBooks = (state) => state.products.books.filteredData;
export const selectBooksLoading = (state) => state.products.books.loading;
export const selectBooksError = (state) => state.products.books.error;
export const selectBooksGenres = (state) => state.products.books.genres;
export const selectBooksFilters = (state) => state.products.books.filters;

// Selectores para álbumes
export const selectAlbumsState = (state) => state.products.albums;
export const selectAlbums = (state) => state.products.albums.data;
export const selectFilteredAlbums = (state) => state.products.albums.filteredData;
export const selectAlbumsLoading = (state) => state.products.albums.loading;
export const selectAlbumsError = (state) => state.products.albums.error;
export const selectAlbumsGenres = (state) => state.products.albums.genres;
export const selectAlbumsFilters = (state) => state.products.albums.filters;
