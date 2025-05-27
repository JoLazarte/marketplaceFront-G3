import NavAside from '../NavAside/NavAside'
import Footer from '../Footer/Footer'
import './Layout.css'
import Header from '../Header/Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header/>
      <NavAside/>
      <main>
        <section id='portada' >{children}</section>
        <section class='carrusel' id='nuevosLibros'>{children}</section>
        <section class='carrusel' id='librosMasVendidos'>{children}</section>
         <section class='carrusel' id='nuevosDiscos'>{children}</section>
        <section class='carrusel' id='discosMasVendidos'>{children}</section>
      </main>
      <Footer/>
    </>
  )
}
export default Layout