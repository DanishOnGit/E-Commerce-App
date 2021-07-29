import { useState, useEffect, useRef } from "react";
import { useCart, useToast } from "../Contexts";
import { wishlistHandler, addToCartHandler, getFinalPrice } from "../utilities";

export function Wishlist() {
  let isRendered = useRef(true);

  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  const [isDisabled, setIsDisabled] = useState(false);

  const { showToast } = useToast();

  const {
    state: { wishlistItems, cartItems },
    dispatch,
  } = useCart();

  function getFilteredWishlistData(wishlistItems) {
    return wishlistItems.filter((product) => product.existsInWishlist === true);
  }

  const filteredWishlistData = getFilteredWishlistData(wishlistItems);

  function getTotalWishlistItems(wishlistItems) {
    const array = wishlistItems.filter((item) => item.existsInWishlist);
    return array.length;
  }

  return (
    <>
      <h1 className="wishlist-header centered">
        Your Wishlist{" "}
        <span className="small light-weight">
          ({getTotalWishlistItems(wishlistItems)} items)
        </span>
      </h1>
      {wishlistItems.length === 0 && <h1>Wishlist is Empty</h1>}
      <div className="display-grid-2-2 cart-grid">
        {filteredWishlistData.map(({ productId: item }) => {
          return (
            <div
              key={item._id}
              className={
                item.inStock
                  ? "image-card-wrapper wishlist-product-card"
                  : "image-card-wrapper no-hover wishlist-product-card"
              }
            >
              <div className="product-details-wrapper">
                <div className="card-image">
                  <img
                    className="resized-card-image"
                    src={item.image}
                    alt="product-image"
                  />
                  <button
                    onClick={() =>
                      wishlistHandler(
                        wishlistItems,
                        dispatch,
                        item,
                        showToast,
                        setIsDisabled,
                        isRendered
                      )
                    }
                    className="btn btn-secondary remove-btn"
                  >
                    <i className="fas fa-times "></i>
                  </button>
                </div>
                <div className="product-details-wrapper">
                  <p className="strong">{item.brand}</p>
                  <p className="offer-wrapper">
                    <span className="strong">
                      Rs{getFinalPrice(item.price, item.discount)}
                    </span>
                    <span className="line-through">Rs. {item.price} </span>
                    <span className="discount">{item.discount}% OFF</span>
                  </p>
                  <button
                  disabled={!item.inStock || isDisabled}
                  onClick={() => {
                    addToCartHandler(
                      cartItems,
                      dispatch,
                      item,
                      showToast,
                      setIsDisabled,
                      isRendered
                    );
                    wishlistHandler(wishlistItems, dispatch, item);
                  }}
                  className={
                    item.inStock
                      ? "btn btn-primary move-to-cart-btn"
                      : "btn btn-primary disabled move-to-cart-btn"
                  }
                >
                  Move to cart
                </button>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
