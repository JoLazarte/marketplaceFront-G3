import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ProductCardDiscs.css'
import { FaRegEdit } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ProductCardDiscs = ({ item }) => {
  if (!item) return null;

  const { id, title, author, description, urlImage, price, stock = 0 } = item;
  const navigate = useNavigate();
  const { canEditProducts } = useAuth();
  
  const isOutOfStock = stock === 0;

  const CardContent = (
    <>
      <div className={`img-container${isOutOfStock ? ' out-of-stock' : ''}`}>
        <img src={urlImage} alt={title} />
        {isOutOfStock && <div className="stock-overlay">Sin stock</div>}
      </div>
      <div className={"details"}>
        <h3 className="title">{title}</h3>
        <p className="author">{author}</p>
        <p className="record-label">{item.recordLabel} {item.year && `- ${item.year}`}</p>
        <p className="description">{description}</p>
        <p className="price">${price}</p>
      </div>
    </>
  );

  return (
    <div className={`disco-card-container${isOutOfStock ? ' disabled' : ''}`}>
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
        <Link to={`/detail/disc/${id}`} className="link-card">
          {CardContent}
        </Link>
      )}
    </div>
  );
};

export default ProductCardDiscs;