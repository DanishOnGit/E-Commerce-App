import { createContext, useContext, useReducer } from "react";
import {reducer} from "./reducer"
const CartContext = createContext();

export function CartProvider({ children }) {
  
  const initialState= {
    showFullInventory: true,
    showFastDeliveryOnly: false,
    sortBy: null,
    priceRangeControl: 1000,
    productsList: [],
    cartItems: [],
    wishlistItems: [],
   
  }
 
  const [state, dispatch] = useReducer(reducer,initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
