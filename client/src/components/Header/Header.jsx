import SearchBar from '../../assets/SearchBar'
import ShoppCartIcon from '../../assets/ShoppCartIcon'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <div id='headerContainer'>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div id='logo'>
          <img src="/Dumbo.jpg" alt="Logo" width="45" height="45" className=" me-2"/>
          <span className="logo-text">Dumbo Librerías</span>
        </div>
      </Link>
      <div className='menu' >
        <span id='searchBar'><SearchBar ></SearchBar></span>
      </div>
      <div className='menu'>
        <span className='contacto'>Contacto</span>
        <span className='icono-login'>
          <Link to="/register">
            <button className="btn btn-outline-light ms-2">Registrarme</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-outline-light ms-2">Iniciar sesión</button>
          </Link>
        </span>
        <span className='icono-cart'><ShoppCartIcon ></ShoppCartIcon></span>
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
  )
}

export default Header