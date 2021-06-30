import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
const CLIENT_ID = process.env.REACT_APP_CLIENTID;

export function Checkout({ totalCartAmount, setIsOrderPlaced }) {

  const [totalValue, setTotalValue] = useState(totalCartAmount);

  console.log({ totalCartAmount });

  useEffect(() => setTotalValue(totalCartAmount), [totalCartAmount]);

  function createOrderOnBtnClick(data, actions) {
    console.log({ data, totalCartAmount },"totalValue is...",totalValue);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (totalValue * 0.01368).toFixed(2),
          },
        },
      ],
    });
  }

  async function paymentSuccess(data, actions) {
    await actions.order.capture();
    setIsOrderPlaced(true);
    console.log("Placed Orrder!!");
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
