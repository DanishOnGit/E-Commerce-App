import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, useCart, useToast } from "../Contexts";
import {
  wishlistHandler,
  addToCartHandler,
  checkIfAlreadyPresent,
  getFinalPrice,
} from "../utilities";

export function ProductCard({ product }) {
  const navigate = useNavigate();
  const { userToken } = useAuth();
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
    state: { cartItems, wishlistItems },
    dispatch,
  } = useCart();

  function toggleBtnText(product) {
    const result = checkIfAlreadyPresent(cartItems, product._id);
    return result && result.existsInCart ? "Go to Cart" : "Add to Cart";
  }
  function toggleHeartColor(product) {
    const result = checkIfAlreadyPresent(wishlistItems, product._id);
    return result && result.existsInWishlist ? "salmon" : "grey";
  }
  return (
    <div
      key={product._id}
      className={
        product.inStock ? "image-card-wrapper" : "image-card-wrapper no-hover"
      }
    >
      <Link
        to={`/productsListingPage/product/${product._id}`}
        className="text-deco"
      >
        {" "}
        <div className="card-image">
          <img src={product.image} alt="..." />

          {product.fastDelivery && product.inStock && (
            <span className="badge-success">Fast-Delivery</span>
          )}
          {!product.inStock && (
            <span className="badge-neutral">Out of Stock</span>
          )}
        </div>
      </Link>
      <div className="product-details-wrapper">
        <p className="strong relative-positioned">
          {product.brand}{" "}
          <button
            onClick={() =>
              userToken
                ? wishlistHandler(
                    wishlistItems,
                    dispatch,
                    product,
                    showToast,
                    setIsDisabled,
                    isRendered
                  )
                : showToast("Log in to perform this action", "failure")
            }
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
            Rs{getFinalPrice(product.price, product.discount)}
          </span>
          <span className="line-through small">Rs{product.price} </span>
          <span className="discount">{product.discount}% OFF</span>
        </p>
        <button
          disabled={!product.inStock || isDisabled}
          onClick={() => {
            const result = checkIfAlreadyPresent(cartItems, product._id);
            !result?.existsInCart && userToken
              ? addToCartHandler(
                  cartItems,
                  dispatch,
                  product,
                  showToast,
                  setIsDisabled,
                  isRendered
                )
              : navigate("/cart");
          }}
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
