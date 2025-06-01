import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Cart from '../Cart/Cart';
import { useCart } from '../../context/CartContext';
import SearchBar from '../../assets/SearchBar';
import ShoppCartIcon from '../../assets/ShoppCartIcon';
import './Header.css';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getItemCount } = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
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
        <NavItem>
          <Link to="/login">Iniciar Sesión</Link>
        </NavItem>
        <NavItem>
          <Link to="/register">Registrarse</Link>
        </NavItem>
        <CartButton onClick={toggleCart}>
          <ShoppCartIcon />
          <CartCount>({getItemCount()})</CartCount>
        </CartButton>
      </Nav>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #242424;
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
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  a {
    color: #00ff00;
    text-decoration: none;
    
    &:hover {
      text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    }
  }
`;

const SearchBarContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 2rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
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

const CartButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #00ff00;
  }
`;

const CartCount = styled.span`
  color: #ffffff;
  font-size: 0.9rem;
`;

export default Header;