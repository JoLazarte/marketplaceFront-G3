import React, { useRef, useEffect, useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import ProductCardDiscs from './ProductCardDiscs';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const API_URL = 'http://localhost:8080/musicAlbums';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows : false,
  responsive: [
    { breakpoint: 990, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: true } },
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1, initialSlide: 2 } },
    { breakpoint: 530, settings: { slidesToShow: 1, slidesToScroll: 1 } }
  ]
}

const Discs = () => {
  const arrowRef = useRef(null);
  const [discs, setDiscs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscs = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        // Ajusta según la estructura real de tu backend:
        if (data && Array.isArray(data.content)) {
          setDiscs(data.content);
        } else {
          setDiscs([]);
        }
      } catch (err) {
        setDiscs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscs();
  }, []);

  if (loading) {
    return <div style={{color: "#fff", textAlign: "center", padding: "2rem"}}>Cargando discos...</div>;
  }

  if (!discs.length) {
    return <div style={{color: "#fff", textAlign: "center", padding: "2rem"}}>No hay discos disponibles.</div>;
  }

  return (
    <Container id='cardContainer'>
      <Slider className="marginCard" ref={arrowRef} {...settings}>
        {discs.filter(item => item && item.id).map(item => (
          <ProductCardDiscs item={item} key={item.id} />
        ))}
      </Slider>
      <Buttons>
        <button onClick={() => arrowRef.current.slickPrev()} className='back'><SlArrowLeft/></button>
        <button onClick={() => arrowRef.current.slickNext()} className='next'><SlArrowRight/></button>
      </Buttons>
    </Container>
  )
}

export default Discs

const Container = styled.div`
    width: 80%;
    height: 100%;
    margin: 0 auto;
    position: relative;

    @media(max-width:840px){
        width: 90%;
    }
    
    .marginCard{
        margin: inherit;
    }
  
    .slick-list, .slick-slider, .slick-track{
        padding: 0;
    }

    .slick-dots{
        text-align: left;
        margin-left: 1rem;
    }

    .slick-dots li button:before{
        content: "";
    }

    .slick-dots li button{
        width: 9px;
        height: 4px;
        background: linear-gradient(159deg, rgb(198, 183, 183) 0%, rgb(168, 147, 122) 100%);
        padding: 0.1rem;
        margin-top: 1rem;
        transition: all 400ms ease-in-out;
        border-radius: 50px;
    }
    
    .slick-dots li.slick-active button{
        background: rgb(248, 244, 244);
        width: 15px;
    }

    .slick-dots li{
        margin: 0;
    }

    @media(max-width:530px){
        display: none;
    }
`

const Buttons = styled.div`
    button{
        width: 2rem;
        height: 2rem;
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
        color: #01be96;
        border: none;
        position: absolute;
        top: 45%;
        right: -1rem;
        transform: translateY(-50%);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
        
        &:hover{
            background-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-50%) scale(1.1);
        }
    }
    
    .back{
        left: -1rem;
        right: auto;
    }
`
