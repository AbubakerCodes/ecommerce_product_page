import React from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { products } from "../../data/products";
import icon_delete from "../../../public/images/icon_delete.svg";

function CartItem(props) {
  const { removeFromCart } = useShoppingCart();

  // Find the corresponding product using the id from props
  const item = products.find((product) => product.id === props.id);

  return (
    <div className="flex items-center justify-between px-5 sm:gap-4 md:px-8 my-4" tabIndex={0}>
      <img src={item.images[0]} alt="product image" className="rounded-md w-[20%] md:w-[16%] object-cover" />
      <div className="flex flex-col gap-1 w-[74%] md:w-[60%] text-grayishBlue">
        <p>{item.title}</p>
        <p>
          <span className="mr-1" tabIndex={0}>{`$${item.newPrice} x `}</span><span className="mr-1" tabIndex={0}>{`${props.quantity} `}</span>
          <span className="font-bold text-xl text-veryDarkBlue" tabIndex={0}>${item.newPrice * props.quantity}</span>
        </p>
      </div>
      <img className=" cursor-pointer p-0 m-0" 
        onClick={() => removeFromCart({id: props.id})}
        src={icon_delete}
        alt="delete item from cart"
      />
    </div>
  );
}

export default  CartItem;
