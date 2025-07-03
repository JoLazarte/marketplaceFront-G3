import React from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';

const ProductPageLayout = ({ title, children, loading, error, type = "books", onRetry }) => {
  if (loading) {
    return (
      <Bg>
        <Wrapper>
          <Header>
            <h1>{title}</h1>
          </Header>
          <LoadingSpinner 
            message={`Cargando ${title.toLowerCase()}...`} 
            type={type}
          />
        </Wrapper>
      </Bg>
    );
  }

  if (error) {
    return (
      <Bg>
        <Wrapper>
          <Header>
            <h1>{title}</h1>
          </Header>
          <ErrorDisplay 
            message={`Error al cargar ${title.toLowerCase()}: ${error}`}
            type={type}
            onRetry={onRetry}
          />
        </Wrapper>
      </Bg>
    );
  }

  return (
    <Bg>
      <Wrapper>
        <Header>
          <h1>{title}</h1>
        </Header>
        {children}
      </Wrapper>
    </Bg>
  );
};

// Styled Components
const Bg = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  padding: 2rem 0;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 1rem;
  }
`;

export default ProductPageLayout;
