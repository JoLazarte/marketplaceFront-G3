import LoginIcon from '../../assets/LoginIcon'
import SearchBar from '../../assets/SearchBar'
import ShoppCartIcon from '../../assets/ShoppCartIcon'

import './Header.css'
const Header = () => {
  return (

    <div id='headerContainer'>
      <div id='logo'>
        <span></span>
      </div>
      <div class='menu'>
        <span id='searchBar'><SearchBar ></SearchBar></span>
      </div>
      <div class='menu'>
        <span class='icono-login' ><LoginIcon ></LoginIcon></span>
        <span class='icono-cart' ><ShoppCartIcon ></ShoppCartIcon></span>
      </div>
    </div>
  )
}
export default Header