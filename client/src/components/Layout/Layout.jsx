import NavAside from '../NavAside/NavAside'
import Footer from '../Footer/Footer'
import './Layout.css'
import Header from '../Header/Header'
import Carrusel from '../Portada/Carrusel'
import { slides } from '../../assets/carouselData.json'
import Books from '../Book/Books'
import SubPortada from '../Portada/SubPortada'
import Reviews from '../Reviews/Reviews'


const Layout = () => {
  return (
    <>
      <Header/>
      <NavAside/>
      <main>
        <section id='portada' >
          <Carrusel data={slides}> </Carrusel>
        </section>
        <section id="subPortada" >
          <SubPortada/>
        </section>
        <br className='separation'/>
        <section className='carrusel' id='nuevosLibros'>
         <h3 className='h3layout'>Nuevos ingresos en libros</h3>
          <Books></Books>
        </section>
        <section className='carrusel' id='librosMasVendidos'>
          <h3>Los libros mas vendidos</h3>
          <Books></Books>
        </section>  
         <section className='carrusel' id='nuevosDiscos'>
            <h3>Nuevos ingresos en música</h3>
            <Books></Books>
         </section>
        <section className='carrusel' id='discosMasVendidos'>
          <h3>Artistas mas populares</h3> 
          <Books></Books>
        </section>
        <section className='grid'>
          <h3>Lo que dicen nuestros clientes</h3>
          <Reviews/>
        </section>
      </main>
      <Footer />
    </>
  )
}
export default Layout