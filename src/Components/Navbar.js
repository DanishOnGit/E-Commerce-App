import { useCart } from "../Contexts";
import { Searchbar } from "./Searchbar";
import { Link, NavLink } from "react-router-dom";
export const Navbar = ({ searchText, setSearchText }) => {
  const {
    state: { cartItems },
    dispatch
  } = useCart();

  function totalCartItems(cartItems) {
    const result = cartItems.filter((item) => item.existsInCart);
    const total = result.reduce((acc, cv) => acc + cv.cartQuantity, 0);
    return total;
  }

  return (
    <div>
      <nav className="nav-wrapper-3">
        <div className="logoAndList-wrapper">
          <Link to="/" className="styled">
            <div className="brand">LOGO.</div>
          </Link>
          <div className="list-centered">
            <ul className="list-items-flex list-non-bullet" id="list-addon-3">
              <NavLink to="productsListingPage" className="styled" activeClassName="active-page">
                <li className="all-products">Products</li>
              </NavLink>
            </ul>
          </div>
        </div>
        <Searchbar searchText={searchText} setSearchText={setSearchText} />

        <div>
          <ul className="list-items-flex list-non-bullet">
            <li>
              <Link to="wishlist">
                <button className="btn-icon btn-icon-hover">
                  <i className="far fa-heart"></i>
                </button>
              </Link>
            </li>
            <li>
              <Link to="cart">
                <button
                  onClick={() =>
                    dispatch({ type: "SET_ROUTE", payload: "cart" })
                  }
                  className="btn-icon btn-icon-hover relative-positioned"
                >
                  <span className="badge-on-icon">
                    {totalCartItems(cartItems)}
                  </span>
                  <i className="fas fa-shopping-cart"></i>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
