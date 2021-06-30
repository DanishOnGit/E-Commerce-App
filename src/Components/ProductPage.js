import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCart, useToast } from "../Contexts";
import { useNavigate, useParams } from "react-router-dom";
import {
  wishlistHandler,
  addToCartHandler,
  getFinalPrice,
  checkIfAlreadyPresent,
  API_URL,
} from "../utilities";

export const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { showToast } = useToast();
  const {
    state: { cartItems, wishlistItems },
    dispatch,
  } = useCart();

  let isRendered = useRef(true);

  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${API_URL}/productsListingPage/product/${itemId}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.log("error occured while fetching page!", error);
      }
    })();
  }, []);

  function toggleBtnText(product) {
    const result = checkIfAlreadyPresent(cartItems, product._id);
    return result && result.existsInCart ? "Go to Cart" : "Add to Cart";
  }

  return (
    <div className="product-wrapper">
      <div className="product-image-wrapper">
        <img src={product.image} alt="product-image" />
      </div>
      <div className="product-details-wrapper-card">
        <h2>{product.brand}</h2>
        <p>
          <span className="strong">Model:</span> {product.description}
        </p>
        <p>
          <span className="strong">Weight:</span> {product.weight} gm
        </p>
        <p className="strong">
          {" "}
          Price: Rs{getFinalPrice(product.price, product.discount)}{" "}
        </p>
        <div>
          <button
            disabled={!product.inStock || isDisabled}
            onClick={() => {
              const result = checkIfAlreadyPresent(cartItems, product._id);
              !result?.existsInCart
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
          <br />
          <button
            onClick={() =>
              wishlistHandler(
                wishlistItems,
                dispatch,
                product,
                showToast,
                setIsDisabled,
                isRendered
              )
            }
            className="btn btn-outline-secondary mg-top min-btn-width"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};
