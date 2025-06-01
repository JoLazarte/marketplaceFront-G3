import React, { useRef } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import ProductCardBook from './ProductCardBook';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";


let books = [
    {
        title : "Titulo 1",
        description : "Lorem Ipsum 1",
        autor:"Autor",
        img_url : "https://cdn4.volusion.store/zjhys-xrwrf/v/vspfiles/photos/9781338596700-2.jpg",
        price: "$ 23000"
      
    },
    {
        title : "Titulo 1",
        description : "Lorem Ipsum 1",
        autor:"Autor",
        img_url : "https://cdn.kobo.com/book-images/20eefc4d-6653-419e-a003-fac3a68a8b87/1200/1200/False/hamlet-prince-of-denmark-25.jpg",
        price: "$ 23000"
       
    },
    {
        title : "Titulo 1",
        description : "Lorem Ipsum 1",
        autor:"Autor",
        img_url : "https://m.media-amazon.com/images/I/913qsYmTdmL._AC_UF894,1000_QL80_.jpg",
        price: "$ 23000"
      
    },
    {
        title : "Titulo 1",
        description : "Lorem Ipsum 1",
        autor:"Autor",
        img_url : "https://m.media-amazon.com/images/I/81W2JNcbBuL._AC_UF1000,1000_QL80_.jpg",
        price: "$ 23000"
       
    },
    {
        title : "Titulo 1",
        description : "Lorem Ipsum 1",
        autor:"Autor",
        img_url : "https://wordery.com/jackets/201d0b25/the-scum-villains-self-saving-system-vol-4-moxiangtongxiu-author-xiao-tong-kong-illustrator-9781638585541.jpg",
        price: "$ 23000"
      
    },
    {
        title : "Titulo 1",
        description : "Lorem Ipsum 1",
        autor:"Autor",
        img_url : "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1697979350i/149426533.jpg",
        price: "$ 23000"
       
    },
    {
        title : "Titulo 1",
        description : "Lorem Ipsum 1",
        autor:"Autor",
        img_url : "https://m.media-amazon.com/images/I/81PxjL46RCL._AC_UF1000,1000_QL80_.jpg",
        price: "$ 23000"
       
    },
    {
        title : "Titulo 1",
        autor:"Autor",
        autor:"Autor",
        description : "Lorem Ipsum 1",
        img_url : "https://cdn.archonia.com/images/1-104059110-2-1-original1/cardcaptor-sakura-clear-card-vol-10-gn-manga.jpg",
        price: "$ 23000"
       
    },
    {
        title : "Titulo 1",
        description : "Lorem Ipsum 1",
        autor:"Autor",
        img_url : "https://m.media-amazon.com/images/I/61zq3LbjyaL._AC_UF1000,1000_QL80_.jpg",
        price: "$ 23000"
       
    },
    {
        title : "Titulo 1",
        description : "Lorem Ipsum 1",
        autor:"Autor",
        img_url : "https://m.media-amazon.com/images/I/81BFTBjLW0L._AC_UF1000,1000_QL80_DpWeblab_.jpg",
        price: "$ 23000"
       
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
    let bookDisc = "";
    bookDisc = books.map((item, i) => (
        <ProductCardBook item={item} key={i}/>
    ))
  return (
    <Container id='cardContainer'>
            <Slider className="marginCard" ref={arrowRef} {...settings}>
                {bookDisc} 
               
            </Slider> 
            <SlArrowLeft onClick={() => arrowRef.current.slickPrev()} className='arr backArr'/>
            <SlArrowRight onClick={() => arrowRef.current.slickNext()} className='arr forwardArr'/> 
          
    </Container>
  )
}

export default Books

const Container = styled.div`
    width: 80%;
    height: 100%;
    margin: 0 auto;
    position:relative;

    @media(max-width:840px){
        width: 90%;
    }
    .marginCard{
        margin: inherit; /*cambia el espacio entre cards*/
        
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