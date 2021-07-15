import { useOrderSummary } from "../utilities";
import { Checkout } from "./Checkout";

export function OrderSummary({ filteredCartData,setIsOrderPlaced }) {
  const {totalMrp,totalCartAmount}=useOrderSummary();
 
  function calculateTotalCartItems(filteredCartData) {
    return filteredCartData.reduce(
      (total, item) => total + item.cartQuantity,
      0
    );
  }
  const totalCartItems = calculateTotalCartItems(filteredCartData);

  return (
    <div className="card-total-wrapper">
      <h3>Cart Details</h3>
      <div>
        <p>Nos. of items: </p>
        <p>{totalCartItems}</p>
      </div>

      <div>
        <p>Total MRP:</p>
        <p>Rs.{totalMrp}</p>
      </div>

      <div>
        <p>Discount on MRP:</p>
        <p className="discounted-amount">-Rs.{totalMrp - totalCartAmount}</p>
      </div>

      <div>
        <p>Total Amount:</p>
        <p className="strong">Rs. {totalCartAmount}</p>
      </div>
      
      <Checkout
        key={totalCartAmount}
        setIsOrderPlaced={setIsOrderPlaced}
      />
    </div>
  );
}
