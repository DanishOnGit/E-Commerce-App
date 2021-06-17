import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCart, useToast } from "../Contexts";
import {
  wishlistHandler,
  getFinalPrice,
  API_URL,
  checkIfAlreadyPresent,
} from "../utilities";

export function Cart() {
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    state: { cartItems, wishlistItems },
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

  function getFilteredCartData(cartItems) {
    return cartItems.filter((item) => item.existsInCart === true);
  }

  const filteredCartData = getFilteredCartData(cartItems);
  function calculateTotalMrp(filteredCartData) {
    return filteredCartData.reduce(
      (total, item) => total + Number(item.productId.price) * item.cartQuantity,
      0
    );
  }
  const totalMrp = calculateTotalMrp(filteredCartData);

  function calculateTotalCartAmount(filteredCartData) {
    return filteredCartData.reduce(
      (total, item) =>
        total +
        Number(getFinalPrice(item.productId.price, item.productId.discount)) *
          item.cartQuantity,
      0
    );
  }
  const totalCartAmount = calculateTotalCartAmount(filteredCartData);

  function calculateTotalCartItems(filteredCartData) {
    return filteredCartData.reduce(
      (total, item) => total + item.cartQuantity,
      0
    );
  }
  const totalCartItems = calculateTotalCartItems(filteredCartData);

  return (
    <>
      <h1 className="cart-header centered">Your Cart</h1>

      {filteredCartData.length === 0 && <h1>Cart is Empty</h1>}
      {filteredCartData.length !== 0 && (
        <div className="display-grid-2-2 cart-grid fixed-width" key={item._id}>
          <div className="added-items-wrapper">
            {filteredCartData.map(({ cartQuantity, productId: item }) => {
              return (
                <div className="outlined resized margin-bottom">
                  <div className="image-and-details-wrapper-cart">
                    <div className="card-image resized-image">
                      <img
                        className="cart-card-image"
                        src={item.image}
                        alt="..."
                      />
                    </div>
                    <div className="details-wrapper">
                      <h4 className="brand">{item.brand}</h4>
                      <p className="description">Carbon and blah blha blha..</p>
                      <p className="offer-wrapper">
                        <span>
                          Rs.{getFinalPrice(item.price, item.discount)}
                        </span>
                        <span className="line-through small">
                          Rs.{item.price}
                        </span>
                        <span className="discount">{item.discount}% OFF</span>
                      </p>
                      <button
                        onClick={() =>
                          decreaseQuantityHandler(item, cartQuantity)
                        }
                        className="btn btn-secondary decrease"
                      >
                        -
                      </button>{" "}
                      <span className="quantity">{cartQuantity}</span>{" "}
                      <button
                        onClick={() =>
                          increaseQuantityHandler(item, cartQuantity)
                        }
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
                      onClick={() => movetowishlist(item)}
                      className="btn btn-link btn-link-hover wishlist"
                    >
                      MOVE TO WISHLIST
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card-total-wrapper">
            <h3>Cart Details</h3>
            <div>
              <p>Nos. of items: </p>
              <p>{totalCartItems}</p>
            </div>

            <div>
              <p>Total MRP:</p>
              <p>Rs.{totalMrp}</p>
            </div>

            <div>
              <p>Discount on MRP:</p>
              <p className="discounted-amount">
                -Rs.{totalMrp - totalCartAmount}
              </p>
            </div>

            <div>
              <p>Total Amount:</p>
              <p className="strong">Rs. {totalCartAmount}</p>
            </div>
            <button className="btn btn-primary">Place Order</button>
          </div>
        </div>
      )}
    </>
  );
}
