import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });

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
      console.log('Respuesta del servidor:', data);

      if (data.ok) {
        const { access_token, ...userData } = data.data;
        
        // Guardamos el token
        localStorage.setItem('token', access_token);
        setToken(access_token);

        // Guardamos los datos del usuario
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);

        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error en el inicio de sesión' };
      }
    } catch (error) {
      console.error('Error al hacer login:', error);
      return { success: false, error: 'Error al conectar con el servidor' };
    }
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
          role: user.role // Mantenemos el rol actual
        })
      });

      const data = await response.json();
      console.log('Respuesta de actualización:', data);

      if (data.ok) {
        // Actualizamos los datos del usuario en el estado y localStorage
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error al actualizar el perfil' };
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      return { success: false, error: 'Error al conectar con el servidor' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      user,
      login, 
      logout,
      updateUserProfile,
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 