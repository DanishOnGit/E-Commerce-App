import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import "./styles.css";
// import Loader from "react-loader-spinner";
import {
  Navbar,
  Homepage,
  ProductsListingPage,
  Cart,
  Wishlist
} from "./Components";
import { useCart } from "./Contexts/CartContext";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchText,setSearchText]=useState("")

  const {
    state: { productsList },
    dispatch
  } = useCart();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get("./api/products");
        dispatch({ type: "GET_PRODUCTSLIST", payload: response.data.products });
        // setProductsList(response.data.products);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrorMsg("failed to load data... Please refresh the page!");
        console.log(err);
      }
    })();
    (async function () {
      try {
        const response = await axios.get("./api/wishlistItems");
        console.log(response);
        dispatch({
          type: "GET_WISHLIST_ITEMS",
          payload: response.data.wishlistItems
        });
      } catch (err) {
        console.log(err);
      }
    })();
    (async function () {
      try {
        const response = await axios.get("./api/cartItems");
        dispatch({ type: "GET_CART_ITEMS", payload: response.data.cartItems });
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  return (
    <div className="App">
      <Navbar searchText={searchText} setSearchText={setSearchText} />
{/* 
      {loading && (
        <Loader type="ThreeDots" color="#fc452e" height={80} width={80} />
      )} */}
  
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
              searchText={searchText} setSearchText={setSearchText}
            />
          }
        />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}
