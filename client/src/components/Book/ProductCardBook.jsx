import React from 'react'
import { Link } from 'react-router-dom'
import './ProductCardBook.css'

const ProductCardBook = ({item: {id, title, author, description, urlImage, price}}) => {
  return (
    <div className="container">
      <Link to={`/detail/book/${id}`} className='link-card'>
        <div className="img-container">
          <img src={urlImage[0]} alt={title} />
        </div>
        <div className="details">
          <h3 className="title">{title}</h3>
          <p className="author">{author}</p>
          <p className="description">{description}</p>
          <p className="price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCardBook
