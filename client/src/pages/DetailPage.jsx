import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { books } from '../components/Book/Books'
import { discs } from '../components/Disco/Discs'

const DetailPage = () => {
  const { type, id } = useParams()
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const item = type === 'disc' 
    ? discs.find(disc => disc.id === id)
    : books.find(book => book.id === id)

  if (!item) {
    return <div>Producto no encontrado</div>
  }

  const isDisc = type === 'disc'

  return (
    <Container>
      <Card>
        <ImageContainer>
          <img src={item.urlImage[0]} alt={item.title} />
        </ImageContainer>
        <InfoContainer>
          <Title>{item.title}</Title>
          <Author>{item.author}</Author>
          
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
            {(isDisc ? item.genres : item.genreBooks).map((genre, index) => (
              <GenreTag key={index}>{genre}</GenreTag>
            ))}
          </GenreContainer>

          <Details>
            <DetailRow>
              <DetailLabel>Stock:</DetailLabel>
              <DetailValue>{item.stock} unidades</DetailValue>
            </DetailRow>
          </Details>

          <PriceContainer>
            <Price>${item.price}</Price>
            <AddToCartButton>Agregar al carrito</AddToCartButton>
          </PriceContainer>
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

const RecordInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #d4d4d4;
  margin: 1rem 0;
`

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`

const GenreTag = styled.span`
  background: linear-gradient(135deg, #333333 0%, #404040 100%);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #505050;
`

const Details = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const DetailLabel = styled.span`
  font-weight: 600;
  color: #ffffff;
  min-width: 100px;
`

const DetailValue = styled.span`
  color: #a8a8a8;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: auto;
`

const Price = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
`

const AddToCartButton = styled.button`
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  color: #ffffff;
  border: 1px solid #404040;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-color: #00ff00;
  }

  &:active {
    transform: translateY(0);
  }
`

export default DetailPage 