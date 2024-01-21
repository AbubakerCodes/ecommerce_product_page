import { useState } from 'react';
import image_avatar from '../../../public/images/image_avatar.png';
import icon_menu from '../../../public/images/icon_menu.svg';
import logo from '../../../public/images/logo.svg';
import icon_close from '../../../public/images/icon_close.svg';
import BackDrop from '../BackDrop/BackDrop';
import './Navbar.css'
import { useShoppingCart } from '../../context/ShoppingCartContext';
import {Link} from 'react-router-dom';
import ShoppingCart from '../Cart/ShoppingCart';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{name: "Collections", path: "/collections"}, {name: "Men", path: "/men"}, {name: "Women", path: "/women"}, {name: "Kids", path: "/kids"}];
  const {cartQuantity} = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false)
  const isLargeScreen = window.innerWidth >= 962;

  function handleCartIconClick() {
    setIsOpen(!isOpen);
  }

  function handleToggleMenu() {
    setIsMenuOpen(prevState => !prevState);
  }
  const handleMobileNavClick = () => {
    isLargeScreen ? setIsMenuOpen(prevVal => (prevVal)) : setIsMenuOpen(prevVal => (prevVal, !prevVal));
  }
  return (
    <>
    <ShoppingCart isCartOpen={isOpen} /> 
    <nav className=' py-4'>
      {/* container */}
      <div className='mx-auto max-w-7xl px-8 sm:px-6 lg:px-8 flex items-center justify-between'>
        
        {/* nav left side */}
      <div className='flex items-center'>

        {/* logo and mobile menu */}
        <div className='flex items-center gap-5 align-middle cursor-pointer'>
          <button onClick={handleToggleMenu} type="menu toggle button" className="lg:hidden text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" >
            <img src={icon_menu} alt="hamburger menu" className='h-5 w-auto lg:hidden'/>
          </button>
          <Link to="/">
          <img src={logo} alt="logo" className='h-6 sm:h-5 w-auto mr-10 '/>
          </Link>
        </div>

        <BackDrop isOpen={isMenuOpen} onClick={handleToggleMenu}/>
        {/* nav links */}
        
       <ul className={`${!isMenuOpen && "sm:hidden"} lg:flex sm:flex sm:flex-col sm:absolute sm:left-0 sm:top-[-100] ${isMenuOpen && "sm:top-0"} sm:h-full sm:w-[70vw] sm:bg-white sm:p-6 sm:items-start lg:w-auto lg:bg-transparent lg:flex-row lg:h-auto lg:static lg:items-center lg:justify-between gap-8 z-50`} id="navLinks">
        
        <img onClick={handleToggleMenu} className=' text-veryDarkBlue lg:hidden'
        src={icon_close} alt="toggle menu button" />
        {navLinks.map((navLink, index) => {
          return <li key={index} className={`cursor-pointer text-veryDarkBlue sm:font-bold sm:active:text-darkGrayishBlue lg:text-darkGrayishBlue  lg:hover:text-veryDarkBlue`}>
            <Link to={navLink.path} onClick={handleMobileNavClick} className={`${isLargeScreen &&`hover-line`} focus:border-brandOrange`}>{navLink.name}</Link>
          </li>
        })}
        
       </ul>
      </div>
      {/* nav right side: cart and avatar */}
       <div className='flex items-center gap-8 '>
        <div onClick={() => handleCartIconClick()}  className={`relative`}>
        <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer'>
          <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#69707D" fillRule="nonzero"/>
        </svg>
        <span className='absolute bottom-2.5 right-0 sm:px-0.7 py-0.12 px-1 text-sm bg-brandOrange text-white rounded-full cursor-pointer' tabIndex={0}>{cartQuantity > 0 && cartQuantity}</span>
        </div>
        <a href='/profile'><img src={image_avatar} alt="avatar" className='md:w-8 sm:w-6 cursor-pointer avatar'/></a>
       </div>
      </div>
    </nav>
       <hr className='mx-auto max-w-7xl h-0.5 bg-lightGrayishBlue w-[100%]'/>
         
    </>
  )
}

export default Navbar;
