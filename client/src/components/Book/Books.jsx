import React, { useRef } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import ProductCardBook from './ProductCardBook';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export const books = [
    {
        id: "1",
        title: "1984",
        author: "George Orwell",
        editorial: "Secker & Warburg",
        description: "Una distopía política sobre un régimen totalitario.",
        isbn: "978-0451524935",
        genreBooks: ["Ficción", "Distopía", "Política"],
        price: 18.99,
        stock: 12,
        urlImage: ["https://covers.openlibrary.org/b/id/8225631-L.jpg"]
    },
    {
        id: "2",
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        editorial: "Editorial Sudamericana",
        description: "La saga de la familia Buendía en el mítico pueblo de Macondo.",
        isbn: "978-0307474728",
        genreBooks: ["Realismo mágico", "Ficción literaria"],
        price: 21.99,
        stock: 8,
        urlImage: ["https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg"]
    },
    {
        id: "3",
        title: "El Señor de los Anillos",
        author: "J.R.R. Tolkien",
        editorial: "Minotauro",
        description: "La épica aventura de Frodo para destruir el Anillo Único.",
        isbn: "978-0544003415",
        genreBooks: ["Fantasía", "Aventura"],
        price: 25.99,
        stock: 15,
        urlImage: ["https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg"]
    },
    {
        id: "4",
        title: "Don Quijote de la Mancha",
        author: "Miguel de Cervantes",
        editorial: "Real Academia Española",
        description: "Las aventuras del ingenioso hidalgo Don Quijote.",
        isbn: "978-8424938437",
        genreBooks: ["Clásico", "Aventura", "Sátira"],
        price: 23.99,
        stock: 10,
        urlImage: ["https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546112331i/3836.jpg"]
    },
    {
        id: "5",
        title: "Rayuela",
        author: "Julio Cortázar",
        editorial: "Alfaguara",
        description: "Una novela experimental que puede leerse en múltiples órdenes.",
        isbn: "978-8420437484",
        genreBooks: ["Ficción experimental", "Literatura latinoamericana"],
        price: 19.99,
        stock: 6,
        urlImage: ["https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348517862i/94856.jpg"]
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

const Books = () => {
    const arrowRef = useRef(null);
    const bookDisc = books.map((item, i) => (
        <ProductCardBook item={item} key={i}/>
    ));

    return (
        <Container id='cardContainer'>
            <Slider className="marginCard" ref={arrowRef} {...settings}>
                {bookDisc}
            </Slider> 
            <Buttons>
                <button 
                    onClick={() => arrowRef.current.slickPrev()}
                    className='back'><SlArrowLeft/></button>
                <button 
                    onClick={() => arrowRef.current.slickNext()}
                    className='next'><SlArrowRight/></button>
            </Buttons>
        </Container>
    )
}

export default Books

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