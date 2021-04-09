import axios from "axios";
import { checkIfAlreadyPresent } from "../utilities";

export async function wishlistHandler(wishlistItems, dispatch, item) {
  try {
    const returnedValue = checkIfAlreadyPresent(wishlistItems, item.id);
    if (!returnedValue) {
      const response = await axios.post("./api/wishlistItems", {
        wishlistItem: {
          ...item,
          existsInWishlist: true
        }
      });

      if (response.status === 201) {
       
        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: response.data.wishlistItem
        });
      }
    } else {
      const response = await axios.put(
        `./api/wishlistItems/${returnedValue.id}`,
        {
          wishlistItem: {
            ...item,
            existsInWishlist: !returnedValue.existsInWishlist
          }
        }
      );
      if (response.status === 200) {
        dispatch({ type: "ADD_TO_WISHLIST", payload: returnedValue });
      }
    }
  } catch (err) {
    console.log(err);
  }
}