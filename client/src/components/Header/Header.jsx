import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cart from '../Cart/Cart';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../../assets/SearchBar';
import ShoppCartIcon from '../../assets/ShoppCartIcon';
import { FaUser, FaChevronDown } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const { getItemCount } = useCart();
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
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

  const handleProductsMenu = () => {
    setShowProductsMenu((prev) => !prev);
  };

  const handleProductsNavigate = (route) => {
    setShowProductsMenu(false);
    navigate(route);
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
          <DropdownContainer>
            <DropdownButton onClick={handleProductsMenu}>
              Productos <FaChevronDown style={{ fontSize: '0.8em', marginLeft: 6 }} />
            </DropdownButton>
            {showProductsMenu && (
              <DropdownMenu>
                <DropdownMenuItem onClick={() => handleProductsNavigate('/books')}>
                  Libros
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleProductsNavigate('/albums')}>
                  Música
                </DropdownMenuItem>
              </DropdownMenu>
            )}
          </DropdownContainer>
        </NavItem>
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
        
        {/* El carrito solo lo ven los que NO son admin */}
        {!isAdmin() && (
          <CartContainer onClick={toggleCart}>
            <ShoppCartIcon />
            <CartCount>({getItemCount()})</CartCount>
          </CartContainer>
        )}
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
  position: relative;
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

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  padding: 0;
  &:hover {
    color: #00ff00;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  background: #242424;
  border: 1px solid #404040;
  border-radius: 8px;
  min-width: 140px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 2000;
  padding: 0.5rem 0;
`;

const DropdownMenuItem = styled.div`
  color: #fff;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  background: none;
  &:hover {
    background: rgba(0,255,0,0.08);
    color: #00ff00;
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