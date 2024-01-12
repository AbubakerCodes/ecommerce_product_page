import { createContext, useContext, useState } from "react";
import ShoppingCart from "../components/Cart/ShoppingCart";

const ShoppingCartContext = createContext();

export function useShoppingCart () {
    return (
        useContext(ShoppingCartContext)
    );
}
export function ShoppingCartProvider ({children}) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    function addToCart ({id, quantity}) {

            setCartItems(currentItems => {
                //If item does not already exist
                if(currentItems.find(item => item.id === id) == null) {
                    return [...currentItems, {id: id, quantity: quantity}]
                }
                else {
                    //if item is found in cart, increment its qt and keep the rest as is
                    return currentItems.map(item => item.id===id? {...item, quantity: quantity} : item);
                }  
            });        
    }

    function removeFromCart(props) {
         setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== props.id && item)
        });
        
    }
    const cartQuantity = cartItems.reduce((total, item) => (item.quantity + total), 0);


    return (
        <ShoppingCartContext.Provider value={{addToCart, removeFromCart, setIsCartOpen, cartItems, cartQuantity}}>
            {children}
            <ShoppingCart isCartOpen={isCartOpen}/>
        </ShoppingCartContext.Provider>
    )
}