import './Footer.css'
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsappSquare, FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
  
    <footer className='footer'>
      <div className="footer-container">
      <p className="footer-text">&copy; 2025 Dumbo Librerías. Todos los derechos reservados.</p>
      <div className="footer-btns">
        <Link to="/contact" className="btn btn-outline-light">Contacto</Link>
        <a href="#" className="btn btn-outline-light"><BiLogoGmail /></a>
        <a href="#" className="btn btn-outline-light"><FaWhatsappSquare /></a>
        <a href="#" className="btn btn-outline-light"><FaSquareFacebook /></a>
        <a href="#" className="btn btn-outline-light"><FaInstagramSquare /></a>
        <a href="#" className="btn btn-outline-light"><FaSquareXTwitter /></a>

      </div>
    </div>

    </footer>
   
  )
}

export default Footer