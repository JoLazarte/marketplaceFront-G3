import SearchBar from '../../assets/SearchBar'
import ShoppCartIcon from '../../assets/ShoppCartIcon'

import './Header.css'
const Header = () => {
  return (

    <div id='headerContainer'>
      <div id='logo'>
        <img src="/Dumbo.jpg" alt="Logo" width="45" height="45" className="me-2"/>
        <span className="logo-text">Dumbo Librerías</span>
      </div>
      <div className='menu' >
        <span id='searchBar'><SearchBar ></SearchBar></span>
      </div>
      <div className='menu'>
        <span className='contacto'>Contacto</span>
        <span className='icono-login' ><button className="btn btn-outline-light ms-2">Iniciar sesión</button></span>
        <span className='icono-cart' ><ShoppCartIcon ></ShoppCartIcon></span>
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
  )
}
export default Header