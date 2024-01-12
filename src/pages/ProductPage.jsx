import React, { useState } from "react";
import BackDrop from "../components/BackDrop/BackDrop.jsx";
import icon_next from '../../public/images/icon_next.svg';
import icon_previous from '../../public/images/icon_previous.svg';
import { products } from "../data/products.js";
import { useShoppingCart } from "../context/ShoppingCartContext.jsx";

function ProductPage (props) {

    const [lightBoxOpen, setLightBoxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [inputQt, setInputQt] = useState(0);
    const isMediumScreen = window.innerWidth <= 961; 

    //Get the corresponding product by its id
    const product = products.find(product => product.id === props.id);
    const productImages =  product.images;
    const productThumbnails = product.thumbnails;

    const {addToCart} = useShoppingCart();

    function handleInputChange (e) {
        const inputVal = e.target.value;
        setInputQt(Number(inputVal));
    }
    function handleInputButtonClick(e) {
        const action = e.target.getAttribute("data-action");
        action === "plusBtn"? setInputQt(prevQt => prevQt+1) : setInputQt(prevQt => prevQt-1)
    }

    function openLightBox(index) {
        setSelectedImageIndex(index);
        setLightBoxOpen(true);
    }
    function closeLightBox () {
        setLightBoxOpen(false);
        setSelectedImageIndex(0);
    }
    return (
        <>
    <section className="sm:block lg:flex lg:items-center lg:justify-between mx-auto max-w-7xl px-10 sm:p-0 sm:mt-0  lg:px-12 lg:py-20 ">
        <div className="relative p-0 sm:block sm:w-full lg:flex lg:flex-col items-center lg:w-[50%] lg:mr-auto ml-0 sm:mr-0">
        <img className="lg:hidden bg-white py-2 px-2.5 rounded-full absolute top-1/2 md:top-[65%] left-4 cursor-pointer" src={icon_previous} alt="previous" 
                     onClick={() => setSelectedImageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : productImages.length - 1))} />
                
            <img className=" sm:w-full lg:w-[75%] lg:rounded-md cursor-pointer" src={productImages[selectedImageIndex]} alt="product image 1" 
                onClick={() => openLightBox(selectedImageIndex)} />
            <img className="lg:hidden bg-white py-2 px-2.5 rounded-full absolute top-1/2 md:top-[65%] right-4 cursor-pointer" src={icon_next} alt="next" 
                     onClick={() => setSelectedImageIndex((prevIndex) => (prevIndex < productImages.length - 1 ? prevIndex + 1 : 0) )} />
                
            {/* productThumbnails */}
            
            <div className="sm:hidden lg:w-[75%] lg:flex items-center gap-7 mt-6">
                {productThumbnails.map((thumbnail, index) => (
                    <button key={index} onClick={( ) => setSelectedImageIndex(index)} className={`w-[20%] cursor-pointer  rounded-md`} >
                    <img className={` cursor-pointer  rounded-md hover:border-2 hover:border-brandOrange  hover:opacity-40 transition-opacity
                    ${selectedImageIndex === index && "opacity-30  border-2 border-brandOrange" }`}
                    src={`${thumbnail}`} 
                    alt={`product thumbnail ${index + 1}`}
                    /></button>
                ))}
            </div>
        </div>
        <div className="sm:block sm:p-6 md:p-8 lg:w-[50%] lg:ml-auto lg:mr-0">
            <span className="uppercase font-bold text-brandOrange">Sneaker Company</span>
            <h1 className="text-5xl w-[92%] mt-6 mb-10 text-veryDarkBlue font-bold">{product.title}</h1>
            <p className="mb-8 w-[92%]  text-darkGrayishBlue text-base/8 tracking-wide">{product.description}</p>
            <div className="sm:flex justify-between lg:block lg:mb-8">
                <div className="lg:mb-2">
                    <span className="font-bold text-xl lg:mr-0">${product.newPrice}</span>
                    <span className="sm:ml-8 text-brandOrange text-md bg-paleOrange py-0.5 px-2.5 rounded-md">50%</span> <br className="sm:hidden"/>
                </div>
                <span className="text-grayishBlue line-through">${product.oldPrice}</span>

            </div>
            <div className="lg:w-[100%] lg:flex gap-4 pt-8 lg:pt-0 lg:py-1 items-center justify-between">
                <div className="flex justify-between items-center lg:m-0 px-8 lg:py-1 lg:px-8 align-middle sm:py-3 sm:w-[100%] lg:w-[50%] sm:mb-4 lg:mb-0 sm:text-center bg-lightGrayishBlue rounded-md ">
                    <button onClick={handleInputButtonClick} data-action="minusBtn" className="sm:text-left text-3xl font-bold text-center text-brandOrange cursor-pointer hover:opacity-70 transition-opacity" >-</button>
                    <label htmlFor="quantityInputField" className="sr-only">Quantity</label>
                    <input id="quantityInputField" onChange={handleInputChange} className="sm:mx-auto text-lg font-bold text-center bg-transparent lg:w-10 lg:mx-4 outline-transparent active:outline-transparent" value={inputQt}/>
                    <button onClick={handleInputButtonClick} data-action="plusBtn" className="sm:text-right text-3xl font-bold text-center text-brandOrange cursor-pointer hover:opacity-70 transition-opacity">+</button>
                </div>
                    <button onClick={() => {
                        addToCart({id: product.id, quantity: inputQt > 0 ? inputQt : 1});
                        setInputQt(0);
                    }} className="opacity-100 hover:opacity-70 transition-opacity sm:text-center sm:justify-center sm:py-3 sm:w-[100%] lg:w-[100%] bg-brandOrange text-white text-lg font-medium md:py-4 lg:py-2 lg:px-8 lg:m-0 rounded-md flex items-center ">
                    <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg"
                    className=" ">
                        <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#fff" fillRule="nonzero"/>
                    </svg>
                    <span className="ml-2">Add to cart</span>
                </button>
            </div>
        </div>
    </section>
                 {/* lightBox */}
                 {lightBoxOpen && !isMediumScreen && (
            <>
            <BackDrop isOpen={lightBoxOpen} onClick={closeLightBox} />
          
            <div className=" sm:hidden md:hidden lg:flex flex-col max-w-3xl items-center justify-center h-3/4 z-40 absolute top-1/2 transform -translate-y-1/2 left-1/2  -translate-x-1/2">
                <button className="bg-white text-center flex items-center justify-center rounded-full absolute p-2 top-1/2  left-28 cursor-pointer "
                onClick={() => setSelectedImageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : productImages.length - 1))} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 stroke-2 stroke-current text-veryDarkBlue fill-none hover:stroke-brandOrange transition-colors"
                    alt="previous">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                    </svg>
                </button>
                
                <img 
                    src={productImages[selectedImageIndex]}
                    alt={`Main image`}
                    className="max-w-[62%] rounded-md mt-36"
                />
                <button onClick={() => setSelectedImageIndex((prevIndex) => (prevIndex < productImages.length - 1 ? prevIndex + 1 : 0) )}
                 className="bg-white text-center flex items-center justify-center rounded-full absolute p-2 top-1/2  right-28 cursor-pointer ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 stroke-2 stroke-current text-veryDarkBlue fill-none hover:stroke-brandOrange transition-colors"
                alt="next"   
                >
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" 
                />
                </svg>

                </button>
                <div className="flex items-center max-w-[60%] gap-6 mt-6">
                    {productThumbnails?.map((thumbnail, index) => (
                        <button key={index} className={`w-[20%] cursor-pointer rounded-md `}
                    onClick={() => setSelectedImageIndex(index)}>
                        <img className={` cursor-pointer  rounded-md hover:border-2 hover:border-brandOrange  hover:opacity-40 transition-opacity
                    ${selectedImageIndex === index && "opacity-30  border-2 border-brandOrange" }`}
                            src={thumbnail}
                            alt={`product thumbnail ${index + 1}`}
                            
                         /></button>
                    ))}
                </div>
                <button
              className="absolute top-2 w-6 hover:fill-current right-28 font-bold text-xl cursor-pointer"
              onClick={closeLightBox}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
              className="h-6 w-6 stroke-2 stroke-current text-white fill-none hover:stroke-brandOrange transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>

            </button>
            </div>
            
        </>
        )}
</>
    )
}

export default ProductPage;