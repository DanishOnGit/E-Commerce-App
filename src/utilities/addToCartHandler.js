import axios from "axios";
import { checkIfAlreadyPresent } from "../utilities";

export async function addToCartHandler(
  cartItems,
  dispatch,
  item,
  showToast,
  setIsDisabled,
  isRendered
) {
  try {
    showToast(`Adding ${item.brand} to cart...`, "info");
    setIsDisabled(true);
    const returnedValue = checkIfAlreadyPresent(cartItems, item._id);

    if (!returnedValue) {
      const response = await axios.post(
        "https://Badminton-ecomm.danishahmed27.repl.co/cart",
        {
          _id: item._id,
          cartQuantity: 1,
          existsInCart: true
        }
      );

      if (response.status === 201) {
        showToast(`Added!`, "success");
        dispatch({
          type: "GET_CART_ITEMS",
          payload: response.data.cartItem.cartItems
        });
      }
    } else {
      if (returnedValue.existsInCart) {
        dispatch({ type: "SET_ROUTE", payload: "cart" });
      } else {
        const response = await axios.post(
          `https://Badminton-ecomm.danishahmed27.repl.co/cart`,

          {
            _id: item._id,
            cartQuantity: 1,
            existsInCart: true
          }
        );

        if (response.status === 200) {
          dispatch({
            type: "GET_CART_ITEMS",
            payload: response.data.cartItem.cartItems
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    showToast(`Could not add ${item.brand} to cart!`, "failure");
  } finally {
    if (isRendered) {
      setIsDisabled(false);
    }
  }
}
