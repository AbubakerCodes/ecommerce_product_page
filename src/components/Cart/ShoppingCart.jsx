import React from 'react';
import CartItem from './CartItem.jsx'
import { useShoppingCart } from '../../context/ShoppingCartContext.jsx';
import { Link } from 'react-router-dom';


function ShoppingCart(props) {
  const {cartItems} = useShoppingCart();
  const {isCartOpen} = useShoppingCart();
  const handleCheckoutBtnClick = () => {
    isCartOpen = true;
  }
  

  return props.isCartOpen && (
    <>
    <section className='z-20 rounded w-[98%] absolute top-[13%] md:top-[15%] sm:right-[50%] transform translate-x-1/2 md:left-auto lg:top-[15%] md:right-16 md:translate-x-0 max-w-[460px] bg-white shadow-2xl'>
        <div className=' '>
          <h1 className=' px-6  md:px-8 pt-4 pb-0 font-bold text-xl text-veryDarkBlue'>Cart</h1>
          <hr className='mt-4 h-0.5 bg-lightGrayishBlue w-[100%]'/>    
        </div>
        {
          cartItems.length === 0 ? (<div className='px-10 py-20 font-bold text-xl text-grayishBlue flex items-center justify-center'><p>Your Cart is empty.</p></div> )
          :
        (  <div className='' tabIndex={0} autoFocus>
        {
          cartItems.map(item => {
            return <CartItem key={item.id} id={item.id} quantity={item.quantity} />
          })
        }
        </div>)
        }
        {
          cartItems.length > 0 &&
          <div className='px-4 pt-4 pb-7'>
        <button 
        tabIndex={1}
        className="hover:opacity-70 transition-opacity sm:text-center sm:justify-center sm:py-3 sm:w-[100%] lg:w-[100%] bg-brandOrange text-white text-lg font-medium md:py-4 lg:py-2 lg:px-8 lg:m-0 rounded-md flex items-center ">
        <Link to="/checkout" onClick={handleCheckoutBtnClick} className="hover:opacity-70 transition-opacity sm:text-center sm:justify-center sm:py-3 sm:w-[100%] lg:w-[100%] bg-brandOrange text-white text-lg font-medium md:py-4 lg:py-2 lg:px-8 lg:m-0 rounded-md flex items-center ">
          <span className="ml-2">Checkout</span>
        </Link>
        </button>
        </div>
        }
    </section>
      
    </>
  )
}

export default ShoppingCart;
