import React from 'react'
import styled from 'styled-components'

const ProductCardBook = (props) => {
    const {title, description, price, img_url} = props.item;
  return (
     <StyledWrapper>
        <div className='cardS'>
         <div className='imgContainer'>
           <img src={img_url} alt={title} className='img' />
            <div className="save">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 683 683" height={683} width={683} className="svg">
              <g clipPath="url(#clip0_993_25)">
                <mask height={683} width={683} y={0} x={0} maskUnits="userSpaceOnUse" style={{maskType: 'luminance'}} id="mask0_993_25">
                  <path fill="white" d="M0 -0.00012207H682.667V682.667H0V-0.00012207Z" />
                </mask>
                <g mask="url(#mask0_993_25)">
                  <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={40} stroke="#CED8DE" d="M148.535 19.9999C137.179 19.9999 126.256 24.5092 118.223 32.5532C110.188 40.5866 105.689 51.4799 105.689 62.8439V633.382C105.689 649.556 118.757 662.667 134.931 662.667H135.039C143.715 662.667 151.961 659.218 158.067 653.09C186.451 624.728 270.212 540.966 304.809 506.434C314.449 496.741 327.623 491.289 341.335 491.289C355.045 491.289 368.22 496.741 377.859 506.434C412.563 541.074 496.752 625.242 524.816 653.348C530.813 659.314 538.845 662.667 547.308 662.667C563.697 662.667 576.979 649.395 576.979 633.019V62.8439C576.979 51.4799 572.48 40.5866 564.447 32.5532C556.412 24.5092 545.489 19.9999 534.133 19.9999H148.535Z" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_993_25">
                  <rect fill="white" height="682.667" width="682.667" />
                </clipPath>
              </defs>
            </svg>
          </div>
          </div>
        <div className="text">
          <h1 className='titulo'>{title}</h1>
          <p className="descrProd">{description}</p>
          <div className='priceBuy'> 
            <button className='price'>{price}</button>
            <button className="button">Add To Cart</button>
          </div>
          
        </div>
        </div>
       
    </StyledWrapper>
  )
}

export default ProductCardBook

const StyledWrapper = styled.div`
   .cardS {
    width: 260px;
    height:520px;
    margin-right:2px;
    background: white;
    border-radius: 10px;
    border: 1px solid rgb(66, 61, 61);
    transition: 0.2s ease-in-out;
   
  }

  .cardS:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px rgb(208, 191, 191);
  }

  .imgContainer{

      position: relative;
      height: 350px;
      width: 100%;
    }

   .img {
     position: absolute;
      width: 100%;
      height:350px;
     border-top-left-radius: 10px;
     border-top-right-radius: 10px;
     background: rgb(194, 200, 217);
    }
    

  .save {
    transition: 0.2s ease-in-out;
    border-radius: 10px;
    margin-top:11px;
    margin-left: 219px;
    width: 30px;
    height: 30px;
    padding:2px;
    background-color:rgba(255, 255, 255, 0.89);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content:center;
  }

  .save .svg {
    transition: 0.2s ease-in-out;
    width: 15px;
    height: 15px;
    
  }

  .save:hover .svg {
    fill:rgb(252, 2, 2);
  }

  .text {
    padding: 18px;
    display: flex;
    height:150px;
    flex-direction: column;
    align-items: space-around;
  }
  .priceBuy{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top:12px;
  }
  .text .titulo {
    font-family: system-ui;
    font-size: 20px;
    font-weight: 600;
    color: black;
    text-align:center;
  }
  .price{
    font-family: system-ui;
    font-size: 20px;
    font-weight: 600;
    color: black;
    text-align:start;
    border: none;
    background-color:rgba(255, 255, 255, 0.89);
    
    }

  .text .descrProd {
    font-family: system-ui;
    color:rgb(88, 82, 82);
    font-size: 16px;
    margin: 0px;
    text-align: center;
    padding: 5px;
  }

  .button {
  
    padding: 5px 8px;
    background-color:rgb(25, 27, 28);;
    border-radius: 10px;
    text-align: center;
    font-family: system-ui;
    font-size: small;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    border: 1px solid rgb(35, 39, 43);
  }

  .button:hover {
    background-color: transparent;
    color:rgb(35, 39, 43);
  }`
