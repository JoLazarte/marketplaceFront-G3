import './Footer.css'
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsappSquare, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
  
    <footer>
      <div className="container d-flex justify-content-between align-items-center flex-wrap" >
      <p className="mb-0 marginright">&copy; 2025 Dumbo Librerías. Todos los derechos reservados.</p>
      <div className="footer-btns">
        <button className="btn btn-outline-light">Contacto</button>
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