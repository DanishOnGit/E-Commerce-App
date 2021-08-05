import { useState } from "react";
import { useCart } from "../Contexts";
import { CartItemCard } from "./CartItemCard";
import { OrderConfirmation } from "./OrderConfirmation";
import { OrderSummary } from "./OrderSummary";

export function Cart() {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const {
    state: { cartItems },
  } = useCart();

  function getFilteredCartData(cartItems) {
    return cartItems.filter((item) => item.existsInCart === true);
  }

  const filteredCartData = getFilteredCartData(cartItems);

  return (
    <div className="mb-3">
      {isOrderPlaced ? (
        <OrderConfirmation />
      ) : (
        <>
          {" "}
          <h1 className="cart-header centered">Your Cart</h1>
          {filteredCartData.length === 0 && <h1>Cart is Empty</h1>}
          {filteredCartData.length !== 0 && (
            <div className="display-grid-2-2 cart-grid fixed-width">
              <div className="added-items-wrapper">
                {filteredCartData.map(({ cartQuantity, productId: item }) => {
                  return (
                    <CartItemCard cartQuantity={cartQuantity} item={item} />
                  );
                })}
              </div>
              <OrderSummary
                filteredCartData={filteredCartData}
                setIsOrderPlaced={setIsOrderPlaced}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
