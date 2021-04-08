
import axios from "axios";
import {checkIfAlreadyPresent} from "../utilities";

export async function addToCartHandler(cartItems,dispatch,item,showToast,setIsDisabled,isRendered) {
  
  try {
    
    showToast(`Adding ${item.brand} to cart...`,"info");
    setIsDisabled(true);
    const returnedValue = checkIfAlreadyPresent(cartItems, item.id);

    if (!returnedValue) {
      const response = await axios.post("./api/cartItems", {
        cartItem: {
          ...item,
          cartQuantity: 1,
          existsInCart: true
        }
      });
      
      if (response.status === 201) {
        showToast(`Added!`,"success");
        dispatch({ type: "ADD_TO_CART", payload: response.data.cartItem });
      }
     
    } else {
      if (returnedValue.existsInCart) {
        dispatch({ type: "SET_ROUTE", payload: "cart" });
      } else {
        const response = await axios.put(
          `./api/cartItems/${returnedValue.id}`,
          {
            cartItem: {
              ...item,
              cartQuantity: 1,
              existsInCart: true
            }
          }
        );
        
        if (response.status === 200) {
          dispatch({ type: "ADD_TO_CART", payload: response.data.cartItem });
        }
      }
    }
  } catch (err) {
    console.log(err);
    showToast(`Could not add ${item.brand} to cart!`,"failure")
  }
  finally{

    if (isRendered) { 
      setIsDisabled(false)
    }

  }
}