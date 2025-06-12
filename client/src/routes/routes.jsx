import React from 'react';
import {
  HomePage,
  EditProductPage,
  //Todas las rutas en index.jsx van aca
} from '.';
//...El resto de las rutas
import { ProductDetailPage } from './ProductDetailPage';
export const getRoute = (route, params) => {
  let path = route.path;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value);
    }
  }

  return path;
};

const ROUTES = {
  HOME: {
    path: '/',
    element: <HomePage />,
    title: 'Inicio',
    inNavMenu: false,
    adminOnly: false
  },
  PRODUCTDETAIL: {
    path: `/product/:id`,
    element: <ProductDetailPage />,
    title: 'Detalle de producto',
    inNavMenu: false,
    adminOnly: false
  },
  EDITPRODUCT: {
    path: `/edit-product/:id`,
    element: <EditProductPage />,
    title: 'Editar producto',
    inNavMenu: false,
    adminOnly: true
  }
  //demas rutas
};

export default ROUTES;