import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Card>
        <Title>Mi Perfil</Title>
        <Content>
          <InfoGroup>
            <Label>Nombre de usuario</Label>
            <Value>{user.username}</Value>
          </InfoGroup>
          
          <InfoGroup>
            <Label>Nombre</Label>
            <Value>{user.firstName}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Apellido</Label>
            <Value>{user.lastName}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Email</Label>
            <Value>{user.email}</Value>
          </InfoGroup>

        </Content>
      </Card>
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

const Card = styled.div`
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

const Content = styled.div`
  color: #ffffff;
`;

const InfoGroup = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const Label = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Value = styled.p`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
`;

export default ProfilePage; 