import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const URL = 'http://localhost:8080/auth/register';

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!minLength) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (!hasUpperCase) {
      return 'La contraseña debe tener al menos una mayúscula';
    }
    if (!hasNumber) {
      return 'La contraseña debe tener al menos un número';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    if (name === 'email' && touched.email) {
      if (!value) {
        setErrors(prev => ({ ...prev, email: 'El email es requerido' }));
      } else if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Por favor, ingresa un email válido' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }

    if (name === 'password') {
      const passwordError = validatePassword(value);
      setErrors(prev => ({ ...prev, password: passwordError }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailError = !validateEmail(formData.email) ? 'Por favor, ingresa un email válido' : '';
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError
    });
    
    setTouched({
      email: true,
      password: true
    });

    if (emailError || passwordError) {
      return;
    }

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        role: 'BUYER'
      })
    })
      .then(async response => {
        const responseText = await response.text();
        
        try {
          const data = JSON.parse(responseText);
          if (data.ok) {
            setMessage({ 
              type: 'success', 
              text: '¡Registro exitoso! Redirigiendo al inicio de sesión...' 
            });
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          } else {
            setMessage({ 
              type: 'error', 
              text: data.error || 'Error al registrar usuario' 
            });
          }
        } catch (error) {
          console.error('Error al parsear la respuesta:', error);
          setMessage({ 
            type: 'error', 
            text: 'Error en la respuesta del servidor' 
          });
        }
      })
      .catch(error => {
        console.error('Error al hacer la petición:', error);
        setMessage({ 
          type: 'error', 
          text: 'Error de conexión. Por favor, intenta más tarde.' 
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <FormCard>
        <Title>Registro</Title>
        {message.text && (
          <MessageBox $type={message.type}>
            {message.text}
          </MessageBox>
        )}
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Nombre de usuario</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Ingresa tu nombre de usuario"
            />
          </InputGroup>

          <InputGroup>
            <Label>Contraseña</Label>
            <PasswordInputContainer>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Ingresa tu contraseña"
                $hasError={touched.password && !!errors.password}
              />
              <TogglePasswordButton
                type="button"
                onClick={togglePasswordVisibility}
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePasswordButton>
            </PasswordInputContainer>
            {touched.password && errors.password && (
              <ErrorMessage>{errors.password}</ErrorMessage>
            )}
            <PasswordRequirements>
              La contraseña debe tener:
              <RequirementList>
                <Requirement $isMet={formData.password.length >= 6}>
                  • Mínimo 6 caracteres
                </Requirement>
                <Requirement $isMet={/[A-Z]/.test(formData.password)}>
                  • Al menos una mayúscula
                </Requirement>
                <Requirement $isMet={/[0-9]/.test(formData.password)}>
                  • Al menos un número
                </Requirement>
              </RequirementList>
            </PasswordRequirements>
          </InputGroup>

          <InputGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Ingresa tu nombre"
            />
          </InputGroup>

          <InputGroup>
            <Label>Apellido</Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Ingresa tu apellido"
            />
          </InputGroup>

          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Ingresa tu email"
              $hasError={touched.email && !!errors.email}
            />
            {touched.email && errors.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
          </InputGroup>

          <Button type="submit">Registrarse</Button>
        </Form>
        <LoginLink>
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
        </LoginLink>
      </FormCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  padding: 2rem;
  padding-top: 7rem;
`;

const FormCard = styled.div`
  background: #242424;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h1`
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${props => props.$hasError ? '#ff4444' : '#404040'};
  background-color: #333333;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ff4444' : '#00ff00'};
    box-shadow: 0 0 0 2px ${props => props.$hasError ? 'rgba(255, 68, 68, 0.1)' : 'rgba(0, 255, 0, 0.1)'};
  }

  &::placeholder {
    color: #666666;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  color: #00ff00;
  border: 1px solid #404040;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
    border-color: #00ff00;
  }

  &:active {
    transform: translateY(0);
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #a8a8a8;

  a {
    color: #00ff00;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PasswordRequirements = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #a8a8a8;
`;

const RequirementList = styled.div`
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Requirement = styled.span`
  color: ${props => props.$isMet ? '#00ff00' : '#a8a8a8'};
  transition: color 0.3s ease;
`;

const MessageBox = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  text-align: center;
  background-color: ${props => props.$type === 'success' ? '#4CAF50' : '#f44336'};
  color: white;
  font-weight: 500;
`;

const PasswordInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px;
  width: 100%;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #00ff00;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export default RegisterPage; 