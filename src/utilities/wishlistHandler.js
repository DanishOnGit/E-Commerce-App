import axios from "axios";
import { checkIfAlreadyPresent } from "../utilities";
import { API_URL } from "./apiurl";

export async function wishlistHandler(
  wishlistItems,
  dispatch,
  item,
  showToast,
  setIsDisabled,
  isRendered
) {
  try {
    const returnedValue = checkIfAlreadyPresent(wishlistItems, item._id);
    
    if (!returnedValue) {
      showToast(`Adding ${item.brand} to wishlist...`, "info");
      setIsDisabled(true);
      const response = await axios.post(
        `${API_URL}/wishlist`,
        {
          _id: item._id
        }
      );

      if (response.status === 201) {
        showToast(`Added!`, "success");
        dispatch({
          type: "GET_WISHLIST_ITEMS",
          payload: response.data.wishlistItems
        });
      }
    }
     else {
      const response = await axios.post(
        `${API_URL}/wishlist`,

        {
          _id: item._id
        }
      );

      if (response.status === 201) {
        dispatch({
          type: "GET_WISHLIST_ITEMS",
          payload: response.data.wishlistItems
        });
      }
    }
  } catch (error) {
    console.log(error);
    showToast(`Could not add ${item.brand} to wishlist!`, "failure");
  } finally {
    if (isRendered.current) {
      setIsDisabled(false);
    }
  }
}
