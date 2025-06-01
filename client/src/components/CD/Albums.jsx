import React, { useRef } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import ProductCardAlbum from './ProductCardAlbum';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export const albums = [
    {
        id: "1",
        title: "Abbey Road",
        author: "The Beatles",
        recordLabel: "Apple Records",
        year: 1969,
        description: "Uno de los álbumes más icónicos del rock.",
        isrc: "GBAYE0601690",
        genres: ["Rock", "Clásico"],
        price: 24.99,
        stock: 5,
        urlImage: ["https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg"]
    },
    {
        id: "2",
        title: "Dark Side of the Moon",
        author: "Pink Floyd",
        recordLabel: "Harvest Records",
        year: 1973,
        description: "Un álbum revolucionario que definió el rock progresivo.",
        isrc: "GBCTA7300014",
        genres: ["Rock Progresivo", "Psicodélico"],
        price: 29.99,
        stock: 8,
        urlImage: ["https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png"]
    },
    {
        id: "3",
        title: "Thriller",
        author: "Michael Jackson",
        recordLabel: "Epic Records",
        year: 1982,
        description: "El álbum más vendido de todos los tiempos.",
        isrc: "USSM19902990",
        genres: ["Pop", "R&B", "Funk"],
        price: 27.99,
        stock: 12,
        urlImage: ["https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png"]
    },
    {
        id: "4",
        title: "Back in Black",
        author: "AC/DC",
        recordLabel: "Atlantic Records",
        year: 1980,
        description: "Un clásico del hard rock que marcó una época.",
        isrc: "AUATA7900123",
        genres: ["Hard Rock", "Rock"],
        price: 23.99,
        stock: 6,
        urlImage: ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/ACDC_Back_in_Black.png/800px-ACDC_Back_in_Black.png"]
    },
    {
        id: "5",
        title: "Nevermind",
        author: "Nirvana",
        recordLabel: "DGC Records",
        year: 1991,
        description: "El álbum que definió el grunge y cambió el rock alternativo.",
        isrc: "USDGC9100123",
        genres: ["Grunge", "Rock Alternativo"],
        price: 25.99,
        stock: 10,
        urlImage: ["https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg"]
    }
]

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows : false,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]}

const Albums = () => {
    const arrowRef = useRef(null);
    const albumDisc = albums.map((item, i) => (
        <ProductCardAlbum item={item} key={i}/>
    ));

    return (
        <Container id='cardContainer'>
            <Slider className="marginCard" ref={arrowRef} {...settings}>
                {albumDisc}
            </Slider> 
            <SlArrowLeft onClick={() => arrowRef.current.slickPrev()} className='arr backArr'/>
            <SlArrowRight onClick={() => arrowRef.current.slickNext()} className='arr forwardArr'/> 
        </Container>
    )
}

export default Albums

const Container = styled.div`
    width: 80%;
    height: 100%;
    margin: 0 auto;
    position:relative;

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
        background:rgb(248, 244, 244);
        width: 15px;
    }

    .slick-dots li{
        margin: 0;
    }
   
    .arr{
       background-color: transparent;
       position:absolute;
        cursor: pointer;
        color: rgb(242, 236, 236); 
        margin-top:-12rem;
        font-size: 1.4rem;
    }
  
    .arr.backArr{
        margin-left:-2rem;
    }
    .arr.forwardArr{
        margin-left:65rem;
    }
    

    @media(max-width:530px){
        display: none;
    }
` 