import { useState, useEffect } from "react";
import axios from "axios";
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
  Wishlist
} from "./Components";
import { useCart } from "./Contexts/CartContext";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchText, setSearchText] = useState("");

  const {
    state: { productsList },
    dispatch
  } = useCart();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://Badminton-ecomm.danishahmed27.repl.co/productsListingPage"
        );
        dispatch({ type: "GET_PRODUCTSLIST", payload: response.data.products });

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrorMsg("failed to load data... Please refresh the page!");
        console.log(err);
      }
    })();
    (async function () {
      try {
        const response = await axios.get(
          "https://Badminton-ecomm.danishahmed27.repl.co/wishlist"
        );

        dispatch({
          type: "GET_WISHLIST_ITEMS",
          payload: response.data.wishlistItem1.wishlistItems
        });
      } catch (err) {
        console.log(err);
      }
    })();
    (async function () {
      try {
        const response = await axios.get(
          "https://Badminton-ecomm.danishahmed27.repl.co/cart"
        );

        dispatch({
          type: "GET_CART_ITEMS",
          payload: response.data.cartItem1.cartItems
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Navbar searchText={searchText} setSearchText={setSearchText} />

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
        <Route
          path="/productsListingPage/product/:itemId"
          element={<ProductPage />}
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
