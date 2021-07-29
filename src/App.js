import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { PrivateRoute } from "./PrivateRoute";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import {
  Navbar,
  Homepage,
  ProductsListingPage,
  ProductPage,
  Login,
  Signup,
  PageNotFound,
  Cart,
  Wishlist,
  Profile,
} from "./Components";
import { useCart } from "./Contexts/CartContext";
import { API_URL } from "./utilities";
import { useAuth } from "./Contexts";


export default function App() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchText, setSearchText] = useState("");

  const {
    state: { productsList },
    dispatch,
  } = useCart();

  const { userToken } = useAuth();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/productsListingPage`);
        dispatch({ type: "GET_PRODUCTSLIST", payload: response.data.products });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrorMsg("failed to load data... Please refresh the page!");
        console.log(err);
      }
    })();

    if (userToken) {
      (async function () {
        try {
          const response = await axios({
            method: "GET",
            url: `${API_URL}/address`,
            
          });

          dispatch({
            type: "GET_ALL_ADDRESSES",
            payload: response.data.addresses,
          });
        } catch (error) {
          console.log(error);
        }
      })();

      (async function () {
        try {
          const response = await axios({
            method: "GET",
            url: `${API_URL}/wishlist`,
            
          });

          dispatch({
            type: "GET_WISHLIST_ITEMS",
            payload: response.data.wishlistItems,
          });
        } catch (err) {
          console.log(err);
        }
      })();
      (async function () {
        try {
          const response = await axios({
            method: "GET",
            url: `${API_URL}/cart`,
            
          });

          dispatch({
            type: "GET_CART_ITEMS",
            payload: response.data.cartItems,
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [userToken]);

  return (
    <div className="App">
      <Navbar searchText={searchText} setSearchText={setSearchText} />
<div className="spacer-mobile"></div>
      {loading ? (
        <Loader type="ThreeDots" color="#fc452e" height={80} width={80} />
      ) : (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="productsListingPage"
            element={
              <ProductsListingPage
                loading={loading}
                setLoading={setLoading}
                productsList={productsList}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
                searchText={searchText}
                setSearchText={setSearchText}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/wishlist" element={<Wishlist />} />
          <PrivateRoute path="/profile" element={<Profile />} />
          {/* <PrivateRoute path="/address" element={<Address />} /> */}
          <Route
            path="/productsListingPage/product/:itemId"
            element={<ProductPage />}
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
}
