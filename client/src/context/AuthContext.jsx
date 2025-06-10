import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('BUYER_NO_REGISTRADO');

  const isAuthenticated = () => {
    return token !== null && user !== null && role !== 'BUYER_NO_REGISTRADO';
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const response = await fetch('http://localhost:8080/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...updatedData,
          role: user.role
        })
      });

      const data = await response.json();
      console.log('Respuesta de actualización:', data);

      if (data.ok) {
        const updatedUser = {
          ...user,
          ...updatedData
        };
        setUser(updatedUser);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error || 'Error al actualizar el perfil' 
        };
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      return { 
        success: false, 
        error: 'Error al conectar con el servidor' 
      };
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.ok && data.data?.access_token) {
        const userData = data.data;
        const token = userData.access_token;
        
        setToken(token);
        setUser({
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName
        });
        setRole(userData.role || 'BUYER');
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error || 'Error en la autenticación' 
        };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        error: 'Error de conexión. Por favor, intenta más tarde.' 
      };
    }
  };

  const logout = () => {
    navigate('/');
    setToken(null);
    setUser(null);
    setRole('BUYER_NO_REGISTRADO');
  };

  // Funciones de verificación de roles
  const isAdmin = () => role === 'ADMIN';
  const isBuyer = () => role === 'BUYER';
  const isBuyerNoRegistrado = () => role === 'BUYER_NO_REGISTRADO';

  // Funciones de verificación de permisos
  const canViewCart = () => role === 'BUYER' || role === 'BUYER_NO_REGISTRADO';
  const canEditProducts = () => role === 'ADMIN';
  const canMakePurchase = () => role === 'BUYER' || role === 'BUYER_NO_REGISTRADO';

  const value = {
    token,
    user,
    role,
    login,
    logout,
    isAdmin,
    isBuyer,
    isBuyerNoRegistrado,
    canViewCart,
    canEditProducts,
    canMakePurchase,
    isAuthenticated,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth }; 