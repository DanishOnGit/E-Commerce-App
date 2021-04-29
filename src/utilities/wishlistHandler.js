import axios from "axios";
import { checkIfAlreadyPresent } from "../utilities";

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
        "https://Badminton-ecomm.danishahmed27.repl.co/wishlist",
        {
          _id: item._id
        }
      );

      if (response.status === 201) {
        showToast(`Added!`, "success");
        dispatch({
          type: "GET_WISHLIST_ITEMS",
          payload: response.data.wishlistItem.wishlistItems
        });
      }
    } else {
      const response = await axios.post(
        `https://Badminton-ecomm.danishahmed27.repl.co/wishlist`,

        {
          _id: item._id
        }
      );

      if (response.status === 200) {
        dispatch({
          type: "GET_WISHLIST_ITEMS",
          payload: response.data.wishlistItem.wishlistItems
        });
      }
    }
  } catch (err) {
    console.log("Wisholist post eror is...", err);
    showToast(`Could not add ${item.brand} to wishlist!`, "failure");
  } finally {
    if (isRendered) {
      setIsDisabled(false);
    }
  }
}
