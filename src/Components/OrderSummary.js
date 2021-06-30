import { getFinalPrice } from "../utilities";
import { Checkout } from "./Checkout";

export function OrderSummary({ filteredCartData,setIsOrderPlaced }) {
    
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
        totalCartAmount={totalCartAmount}
        setIsOrderPlaced={setIsOrderPlaced}
      />
    </div>
  );
}
