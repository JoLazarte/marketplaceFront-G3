import ShoppCartIcon from '../../assets/ShoppCartIcon'
import './NavAside.css'
const NavAside = () => {
  return (

    <div id='navAside'>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=' menuAside ' id="navbarNavDropdown">
            <p className='icono-menu' >LIBROS</p>
            <p className='icono-menu' >MÚSICA</p>
            <p className='icono-menu' >PREVENTAS ONLINE</p>
            <p className='icono-menu' >LIBROS FIRMADOS</p>
            <p className='icono-menu' >PROMOCIONES</p>
            <p className='icono-menu' >ENVIOSA TODO EL PAÍS</p>
            <p className='icono-menu' >DONÁ UN LIBRO HOY</p>
        </div>
    </div>
  )
}
export default NavAside