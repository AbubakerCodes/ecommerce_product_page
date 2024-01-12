import React from 'react';
import Navbar from './components/Navbar/Navbar';
import ProductPage from './pages/ProductPage';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { products } from './data/products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './pages/Home';
import {Collections} from './pages/Collections';
import {Men} from './pages/Men';
import {Women} from './pages/Women';
import {Kids} from './pages/Kids';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer/Footer';


function App() {
  const productsIds = products.map(product => product.id)

  return (
    <>
   <ShoppingCartProvider>
   <Router>
    <Navbar />
    <Routes>
        {/* Note: I have Used the productPage instead of Home for the "/" route (demo purposes) */}
      <Route path='/' element={<ProductPage id={productsIds[0]}/>} />

      {/* <Route path="/" element={<Home />}/> */}
      <Route path="/collections" element={<Collections />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route path="/kids" element={<Kids />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
    <Footer />
   </Router>
    </ShoppingCartProvider>
    </>
  )
}

export default App
