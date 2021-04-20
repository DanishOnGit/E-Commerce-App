import axios from "axios";
import { useCart } from "../Contexts";
import { wishlistHandler, checkIfAlreadyPresent,getFinalPrice } from "../utilities";

export function Cart() {
  const {
    state: { cartItems, wishlistItems },
    dispatch
  } = useCart();

  

  async function removeFromCartHandler(item) {
    try {
      const response = await axios.post("./api/cartItems", {
        cartItem: {
          ...item,
          existsInCart: false
        }
      });
      if (response.status === 201) {
        dispatch({ type: "REMOVE_FROM_CART", payload: item });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function movetowishlist(item) {
    removeFromCartHandler(item);
    const response = checkIfAlreadyPresent(wishlistItems, item.id);
    if (!response) {
      wishlistHandler(wishlistItems, dispatch, item);
    } else if (response && response.existsInWishlist === false) {
      wishlistHandler(wishlistItems, dispatch, item);
    }
  }

  function increaseQuantityHandler(item) {
    axios.post("./api/cartItems", {
      cartItem: {
        ...item,
        cartQuantity: item.cartQuantity + 1
      }
    });

    dispatch({ type: "INCREASE_PRODUCT_QUANTITY", payload: item });
  }

  function decreaseQuantityHandler(item) {
    if (item.cartQuantity > 1) {
      axios.post("./api/cartItems", {
        cartItem: {
          ...item,
          cartQuantity: item.cartQuantity - 1
        }
      });
    }

    dispatch({ type: "DECREASE_PRODUCT_QUANTITY", payload: item });
  }

  function getFilteredCartData(cartItems) {
    return cartItems.filter((item) => item.existsInCart === true);
  }

  const filteredCartData = getFilteredCartData(cartItems);
  

  function calculateTotalMrp(filteredCartData){
    return filteredCartData.reduce(
      (total, item) => total + Number(item.price) * item.cartQuantity,
      0
    );
  }
  const totalMrp=calculateTotalMrp(filteredCartData);

  function calculateTotalCartAmount(filteredCartData) {
    return filteredCartData.reduce(
      (total, item) => total + Number(getFinalPrice(item.price,item.offer)) * item.cartQuantity,
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
      
      {cartItems.length === 0 && <h1>Cart is Empty</h1>}
      <div className="display-grid-2-2 cart-grid fixed-width">
        <div className="added-items-wrapper">
          {filteredCartData.map((item) => {
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
                      <span>Rs.{getFinalPrice(item.price,item.offer)}</span>{" "}
                      <span className="line-through small">Rs.{item.price}</span>
                      <span className="discount">{item.offer}% OFF</span>
                    </p>
                    <button
                      onClick={() => decreaseQuantityHandler(item)}
                      className="btn btn-secondary decrease"
                    >
                      -
                    </button>{" "}
                    <span className="quantity">{item.cartQuantity}</span>{" "}
                    <button
                      onClick={() => increaseQuantityHandler(item)}
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
            <p className="discounted-amount">-Rs.{totalMrp-totalCartAmount}</p>
          </div>

          <div>
            <p>Total Amount:</p>
            <p className="strong">Rs. {totalCartAmount}</p>
          </div>
          <button className="btn btn-primary">Place Order</button>
        </div>
      </div>
    </>
  );
}
