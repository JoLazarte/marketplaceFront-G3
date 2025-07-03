import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductCardBook.css';
import { FaRegEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toggleBookStatus } from '../../utils/apiUtils';
import { toast } from 'react-toastify';

const ProductCardBook = ({ item, onStatusChange }) => {
  if (!item) return null;
  
  const { id, title, author, editorial, description, urlImage, price, stock, active } = item;
  const isOutOfStock = stock === 0;
  const isInactive = active === false;
  const navigate = useNavigate();
  const { canEditProducts } = useAuth();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleStatus = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isToggling) return;
    
    setIsToggling(true);
    try {
      const result = await toggleBookStatus(id, !active);
      if (result.success) {
        toast.success(
          active ? 'Libro deshabilitado correctamente' : 'Libro habilitado correctamente'
        );
        if (onStatusChange) {
          onStatusChange(id, !active);
        }
      } else {
        toast.error(result.error || 'Error al cambiar el estado del libro');
      }
    } catch (error) {
      console.error('Error toggling book status:', error);
      toast.error('Error al cambiar el estado del libro');
    } finally {
      setIsToggling(false);
    }
  };

  const CardContent = (
    <>
      <div className={`img-container${isOutOfStock ? ' out-of-stock' : ''}${isInactive ? ' inactive' : ''}`}>
        <img src={Array.isArray(urlImage) ? urlImage[0] : urlImage} alt={title} />
        {isOutOfStock && <div className="stock-overlay">Sin stock</div>}
        {isInactive && <div className="inactive-overlay">Deshabilitado</div>}
      </div>
      <div className="details">
        <h3 className="title">{title}</h3>
        <p className="author">{author}</p>
        {editorial && <p className="editorial">{editorial}</p>}
        <p className="description">{description}</p>
        <p className="price">${price}</p>
      </div>
    </>
  );

  return (
    <div className={`container${isOutOfStock ? ' disabled' : ''}${isInactive ? ' inactive' : ''}`}>
      {canEditProducts && canEditProducts() && (
        <div className="admin-controls">
          <button
            className="edit-btn"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/edit/book/${id}`);
            }}
            title="Editar"
            type="button"
          >
            <FaRegEdit className="edit-icon" />
            <span className="edit-text">Editar</span>
          </button>
          <button
            className={`toggle-btn ${active ? 'active' : 'inactive'}`}
            onClick={handleToggleStatus}
            disabled={isToggling}
            title={active ? 'Deshabilitar' : 'Habilitar'}
            type="button"
          >
            {isToggling ? '...' : (active ? <FaEyeSlash /> : <FaEye />)}
            <span className="toggle-text">
              {isToggling ? 'Cambiando...' : (active ? 'Deshabilitar' : 'Habilitar')}
            </span>
          </button>
        </div>
      )}
      {isOutOfStock ? (
        <div>{CardContent}</div>
      ) : (
        <Link to={`/detail/book/${id}`} className='link-card'>
          {CardContent}
        </Link>
      )}
    </div>
  );
};

export default ProductCardBook;