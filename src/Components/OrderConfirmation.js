export function OrderConfirmation({isOrderPlaced}) {
  return (
    <>
     {isOrderPlaced && <div>
        <h4 className="">Order Confirmed</h4>
        <p>Thank you for shopping with us!</p>
        <Link to="productsListingPage" className="btn btn-primary">
         Shop Again
        </Link>
      </div>}
    </>
  );
}
