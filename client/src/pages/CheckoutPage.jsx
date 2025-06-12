import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8080';

  const handleCancel = () => {
    navigate(-1); // Vuelve a la página anterior
  };

  const processPurchase = async (cartId) => {
    try {
      const response = await fetch(`${API_URL}/buys/process/${cartId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Error al procesar la compra');
      }

      console.log('Compra exitosa:', data.data);
      return data.data;
    } catch (error) {
      console.error('Error en la compra:', error);
      throw error;
    }
  };

  const handleConfirmPurchase = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Obtenemos el cartId del localStorage
      const cartId = localStorage.getItem('currentCartId');
      
      if (!cartId) {
        throw new Error('No se encontró el ID del carrito. Por favor, vuelve al carrito e intenta nuevamente.');
      }

      // Procesamos la compra
      const purchaseData = await processPurchase(cartId);
      console.log('Compra procesada:', purchaseData);

      // Limpiamos el carrito local y el cartId del localStorage después de una compra exitosa
      clearCart();
      localStorage.removeItem('currentCartId');
      
      // Redirigimos a una página de éxito o al inicio
      navigate('/');
      
    } catch (err) {
      console.error('Error en la compra:', err);
      setError(err.message || 'Error al procesar la compra. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <CheckoutCard>
        <Title>Confirmar Compra</Title>
        
        <UserInfo>
          <h3>Información del Cliente</h3>
          <p>Nombre: {user.firstName} {user.lastName}</p>
          <p>Email: {user.email}</p>
        </UserInfo>

        <OrderSummary>
          <h3>Resumen del Pedido</h3>
          {cartItems.map(item => (
            <ItemRow key={item.id}>
              <ItemImage src={Array.isArray(item.urlImage) ? item.urlImage[0] : item.urlImage} alt={item.title} />
              <ItemInfo>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDetails>
                  <span>Cantidad: {item.quantity}</span>
                  <span>Precio unitario: ${item.price}</span>
                  <span>Subtotal: ${(item.price * item.quantity).toFixed(2)}</span>
                </ItemDetails>
              </ItemInfo>
            </ItemRow>
          ))}
        </OrderSummary>

        <TotalSection>
          <TotalLabel>Total a Pagar:</TotalLabel>
          <TotalAmount>${getCartTotal().toFixed(2)}</TotalAmount>
        </TotalSection>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <ConfirmButton 
            onClick={handleConfirmPurchase}
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Confirmar Compra'}
          </ConfirmButton>
          <CancelButton 
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </CancelButton>
        </ButtonGroup>
      </CheckoutCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 7rem;
`;

const CheckoutCard = styled.div`
  background: #242424;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`;

const UserInfo = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #2a2a2a;
  border-radius: 8px;
  
  h3 {
    color: #00ff00;
    margin-bottom: 1rem;
  }
  
  p {
    color: #ffffff;
    margin: 0.5rem 0;
  }
`;

const OrderSummary = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    color: #00ff00;
    margin-bottom: 1rem;
  }
`;

const ItemRow = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #333;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h4`
  color: #ffffff;
  margin: 0 0 0.5rem 0;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: #a8a8a8;
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #2a2a2a;
  border-radius: 8px;
  margin: 2rem 0;
`;

const TotalLabel = styled.span`
  color: #ffffff;
  font-size: 1.2rem;
`;

const TotalAmount = styled.span`
  color: #00ff00;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ConfirmButton = styled(Button)`
  flex: 2;
  background: #00ff00;
  color: #000000;
  border: none;
  
  &:hover:not(:disabled) {
    background: #00cc00;
    transform: translateY(-2px);
  }
`;

const CancelButton = styled(Button)`
  flex: 1;
  background: #333;
  color: #ffffff;
  border: 1px solid #404040;
  
  &:hover:not(:disabled) {
    background: #404040;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #ffffff;
  padding: 2rem;
  background: #242424;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BackButton = styled(Button)`
  background: #00ff00;
  color: #000000;
  border: none;
  padding: 0.75rem 1.5rem;
  
  &:hover {
    background: #00cc00;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ff4444;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: 1rem 0;
`;

export default CheckoutPage; 