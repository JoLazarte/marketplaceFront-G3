import React, { useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import './Carrusel.css';

const Carrusel = ({data}) =>{
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      
      {data.map((item, idx) => {
        return (
          <div key={idx} className={slide === idx ? "slide" : "slide slide-hidden"} >
            <img className='imgCarrusel'
             src={item.src}
             alt={item.alt}
            />
            <div className='caption'>
              <h4 title={item.title}> {item.title} </h4>
              <p text={item.text} > {item.text} </p>
            </div>
           
          </div>
         
        );
      })}
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
      
    </div>
  );
};

export default Carrusel;