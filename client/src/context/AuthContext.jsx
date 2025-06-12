import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Recupera token y user de localStorage si existen
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [role, setRole] = useState(() => localStorage.getItem('role') || 'BUYER_NO_REGISTRADO');

  // Sincroniza cambios en token/user/role con localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

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

        // Guarda en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName
        }));
        localStorage.setItem('role', userData.role || 'BUYER');

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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const isAdmin = () => role === 'ADMIN';
  const isBuyer = () => role === 'BUYER';
  const isBuyerNoRegistrado = () => role === 'BUYER_NO_REGISTRADO';

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