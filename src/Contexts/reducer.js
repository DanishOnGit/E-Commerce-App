import { checkIfAlreadyPresent } from "../utilities";

export function reducer(state, action) {
  switch (action.type) {
    case "SET_ROUTE":
      return { ...state, route: action.payload };

    case "GET_PRODUCTSLIST":
      return { ...state, productsList: action.payload };

    case "GET_CART_ITEMS":
      return { ...state, cartItems: action.payload };

    case "GET_WISHLIST_ITEMS":
      return { ...state, wishlistItems: action.payload };

    case "PRICE_LOW_TO_HIGH":
      return {
        ...state,
        sortBy: "PRICE_LOW_TO_HIGH"
      };
    case "PRICE_HIGH_TO_LOW":
      return { ...state, sortBy: "PRICE_HIGH_TO_LOW" };

    case "PRICE_RANGE_SORT":
      return {
        ...state,
        priceRangeControl: action.payload
      };

    case "IN_STOCK_ONLY":
      return {
        ...state,
        showFullInventory: !state.showFullInventory
      };
    case "FAST_DELIVERY_ONLY":
      return {
        ...state,
        showFastDeliveryOnly: !state.showFastDeliveryOnly
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        sortBy: null,
        priceRangeControl: 5000,
        showFastDeliveryOnly: false,
        showFullInventory: true
      };

    default:
      return state;
  }
}
