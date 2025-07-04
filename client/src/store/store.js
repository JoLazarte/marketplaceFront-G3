import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import pagoReducer from './slices/pagoSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    pago: pagoReducer,
  },
});

export default store;
