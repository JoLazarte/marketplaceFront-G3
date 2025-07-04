import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import pagoReducer from './slices/pagoSlice';
import productsReducer from './slices/productsSlice'; // NUEVO

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    pago: pagoReducer,
    products: productsReducer, // NUEVO
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export default store;