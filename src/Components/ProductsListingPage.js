import { useCart } from "../Contexts";
import { SortAndFilter } from "./SortAndFilter";
import { Toast } from "./Toast";
// import {wishlistHandler,addToCartHandler,checkIfAlreadyPresent} from "../utilities";
import { ProductCard } from "./ProductCard";

// import spinner from "../images/Spinner-3.gif";
// import {getFinalPrice} from "../utilities"

export const ProductsListingPage = ({ productsList, searchText }) => {
  const {
    state: {
      showFullInventory,
      showFastDeliveryOnly,
      sortBy,
      priceRangeControl
    }
  } = useCart();

  function getSortedData(productList, sortBy) {
    if (sortBy === "PRICE_LOW_TO_HIGH") {
      return [...productList].sort(
        (product1, product2) =>
          Math.floor(
            Number(product1.price) -
              (Number(product1.price) * Number(product1.offer)) / 100
          ) -
          Math.floor(
            Number(product2.price) -
              (Number(product2.price) * Number(product2.offer)) / 100
          )
      );
    }

    if (sortBy === "PRICE_HIGH_TO_LOW") {
      return [...productList].sort(
        (product1, product2) =>
          Math.floor(
            Number(product2.price) -
              (Number(product2.price) * Number(product2.offer)) / 100
          ) -
          Math.floor(
            Number(product1.price) -
              (Number(product1.price) * Number(product1.offer)) / 100
          )
      );
    }

    return productsList;
  }

  function getFilteredData(
    productList,
    showFastDeliveryOnly,
    showFullInventory,
    priceRangeControl,
    searchText
  ) {
    return productList
      .filter((item) => (showFullInventory ? true : item.inStock))
      .filter((item) => (showFastDeliveryOnly ? item.fastDelivery : true))
      .filter((item) => item.price <= Number(priceRangeControl))
      .filter((item) => (searchText ? item.brand.includes(searchText) : item));
  }

  const sortedData = getSortedData(productsList, sortBy);

  const filteredData = getFilteredData(
    sortedData,
    showFastDeliveryOnly,
    showFullInventory,
    priceRangeControl,
    searchText
  );

  function totalNumberOfProducts(productsList) {
    return productsList.length;
  }

  return (
    <div>
      <Toast />
      <h1 className="product-listing-page-header centered">
        All Products {totalNumberOfProducts(productsList)}
      </h1>
      <div className="product-listing-page-wrapper">
        <SortAndFilter />
        <div className="display-grid-2-2">
          {filteredData.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};
