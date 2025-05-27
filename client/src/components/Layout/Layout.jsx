import NavAside from '../NavAside/NavAside'
import Footer from '../Footer/Footer'
import './Layout.css'
import Header from '../Header/Header'
import CarruselPortada from '../../assets/CarruselPortada'
import ProductGrid from '../ProductCard/ProductGrid'

const Layout = () => {
  return (
    <>
      <Header/>
      <NavAside/>
      <main>
        <section id='portada' >
          <CarruselPortada > </CarruselPortada>
        </section>
        <h3>Nuevos ingresos en libros</h3>
        <section class='carrusel' id='nuevosLibros'>
          <ProductGrid></ProductGrid>
        </section>
        <h3>Los libros mas vendidos</h3>
        <section class='carrusel' id='librosMasVendidos'>
          <ProductGrid></ProductGrid>
        </section>
        <h3>Nuevos ingresos en música</h3>
         <section class='carrusel' id='nuevosDiscos'>
            <ProductGrid></ProductGrid>
         </section>
        <h3>Artistas mas populares</h3> 
        <section class='carrusel' id='discosMasVendidos'>
          <ProductGrid></ProductGrid>
        </section>
      </main>
      <Footer/>
    </>
  )
}
export default Layout