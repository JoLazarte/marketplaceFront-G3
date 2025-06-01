import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DetailPage from './pages/DetailPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
//import ProductCard from './components/ProductCard/ProductCard'
//se puede sacar el ProductGrid
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="detail/:type/:id" element={<DetailPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;