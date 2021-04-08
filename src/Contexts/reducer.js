import { checkIfAlreadyPresent } from "../utilities";

// export const checkIfAlreadyPresent = (array, itemId) => {
//   const isPresent = array.find((product) => product.id === itemId);
//   return isPresent;
// };

export function reducer(state, action) {
  switch (action.type) {
    case "SET_ROUTE":
      return { ...state, route: action.payload };

    case "ADD_TO_CART": {
      const returnedItem = checkIfAlreadyPresent(
        state.cartItems,
        action.payload.id
      );

      if (!returnedItem) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { ...action.payload, existsInCart: true, cartQuantity: 1 }
          ]
        };
      } else {
        if (returnedItem.existsInCart) {
          return state;
        }
        return {
          ...state,
          cartItems: state.cartItems.map((product) => {
            if (product.id === action.payload.id) {
              return { ...product, existsInCart: true, cartQuantity: 1 };
            }
            return product;
          })
        };
      }
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, existsInCart: false };
          }

          return product;
        })
      };

    case "ADD_TO_WISHLIST": {
      const returnedItem = checkIfAlreadyPresent(
        state.wishlistItems,
        action.payload.id
      );

      if (!returnedItem) {
        return {
          ...state,
          wishlistItems: [
            ...state.wishlistItems,
            { ...action.payload, existsInWishlist: true }
          ]
        };
      } else {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((product) => {
            if (product.id === action.payload.id) {
              return {
                ...product,
                existsInWishlist: !product.existsInWishlist
              };
            }
            return product;
          })
        };
      }
    }

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
        priceRangeControl: 1000,
        showFastDeliveryOnly: false,
        showFullInventory: true
      };

    case "GET_PRODUCTSLIST":
      return { ...state, productsList: action.payload };

    case "GET_CART_ITEMS":
      return { ...state, cartItems: action.payload };

    case "INCREASE_PRODUCT_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, cartQuantity: product.cartQuantity + 1 };
          }
          return { ...product };
        })
      };

    case "DECREASE_PRODUCT_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((product) => {
          if (product.id === action.payload.id && product.cartQuantity >= 1) {
            return { ...product, cartQuantity: product.cartQuantity - 1 };
          }
          return { ...product };
        })
      };

    case "GET_WISHLIST_ITEMS":
      return { ...state, wishlistItems: action.payload };

    default:
      return state;
  }
}
