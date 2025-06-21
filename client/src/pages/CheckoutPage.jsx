import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useBuys } from '../hooks/useBuys';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const { confirmBuy, emptyBuy, loading, error } = useBuys();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancel = async () => {
    // Obtener el ID de la compra
    const buyId = localStorage.getItem('currentBuyId');
    
    if (!buyId) {
      // Si no hay buyId, simplemente volver atrás
      navigate(-1);
      return;
    }

    // Mostrar modal de confirmación
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const buyId = localStorage.getItem('currentBuyId');
      
      // Vaciar la compra en el backend
      await emptyBuy(buyId, token);
      
      // Limpiar localStorage y carrito
      localStorage.removeItem('currentBuyId');
      clearCart();
      
      // Cerrar modal y volver al home
      setShowCancelModal(false);
      navigate('/');
    } catch (err) {
      console.error('Error al cancelar la compra:', err);
      alert('Error al cancelar la compra. Por favor, intenta nuevamente.');
    }
  };

  const handleCancelModalClose = () => {
    setShowCancelModal(false);
  };

  const handleConfirmPurchase = async () => {
    try {
      // Obtener el ID de la compra que se guardó en localStorage
      const buyId = localStorage.getItem('currentBuyId');
      
      if (!buyId) {
        throw new Error('No se encontró el ID de la compra. Por favor, vuelve al carrito e intenta nuevamente.');
      }

      const confirmedBuy = await confirmBuy(buyId, token);
      console.log('Compra confirmada:', confirmedBuy);

      clearCart();
      
      localStorage.removeItem('currentBuyId');
      
     
      setShowSuccessModal(true);
      
    } catch (err) {
      console.error('Error en la compra:', err);

    }
  };

  const handleGoHome = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  return (
    <>
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

      {/* Modal de éxito */}
      {showSuccessModal && (
        <>
          <SuccessModal>
            <SuccessContent>
              <SuccessIcon>✓</SuccessIcon>
              <SuccessTitle>¡Compra Confirmada!</SuccessTitle>
              <SuccessMessage>
                Tu compra ha sido procesada exitosamente. 
                Recibirás un email de confirmación con los detalles de tu pedido.
              </SuccessMessage>
              <HomeButton onClick={handleGoHome}>
                Volver al Inicio
              </HomeButton>
            </SuccessContent>
          </SuccessModal>
          <ModalOverlay onClick={handleGoHome} />
        </>
      )}

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && (
        <CancelModal>
          <CancelContent>
            <CancelTitle>¿Estás seguro de que quieres cancelar esta compra?</CancelTitle>
            <CancelButtons>
              <CancelModalButton 
                onClick={handleConfirmCancel}
                disabled={loading}
              >
                Confirmar
              </CancelModalButton>
              <CancelButton 
                onClick={handleCancelModalClose}
                disabled={loading}
              >
                Cancelar
              </CancelButton>
            </CancelButtons>
          </CancelContent>
        </CancelModal>
      )}
    </>
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

const ErrorMessage = styled.div`
  background-color: #ff4444;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: 1rem 0;
`;

const SuccessModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const SuccessContent = styled.div`
  background-color: #242424;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const SuccessIcon = styled.span`
  font-size: 4rem;
  color: #00ff00;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  color: #ffffff;
  margin-bottom: 2rem;
`;

const HomeButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #00ff00;
  color: #000000;
  border: none;
  
  &:hover:not(:disabled) {
    background-color: #00cc00;
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const CancelModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const CancelContent = styled.div`
  background-color: #242424;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const CancelTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 1rem;
`;

const CancelButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const CancelModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &:first-child {
    background: #ff4444;
    color: #ffffff;
    
    &:hover:not(:disabled) {
      background: #cc3333;
      transform: translateY(-2px);
    }
  }
  
  &:last-child {
    background: #333;
    color: #ffffff;
    border: 1px solid #404040;
    
    &:hover:not(:disabled) {
      background: #404040;
    }
  }
`;

export default CheckoutPage; 