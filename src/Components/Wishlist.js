
import { useCart } from "../Contexts";
import {wishlistHandler,addToCartHandler,getFinalPrice} from "../utilities";


export function Wishlist() {

  const {
    state: { wishlistItems, cartItems },
    dispatch
  } = useCart();


  function getFilteredWishlistData(wishlistItems) {
    console.log("wishlist items", wishlistItems);
    return wishlistItems.filter((product) => product.existsInWishlist === true);
  }

  const filteredWishlistData = getFilteredWishlistData(wishlistItems);

  function getTotalWishlistItems(wishlistItems){
 const array= wishlistItems.filter(item=>item.existsInWishlist)
 return array.length
  }
  

  return (
    <>
      <h1 className="wishlist-header centered">Your Wishlist <span className="small light-weight">({getTotalWishlistItems(wishlistItems)} items)</span></h1>
      {wishlistItems.length === 0 && <h1>Wishlist is Empty</h1>}
      <div className="display-grid-2-2 cart-grid">
        {console.log("wishlist", filteredWishlistData)}
        {filteredWishlistData.map((item) => {
          
          return (
            <div key={item.id} className="image-card-wrapper">
              <div className="product-details-wrapper">
                <div className="card-image">
                  <img src={item.image} alt="..." />
                  <button
                    onClick={()=>wishlistHandler(wishlistItems,dispatch,item)}
                    className="btn btn-secondary remove-btn"
                  >
                    <i className="fas fa-times "></i>
                  </button>
                </div>
                <div className="product-details-wrapper">
                  <p className="strong">{item.brand}</p>
                  <p className="offer-wrapper">
                    <span className="strong">Rs{getFinalPrice(item.price,item.offer)}</span>
                    <span className="line-through">Rs. {item.price} </span>
                    <span className="discount">{item.offer}% OFF</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => {addToCartHandler(cartItems,dispatch,item);wishlistHandler(wishlistItems,dispatch,item)}}
                className="btn btn-outline-primary"
              >
                Move to cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
