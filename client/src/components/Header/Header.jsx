import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cart from '../Cart/Cart';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../../assets/SearchBar';
import ShoppCartIcon from '../../assets/ShoppCartIcon';
import { FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { getItemCount } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    navigate('/profile');
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
        
        {isAuthenticated() ? (
          <UserSection>
            <UserButton onClick={toggleUserMenu}>
              <FaUser />
              <span>{user.firstName}</span>
            </UserButton>
            {showUserMenu && (
              <UserMenu>
                <UserInfo>
                  <strong>{user.firstName} {user.lastName}</strong>
                  <small>{user.email}</small>
                </UserInfo>
                <MenuDivider />
                <MenuItem onClick={handleProfileClick}>
                  Mi Perfil
                </MenuItem>
                <MenuDivider />
                <MenuItem as="button" onClick={handleLogout}>
                  Cerrar Sesión
                </MenuItem>
              </UserMenu>
            )}
          </UserSection>
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

const UserSection = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    color: #00ff00;
    background: rgba(0, 255, 0, 0.1);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const UserMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #242424;
  border: 1px solid #404040;
  border-radius: 8px;
  padding: 8px 0;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-top: 8px;
  z-index: 1000;
`;

const UserInfo = styled.div`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    color: #ffffff;
  }

  small {
    color: #808080;
  }
`;

const MenuDivider = styled.hr`
  border: none;
  border-top: 1px solid #404040;
  margin: 8px 0;
`;

const MenuItem = styled.a`
  display: block;
  padding: 8px 16px;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 1rem;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
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