import React from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    getItemCount 
  } = useCart();

  const getImageUrl = (item) => {
    if (Array.isArray(item.urlImage)) {
      return item.urlImage[0];
    }
    return item.image || item.img_url || item.urlImage;
  };

  return (
    <>
      <CartModal $isOpen={isOpen}>
        <CartHeader>
          <h2>Tu Carrito</h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </CartHeader>

        <CartContent>
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
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </QuantityButton>
                        <QuantityDisplay>{item.quantity}</QuantityDisplay>
                        <QuantityButton 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </QuantityButton>
                      </QuantityControls>
                    </ItemDetails>
                  </ItemContent>
                </CartItem>
              ))}

              <CartFooter>
                <Total>
                  Total: ${getCartTotal().toFixed(2)}
                </Total>
                <CheckoutButton>
                  Proceder al pago
                </CheckoutButton>
              </CartFooter>
            </>
          )}
        </CartContent>
      </CartModal>

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

export default Cart; 