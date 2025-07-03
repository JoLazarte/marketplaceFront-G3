# Marketplace Frontend - G3

## 🎯 Proyecto de E-commerce con React + Redux

Este proyecto es una aplicación de marketplace desarrollada con React, Vite y Redux para la gestión de productos (libros y álbumes musicales).

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 19 + Vite
- **Estado Global**: Redux Toolkit
- **Routing**: React Router DOM
- **Estilos**: Styled Components + CSS
- **Animaciones**: Framer Motion
- **UI**: Material-UI
- **Iconos**: React Icons

## 📦 Características Principales

### 🔄 Redux Implementation
- ✅ **Gestión centralizada** del estado de productos
- ✅ **Filtros en tiempo real** (género, búsqueda, promociones, bestsellers)
- ✅ **Carga asíncrona** optimizada con async thunks
- ✅ **Prevención de loops infinitos** con useCallback y validaciones
- ✅ **Selectores memoizados** para mejor performance

### 🎨 UI/UX Mejorada
- ✅ **Animaciones divertidas** durante la carga (📚 para libros, 🎵 para álbumes)
- ✅ **Manejo de errores** con pantallas animadas y botón de retry
- ✅ **Estilos consistentes** entre páginas de libros y álbumes
- ✅ **Componentes reutilizables** (ProductFilters, ProductGrid, LoadingSpinner)
- ✅ **Footer modernizado** con efectos hover verdes y diseño compacto

### 🎯 Footer Moderno
- ✅ **Diseño elegante** con fondo negro degradado
- ✅ **Efectos hover** verde neón (#00ff00) con animaciones
- ✅ **Responsive design** adaptable a móviles
- ✅ **Enlaces funcionales** (email, WhatsApp, redes sociales)
- ✅ **Navegación integrada** (botón Contacto → /contact)
- ✅ **Compatibilidad Bootstrap** sin conflictos de estilos

### 🛡️ Funcionalidades Avanzadas
- ✅ **Autenticación** con context API
- ✅ **Carrito de compras** funcional
- ✅ **CRUD de productos** con permisos
- ✅ **Estados de stock** (sin stock, promociones)
- ✅ **Responsive design**

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Book/            # Cards de libros
│   ├── Disco/           # Cards de álbumes
│   ├── LoadingSpinner/  # Spinner animado
│   ├── ErrorDisplay/    # Pantalla de error
│   ├── ProductFilters/  # Filtros reutilizables
│   ├── ProductGrid/     # Grilla de productos
│   └── ProductPageLayout/ # Layout común
├── store/               # Redux store
│   ├── store.js         # Configuración principal
│   ├── slices/          # Redux slices
│   └── selectors/       # Selectores memoizados
├── hooks/               # Hooks personalizados
├── pages/               # Páginas principales
├── context/             # Context providers
└── routes/              # Configuración de rutas
```

## 🛠️ Componentes Principales

### Redux Store
- **ProductsSlice**: Manejo de libros y álbumes
- **Async Thunks**: Llamadas optimizadas a la API
- **Filtros**: Género, búsqueda, bestsellers, promociones

### Hooks Personalizados
- `useBooks()`: Hook para manejar libros
- `useAlbums()`: Hook para manejar álbumes
- `useProducts()`: Hook combinado

### Componentes Reutilizables
- `LoadingSpinner`: Animaciones de carga personalizadas
- `ErrorDisplay`: Manejo elegante de errores
- `ProductFilters`: Filtros universales
- `ProductGrid`: Grilla responsive

## 🎮 Uso del Sistema Redux

```jsx
// Ejemplo de uso en componentes
import { useBooks } from '../hooks/useProducts';

const MyComponent = () => {
  const {
    books,
    loading,
    error,
    filters,
    setFilter,
    fetchBooksData
  } = useBooks();

  // Cambiar filtros
  const handleSearch = (search) => {
    setFilter('search', search);
  };

  return (
    <div>
      {loading ? <LoadingSpinner /> : books.map(book => ...)}
    </div>
  );
};
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🎯 Características de Performance

1. **Memoización**: useCallback para prevenir re-renders
2. **Selectores optimizados**: Datos filtrados en tiempo real
3. **Lazy loading**: Componentes cargados bajo demanda
4. **Prevención de loops**: Validaciones en async thunks
5. **Cache inteligente**: Evita llamadas innecesarias a la API

## 🎨 Estilos y Animaciones

- **Tema oscuro** con acentos verdes (#00ff00)
- **Gradientes** y efectos glassmorphism
- **Animaciones CSS**: bounce, spin, float, wave, pulse
- **Hover effects** suaves y responsivos
- **Estados visuales** para stock, carga y errores

## 📱 Responsive Design

- **Mobile first** approach
- **Grid layouts** adaptativos
- **Componentes flexibles**
- **Imágenes optimizadas**

## 🔧 Configuración del Entorno

Actualmente configurado con:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) para Fast Refresh con Babel
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) para Fast Refresh con SWC

## 📋 Próximas Mejoras

- [ ] Persistencia de filtros en localStorage
- [ ] Paginación de productos
- [ ] Filtros avanzados (precio, rating)
- [ ] Cache de API con React Query
- [ ] Tests unitarios y de integración
- [ ] PWA capabilities
- [ ] Optimización SEO

---

**🎉 ¡Disfruta explorando el marketplace!** 

Para más detalles sobre la implementación Redux, consulta `REDUX_PRODUCTS.md`.
