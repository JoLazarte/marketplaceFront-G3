import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DetailPage from './pages/DetailPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import { CartProvider } from './context/CartContext'
import BooksPage from './pages/BooksPage'
import AlbumsPage from './pages/AlbumsPage'
//import ProductCard from './components/ProductCard/ProductCard'
//se puede sacar el ProductGrid
function App() {
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="detail/:type/:id" element={<DetailPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/books" element={<BooksPage />} />
      </Routes>
      <Footer />
    </CartProvider>
  )
}

export default App;