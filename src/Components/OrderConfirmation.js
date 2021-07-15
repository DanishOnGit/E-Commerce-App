import { Link } from "react-router-dom";

export function OrderConfirmation() {
  return (
    <>
      <div className="order-confirmation-wrapper">
        <h1 className="">Order Confirmed</h1>
        <p>Thank you for shopping with us!</p>
        <Link to="/productsListingPage" className="btn btn-outline-primary styled">
         Shop Again
        </Link>
      </div>
    </>
  );
}
