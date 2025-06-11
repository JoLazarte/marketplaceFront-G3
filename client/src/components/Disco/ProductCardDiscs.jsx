import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ProductCardDiscs.css'
import { FaRegEdit } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ProductCardDiscs = ({ item }) => {
  if (!item) return null;
  const imageUrl = item.image || item.img_url || item.urlImage || (Array.isArray(item.urlImage) ? item.urlImage[0] : '');

  const navigate = useNavigate();
  const isOutOfStock = stock === 0;
  const { canEditProducts } = useAuth();

  const CardContent = (
    <>
      <div className={`img-container${isOutOfStock ? ' out-of-stock' : ''}`}>
        <img src={imageUrl} alt={item.title} />
        {isOutOfStock && <div className="stock-overlay">Sin stock</div>}
      </div>
      <div className={`details${isOutOfStock ? ' out-of-stock' : ''}`}>
        <h3 className="title">{item.title}</h3>
        <p className="author">{item.author}</p>
        <p className="record-label">{item.recordLabel} {item.year && `- ${item.year}`}</p>
        <p className="description">{item.description}</p>
        <p className="price">${item.price}</p>
      </div>
    </>
  );

  return (
    <div className="disco-card-container">
      {canEditProducts() && (
        <div className="edit-btn-container">
          <button
            className="edit-btn"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/edit/album/${id}`);
            }}
            title="Editar"
            type="button"
          >
            <FaRegEdit className="edit-icon" />
            <span className="edit-text">Editar</span>
          </button>
        </div>
      )}
      {isOutOfStock ? (
        <div>{CardContent}</div>
      ) : (
        <Link to={`/detail/disc/${item.id}`} className="link-card">
          {CardContent}
        </Link>
      )}
    </div>
  )
}

export default ProductCardDiscs