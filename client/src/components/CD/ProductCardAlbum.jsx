import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ProductCardAlbum = ({item: {id, title, author, description, urlImage, price, year}}) => {
  return (
    <Container>
      <Link to={`/detail/disc/${id}`} className='link-card'>
        <ImgContainer>
          <img src={urlImage[0]} alt={title} />
        </ImgContainer>
        <Details>
          <Title>{title}</Title>
          <Author>{author}</Author>
          <Year>{year}</Year>
          <Description>{description}</Description>
          <Price>${price}</Price>
        </Details>
      </Link>
    </Container>
  )
}


const Container = styled.div`
  width: 90%;
  padding: 10px;
  margin: 0 auto;
  .link-card {
    text-decoration: none;
    color: inherit;
  }
`

const ImgContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
`

const Details = styled.div`
  padding: 10px 0;
  text-align: left;
`

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 5px 0;
  color: #ffffff;
`

const Author = styled.p`
  font-size: 1rem;
  color: #a8a8a8;
  margin: 5px 0;
`

const Year = styled.p`
  font-size: 0.9rem;
  color: #808080;
  margin: 2px 0;
`

const Description = styled.p`
  font-size: 0.9rem;
  color: #d4d4d4;
  margin: 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Price = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #00ff00;
  margin: 10px 0;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
`

export default ProductCardAlbum 