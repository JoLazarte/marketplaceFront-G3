import { useParams } from 'react-router-dom';
import './DetailPage.css';
import { books } from '../Book/Books';

const DetailPage = () => {
  const { id, type } = useParams();

  // Buscar el item específico en el array de books
  const item = books.find(item => item.id === id && item.type === type);

  if (!item) {
    return (
      <main className="detail-container">
        <div className="detail-card">
          <h1>Producto no encontrado</h1>
          <p>Lo sentimos, el producto que buscas no está disponible.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="detail-container">
      <div className="detail-card">
        <div className="detail-image">
          <img src={item.image || item.img_url} alt={item.title} />
        </div>
        <div className="detail-info">
          <h1>{item.title}</h1>
          <h2>{type === 'book' ? item.author : item.artist}</h2>
          <p className="description">{item.description}</p>
          <div className="price">{item.price}</div>
          
          <div className="details-grid">
            {Object.entries(item.details).map(([key, value]) => (
              <div key={key} className="detail-item">
                <span className="detail-label">{key}:</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>

          <button className="buy-button">Agregar al carrito</button>
        </div>
      </div>
    </main>
  );
};

export default DetailPage;