import './Footer.css'
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsappSquare, FaInstagramSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">&copy; 2025 Dumbo Librerías. Todos los derechos reservados.</p>
          <div className="footer-btns">
            <button 
              className="footer-btn" 
              onClick={handleContactClick}
            >
              Contacto
            </button>
            <a href="mailto:contacto@dumbolibrerias.com" className="footer-btn">
              <BiLogoGmail />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="footer-btn">
              <FaWhatsappSquare />
            </a>
            <a href="https://facebook.com/dumbolibrerias" target="_blank" rel="noopener noreferrer" className="footer-btn">
              <FaSquareFacebook />
            </a>
            <a href="https://instagram.com/dumbolibrerias" target="_blank" rel="noopener noreferrer" className="footer-btn">
              <FaInstagramSquare />
            </a>
            <a href="https://twitter.com/dumbolibrerias" target="_blank" rel="noopener noreferrer" className="footer-btn">
              <FaSquareXTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer