import { useCart } from "../Contexts";
import { getFinalPrice } from "./getFinalPrice";

export const useOrderSummary=()=>{
    const {
        state: { cartItems },
      } = useCart();
    
      function getFilteredCartData(cartItems) {
        return cartItems.filter((item) => item.existsInCart === true);
      }
    
      const filteredCartData = getFilteredCartData(cartItems);

    function calculateTotalMrp(filteredCartData) {
        return filteredCartData.reduce(
          (total, item) => total + Number(item.productId.price) * item.cartQuantity,
          0
        );
      }
      const totalMrp = calculateTotalMrp(filteredCartData);
    
      function calculateTotalCartAmount(filteredCartData) {
        return filteredCartData.reduce(
          (total, item) =>
            total +
            Number(getFinalPrice(item.productId.price, item.productId.discount)) *
              item.cartQuantity,
          0
        );
      }
      const totalCartAmount = calculateTotalCartAmount(filteredCartData);
    

return {totalMrp,totalCartAmount}
}