import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { books } from '../components/Book/Books'
import { discs } from '../components/Disco/Discs'
import { useCart } from '../context/CartContext'

const DetailPage = () => {
  const { type, id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const item = type === 'disc' 
    ? discs.find(disc => disc.id === id)
    : books.find(book => book.id === id)

  if (!item) {
    return (
      <Container>
        <Card>
          <h1>Producto no encontrado</h1>
          <p>Lo sentimos, el producto que buscas no está disponible.</p>
        </Card>
      </Container>
    );
  }

  const isDisc = type === 'disc'

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < item.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...item,
      quantity: quantity
    };
    addToCart(itemToAdd);
  };

  return (
    <Container>
      <Card>
        <ImageContainer>
          <img src={item.image || item.img_url || item.urlImage?.[0]} alt={item.title} />
        </ImageContainer>
        <InfoContainer>
          <Title>{item.title}</Title>
          <Author>{isDisc ? item.artist : item.author}</Author>
          
          {isDisc ? (
            <RecordInfo>
              <DetailRow>
                <DetailLabel>Discográfica:</DetailLabel>
                <DetailValue>{item.recordLabel}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Año:</DetailLabel>
                <DetailValue>{item.year}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>ISRC:</DetailLabel>
                <DetailValue>{item.isrc}</DetailValue>
              </DetailRow>
            </RecordInfo>
          ) : (
            <BookInfo>
              <DetailRow>
                <DetailLabel>Editorial:</DetailLabel>
                <DetailValue>{item.editorial}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>ISBN:</DetailLabel>
                <DetailValue>{item.isbn}</DetailValue>
              </DetailRow>
            </BookInfo>
          )}
          
          <Description>{item.description}</Description>
          
          <GenreContainer>
            {(isDisc ? item.genres : item.genreBooks || []).map((genre, index) => (
              <GenreTag key={index}>{genre}</GenreTag>
            ))}
          </GenreContainer>

          <Price>${item.price}</Price>

          {item.stock > 0 ? (
            <StockContainer>
              <StockStatus>✔ ¡En stock!</StockStatus>
              <QuantityContainer>
                <QuantityControl>
                  <QuantityButton onClick={handleDecrease}>−</QuantityButton>
                  <QuantityDisplay>{quantity}</QuantityDisplay>
                  <QuantityButton onClick={handleIncrease}>+</QuantityButton>
                </QuantityControl>
                <AddToCartButton onClick={handleAddToCart}>
                  Agregar al carrito
                </AddToCartButton>
              </QuantityContainer>
              <StockInfo>Stock disponible: {item.stock}</StockInfo>
            </StockContainer>
          ) : (
            <NoStockMessage>No hay stock disponible</NoStockMessage>
          )}
        </InfoContainer>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 7rem;
`

const Card = styled.div`
  display: flex;
  background: #242424;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  max-width: 1000px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ImageContainer = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e1e1e;

  img {
    max-width: 100%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }
`

const InfoContainer = styled.div`
  flex: 1.2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  margin: 0;
  font-weight: 700;
`

const Author = styled.h2`
  font-size: 1.5rem;
  color: #a8a8a8;
  margin: 0;
  font-weight: 500;
`

const Description = styled.p`
  font-size: 1rem;
  color: #d4d4d4;
  line-height: 1.6;
`

const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #00ff00;
  margin: 1rem 0;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
`

const DetailRow = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
`

const DetailLabel = styled.span`
  color: #808080;
  font-weight: 500;
`

const DetailValue = styled.span`
  color: #ffffff;
`

const RecordInfo = styled.div`
  margin: 1rem 0;
`

const BookInfo = styled.div`
  margin: 1rem 0;
`

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`

const GenreTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #d4d4d4;
  font-size: 0.9rem;
`

const StockContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`

const StockStatus = styled.p`
  color: #00ff00;
  font-weight: 500;
  margin: 0;
`

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
`

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 1rem;
  transition: all 0.3s ease;

  &:hover {
    color: #00ff00;
  }
`

const QuantityDisplay = styled.span`
  color: #ffffff;
  padding: 0 1rem;
  min-width: 3rem;
  text-align: center;
`

const AddToCartButton = styled.button`
  background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
  }
`

const StockInfo = styled.p`
  color: #808080;
  font-size: 0.9rem;
  margin: 0;
`

const NoStockMessage = styled.p`
  color: #ff4444;
  font-weight: 600;
  margin: 1rem 0;
`

export default DetailPage 