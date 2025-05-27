
import ProductCard from './ProductCard'
import './ProductGrid.css'
import styled from 'styled-components';

const ProductGrid = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <ProductCard className='card'></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    display: flex;
    gap: 10px;
  }

 

  .card:hover {
    flex: 2;
   
  }`;

export default ProductGrid;

