import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(formData.username, formData.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Iniciar Sesión</Title>
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
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Ingresa tu contraseña"
            />
          </InputGroup>

          {error && (
            <ErrorMessage>{error}</ErrorMessage>
          )}

          <Button type="submit">Iniciar Sesión</Button>
        </Form>
        <RegisterLink>
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </RegisterLink>
      </FormCard>
    </Container>
  );
};
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color, #6A858A);
  padding: 2rem;
  padding-top: 7rem;

  @media (max-width: 600px) {
    padding: 1rem;
    padding-top: 4rem;
  }
`;

const FormCard = styled.div`
  background: var(--primary, #333);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;

  @media (max-width: 900px) {
    max-width: 400px;
    padding: 1.5rem;
  }
  @media (max-width: 600px) {
    max-width: 98vw;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-family: var(--font-family, Arial, sans-serif);

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
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
  color: #fff;
  font-size: 1rem;

  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--secondary-color, #7F00FF);
  background-color: var(--white, #333);
  color: var;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff00;
    box-shadow: 0 0 0 2px rgba(0, 255, 0, 0.1);
  }

  &::placeholder {
    color: #666666;
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.6rem;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, var(--primary-color, #6A858A) 0%, var(--secondary-color, #7F00FF) 100%);
  color: #00ff00;
  border: 1px solid var(--secondary-color, #7F00FF);
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

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.7rem;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  text-align: center;
  font-size: 0.9rem;

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

const RegisterLink = styled.p`
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

  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;
export default LoginPage