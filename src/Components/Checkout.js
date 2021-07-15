import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useCart } from "../Contexts";
import { API_URL, useOrderSummary } from "../utilities";
const CLIENT_ID = process.env.REACT_APP_CLIENTID;

export function Checkout({ setIsOrderPlaced }) {
  const { totalMrp, totalCartAmount } = useOrderSummary();

  const {
    state: { cartItems },
    dispatch,
  } = useCart();

  function createOrderOnBtnClick(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (totalCartAmount * 0.01368).toFixed(2),
          },
        },
      ],
    });
  }

  async function paymentSuccess(data, actions) {
    await actions.order.capture();
    setIsOrderPlaced(true);

    const orderItems = cartItems
      .filter((item) => item.existsInCart === true)
      .map(({ productId: { _id, price, discount }, cartQuantity }) => ({
        productId: _id,
        itemPriceDetails: { price, discount },
        cartQuantity,
      }));
    try {
      const { status } = await axios({
        method: "POST",
        url: `${API_URL}/orders`,
        data: {
          orderItems: orderItems,
          orderPriceDetails: {
            totalMrp,
            totalDiscount: totalMrp - totalCartAmount,
            toBePaid: totalCartAmount,
          },
        },
      });
      if (status === 201) {
        dispatch({ type: "GET_CART_ITEMS", payload: [] });
      }
    } catch (error) {
      console.log(error);
    }
  }
  function paymentFailure(data) {
    console.log("payment failed!", { data });
  }

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <PayPalButtons
        style={{ layout: "horizontal", color: "silver", tagline: false }}
        createOrder={createOrderOnBtnClick}
        onApprove={paymentSuccess}
        onError={paymentFailure}
      />
    </PayPalScriptProvider>
  );
}
