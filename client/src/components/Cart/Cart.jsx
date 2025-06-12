import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const { canViewCart, role, token } = useAuth();
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    getItemCount,
    clearCart 
  } = useCart();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [stockMessage, setStockMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Si el usuario no puede ver el carrito, no renderizamos nada
  if (!canViewCart()) return null;

  const getImageUrl = (item) => {
    if (Array.isArray(item.urlImage)) {
      return item.urlImage[0];
    }
    return item.image || item.img_url || item.urlImage;
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > item.stock) {
      setStockMessage(`Solo hay ${item.stock} unidades disponibles de ${item.title}`);
      setTimeout(() => setStockMessage(''), 3000);
    }
    updateQuantity(item.id, newQuantity);
  };

  const updateBackendCart = async () => {
    try {
      // Actualizar todos los items en el carrito
      for (const item of cartItems) {
        const response = await fetch('http://localhost:8080/carts/update', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bookId: item.id,
            quantity: item.quantity
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al actualizar el carrito');
        }

        const data = await response.json();
        console.log(`Carrito actualizado para ${item.title}:`, data);
      }
      return true;
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
      throw error;
    }
  };

  const handleCheckout = async () => {
    if (role === 'BUYER_NO_REGISTRADO') {
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateBackendCart();
      onClose(); // Cerramos el modal del carrito
      navigate('/checkout'); // Redirigimos a la página de checkout
    } catch (err) {
      setError('Error al procesar el carrito. Por favor, intenta nuevamente.');
      console.error('Error en checkout:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    onClose();
    setTimeout(() => {
      navigate('/login');
    }, 100);
  };

  const handleRegisterClick = () => {
    setShowLoginModal(false);
    onClose();
    setTimeout(() => {
      navigate('/register');
    }, 100);
  };

  return (
    <>
      <CartModal $isOpen={isOpen}>
        <CartHeader>
          <h2>Tu Carrito</h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </CartHeader>

        <CartContent>
          {error && (
            <ErrorMessage>{error}</ErrorMessage>
          )}
          
          {stockMessage && (
            <StockWarning>{stockMessage}</StockWarning>
          )}
          
          {cartItems.length === 0 ? (
            <EmptyCart>Tu carrito está vacío</EmptyCart>
          ) : (
            <>
              {cartItems.map(item => (
                <CartItem key={item.id}>
                  <ItemHeader>
                    <ItemTitle>{item.title}</ItemTitle>
                    <RemoveButton onClick={() => removeFromCart(item.id)}>
                      Eliminar
                    </RemoveButton>
                  </ItemHeader>
                  <ItemContent>
                    <ItemImageContainer>
                      <ItemImage 
                        src={getImageUrl(item)} 
                        alt={item.title}
                      />
                    </ItemImageContainer>
                    <ItemDetails>
                      <ItemPrice>${item.price}</ItemPrice>
                      <QuantityControls>
                        <QuantityButton 
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          disabled={loading}
                        >
                          -
                        </QuantityButton>
                        <QuantityDisplay>{item.quantity}</QuantityDisplay>
                        <QuantityButton 
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          disabled={loading || item.quantity >= item.stock}
                        >
                          +
                        </QuantityButton>
                      </QuantityControls>
                      <StockInfo>Stock disponible: {item.stock}</StockInfo>
                    </ItemDetails>
                  </ItemContent>
                </CartItem>
              ))}

              <CartFooter>
                <Total>
                  Total: ${getCartTotal().toFixed(2)}
                </Total>
                <CheckoutButton 
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Proceder al pago'}
                </CheckoutButton>
              </CartFooter>
            </>
          )}
        </CartContent>
      </CartModal>

      {showLoginModal && (
        <>
          <LoginModal>
            <h3>¡Necesitas una cuenta para continuar!</h3>
            <p>Para completar tu compra, necesitas iniciar sesión o registrarte.</p>
            <LoginModalButtons>
              <ActionButton onClick={handleLoginClick}>Iniciar Sesión</ActionButton>
              <ActionButton onClick={handleRegisterClick}>Registrarse</ActionButton>
              <CancelButton onClick={() => setShowLoginModal(false)}>Cancelar</CancelButton>
            </LoginModalButtons>
          </LoginModal>
          <Overlay onClick={() => setShowLoginModal(false)} />
        </>
      )}

      {isOpen && <Overlay onClick={onClose} />}
    </>
  );
};

const CartModal = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.$isOpen ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: #242424;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease;
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #404040;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: #ffffff;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  padding: 0 5px;

  &:hover {
    color: #00ff00;
  }
`;

const CartContent = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
`;

const EmptyCart = styled.div`
  color: #a8a8a8;
  text-align: center;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom: 1px solid #404040;
  gap: 10px;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const ItemContent = styled.div`
  display: flex;
  gap: 15px;
`;

const ItemImageContainer = styled.div`
  width: 70px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #333;
  flex-shrink: 0;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const ItemTitle = styled.span`
  color: #ffffff;
  font-weight: 500;
  font-size: 1rem;
  padding-right: 20px;
  line-height: 1.2;
`;

const ItemPrice = styled.span`
  color: #00ff00;
  font-weight: 600;
  font-size: 1.1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`;

const QuantityButton = styled.button`
  background: #333333;
  color: #ffffff;
  border: 1px solid #404040;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-color: #00ff00;
    color: #00ff00;
  }
`;

const QuantityDisplay = styled.span`
  color: #ffffff;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 5px;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const CartFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #404040;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Total = styled.div`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: right;
`;

const CheckoutButton = styled.button`
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  color: #00ff00;
  border: 1px solid #404040;
  padding: 12px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
    border-color: #00ff00;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const StockWarning = styled.div`
  background-color: #ff4444;
  color: white;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
`;

const StockInfo = styled.span`
  color: #808080;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const LoginModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #242424;
  padding: 30px;
  border-radius: 8px;
  z-index: 1002;
  width: 90%;
  max-width: 400px;
  text-align: center;
  color: #ffffff;

  h3 {
    margin-top: 0;
    color: #00ff00;
  }

  p {
    margin: 20px 0;
  }
`;

const LoginModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  background: #00ff00;
  color: #000000;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #00cc00;
  }
`;

const CancelButton = styled(ActionButton)`
  background: #404040;
  color: #ffffff;

  &:hover {
    background: #505050;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ff4444;
  color: white;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
`;

export default Cart; 