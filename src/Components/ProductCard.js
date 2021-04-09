import { useEffect, useRef, useState } from "react";
import { useCart, useToast } from "../Contexts";

import {
  wishlistHandler,
  addToCartHandler,
  checkIfAlreadyPresent,
  getFinalPrice
} from "../utilities";
export function ProductCard({ product }) {

 let isRendered=useRef(true)

 
  useEffect(()=>{
isRendered.current=true
    return ()=>{isRendered.current=false}
  },[])

const [isDisabled,setIsDisabled]=useState(false);

 const {showToast} =useToast();
  const {
    state: { cartItems, wishlistItems },
    dispatch
  } = useCart();

  function toggleBtnText(product) {
    const result = checkIfAlreadyPresent(cartItems, product.id);
    return result && result.existsInCart ? "Go to Cart" : "Add to Cart";
  }
  function toggleHeartColor(product) {
    const result = checkIfAlreadyPresent(wishlistItems, product.id);
    return result && result.existsInWishlist ? "salmon" : "grey";
  }
  return (
    <div key={product.id} className={product.inStock?"image-card-wrapper":"image-card-wrapper no-hover"}>
      <div className="card-image">
        <img src={product.image} alt="..." />

        {product.fastDelivery && (
          <span className="badge-success">Fast-Delivery</span>
        )}
      </div>
      <div className="product-details-wrapper">
        <p className="strong relative-positioned">
          {product.brand}
          <button
            onClick={() => wishlistHandler(wishlistItems, dispatch, product)}
            className="btn-icon add-to-wishlist-btn "
          >
            <i
              className="fas fa-heart add-to-wishlist-icon"
              style={{ color: toggleHeartColor(product) }}
            ></i>
          </button>
        </p>
        <p className="offer-wrapper">
          <span className="strong">
            Rs{getFinalPrice(product.price, product.offer)}
          </span>
          <span className="line-through small">Rs{product.price} </span>
          <span className="discount">{product.offer}% OFF</span>
        </p>
        <button
          disabled={!product.inStock || isDisabled}
          onClick={() => addToCartHandler(cartItems, dispatch, product,showToast,setIsDisabled,isRendered)}
          className={
            product.inStock
              ? "btn btn-primary add-to-cart-btn"
              : "btn btn-primary add-to-cart-btn disabled"
          }
        >
          {toggleBtnText(product)}
        </button>
      </div>
    </div>
  );
}
