import NavAside from '../NavAside/NavAside'
import Footer from '../Footer/Footer'
import './Layout.css'
import Header from '../Header/Header'
import Carrusel from '../Portada/Carrusel'
import { slides } from '../../assets/carouselData.json'
import Books from '../Book/Books'


const Layout = () => {
  return (
    <>
      <Header/>
      <NavAside/>
      <main>
        <section id='portada' >
          <Carrusel data={slides}> </Carrusel>
        </section>
        <h3>Nuevos ingresos en libros</h3>
        <section className='carrusel' id='nuevosLibros'>
          <Books></Books>
        </section>
        <h3>Los libros mas vendidos</h3>
        <section className='carrusel' id='librosMasVendidos'>
          <Books></Books>
        </section>
        <h3>Nuevos ingresos en música</h3>
         <section className='carrusel' id='nuevosDiscos'>
            <Books></Books>
         </section>
        <h3>Artistas mas populares</h3> 
        <section className='carrusel' id='discosMasVendidos'>
          <Books></Books>
        </section>
      </main>
      <Footer/>
    </>
  )
}
export default Layout