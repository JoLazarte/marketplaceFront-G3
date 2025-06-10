import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Cart from '../Cart/Cart';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../../assets/SearchBar';
import ShoppCartIcon from '../../assets/ShoppCartIcon';


const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getItemCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div id='logo'>
            <img src="/Dumbo.jpg" alt="Logo" width="45" height="45" className="me-2"/>
            <span className="logo-text">Dumbo Librerías</span>
          </div>
        </Link>
      </Logo>

      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>

      <Nav>
        <NavItem>
          <Link to="/contact">Contacto</Link>
        </NavItem>
        
        {isAuthenticated ? (
          <>
            <NavItem>
              <Link to="/profile">Mi Perfil</Link>
            </NavItem>
            <NavItem>
              <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <Link to="/login">Iniciar Sesión</Link>
            </NavItem>
            <NavItem>
              <Link to="/register">Registrarse</Link>
            </NavItem>
          </>
        )}
        
        <CartContainer onClick={toggleCart}>
          <ShoppCartIcon />
          <CartCount>({getItemCount()})</CartCount>
        </CartContainer>
      </Nav>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: var(--primary-color);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  a {
    font-color:var(--primary-color);
    text-decoration: none;
    &:hover {
      text-shadow: 0 0 10px #ffffff;
    }
  }

  @media (max-width: 480px) {
    .logo-text {
      font-size: 1.2rem;
    }
  }
`;

const SearchBarContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 2rem;

  @media (max-width: 768px) {
    margin: 1rem 0;
    width: 100%;
    max-width: 100%;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    gap: 1rem;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

const NavItem = styled.div`
  a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #00ff00;
    }
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0;

  &:hover {
    color: #00ff00;
  }
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  color: #ffffff;

  &:hover {
    color: #00ff00;
  }
`;

const CartCount = styled.span`
  color: #ffffff;
  font-size: 0.9rem;
`;

export default Header;