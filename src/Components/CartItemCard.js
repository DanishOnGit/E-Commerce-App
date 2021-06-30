import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCart, useToast } from "../Contexts";
import {
    wishlistHandler,
    getFinalPrice,
    API_URL,
    checkIfAlreadyPresent,
  } from "../utilities";
export function CartItemCard({ cartQuantity, item }) {
    
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    state: { wishlistItems },
    dispatch,
  } = useCart();
  const { showToast } = useToast();
  let isRendered = useRef(true);

  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  async function removeFromCartHandler(item) {
    try {
      const response = await axios.post(`${API_URL}/cart`, {
        _id: item._id,
        existsInCart: false,
      });

      if (response.status === 201) {
        dispatch({
          type: "GET_CART_ITEMS",
          payload: response.data.cartItems,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function movetowishlist(item) {
    removeFromCartHandler(item);
    const result = checkIfAlreadyPresent(wishlistItems, item._id);
    if (!result) {
      wishlistHandler(
        wishlistItems,
        dispatch,
        item,
        showToast,
        setIsDisabled,
        isRendered
      );
    }
  }

  async function increaseQuantityHandler(item, cartQuantity) {
    try {
      const response = await axios.post(`${API_URL}/cart`, {
        _id: item._id,
        cartQuantity: cartQuantity + 1,
      });

      dispatch({
        type: "GET_CART_ITEMS",
        payload: response.data.cartItems,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function decreaseQuantityHandler(item, cartQuantity) {
    try {
      if (cartQuantity > 1) {
        const response = await axios.post(`${API_URL}/cart`, {
          _id: item._id,
          cartQuantity: cartQuantity - 1,
        });
        dispatch({
          type: "GET_CART_ITEMS",
          payload: response.data.cartItems,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="outlined resized margin-bottom" key={item._id}>
      <div className="image-and-details-wrapper-cart">
        <div className="card-image resized-image">
          <img className="cart-card-image" src={item.image} alt="..." />
        </div>
        <div className="details-wrapper">
          <h4 className="brand">{item.brand}</h4>
          <p className="description">Carbon and blah blha blha..</p>
          <p className="offer-wrapper">
            <span>Rs.{getFinalPrice(item.price, item.discount)}</span>
            <span className="line-through small">Rs.{item.price}</span>
            <span className="discount">{item.discount}% OFF</span>
          </p>
          <button
            onClick={() => decreaseQuantityHandler(item, cartQuantity)}
            className="btn btn-secondary decrease"
          >
            -
          </button>{" "}
          <span className="quantity">{cartQuantity}</span>{" "}
          <button
            onClick={() => increaseQuantityHandler(item, cartQuantity)}
            className="btn btn-secondary increase"
          >
            +
          </button>
        </div>
      </div>
      <div className="cta-wrapper">
        <button
          onClick={() => removeFromCartHandler(item)}
          className="btn btn-link btn-link-hover remove"
        >
          REMOVE
        </button>

        <button
          disabled={isDisabled}
          onClick={() => movetowishlist(item)}
          className="btn btn-link btn-link-hover wishlist"
        >
          MOVE TO WISHLIST
        </button>
      </div>
    </div>
  );
}
