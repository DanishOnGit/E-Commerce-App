import { useCart } from "../Contexts";
import { SortAndFilter } from "./SortAndFilter";
import { Toast } from "./Toast";
import { ProductCard } from "./ProductCard";
import { Searchbar } from "./Searchbar";

export const ProductsListingPage = ({ productsList, searchText,setSearchText }) => {
  const {
    state: {
      showFullInventory,
      showFastDeliveryOnly,
      sortBy,
      priceRangeControl,
      filterBy
    }
  } = useCart();

  function getSortedData(productList, sortBy) {
    if (sortBy === "PRICE_LOW_TO_HIGH") {
      return [...productList].sort(
        (product1, product2) =>
          Math.floor(
            Number(product1.price) -
              (Number(product1.price) * Number(product1.discount)) / 100
          ) -
          Math.floor(
            Number(product2.price) -
              (Number(product2.price) * Number(product2.discount)) / 100
          )
      );
    }

    if (sortBy === "PRICE_HIGH_TO_LOW") {
      return [...productList].sort(
        (product1, product2) =>
          Math.floor(
            Number(product2.price) -
              (Number(product2.price) * Number(product2.discount)) / 100
          ) -
          Math.floor(
            Number(product1.price) -
              (Number(product1.price) * Number(product1.discount)) / 100
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
      .filter(item=>(filterBy.categories.length!==0 ? filterBy.categories.includes(item.category):true))
      .filter((item) => item.price <= Number(priceRangeControl))
      .filter((item) => (searchText ? ((item.brand.includes(searchText.charAt(0).toUpperCase()))||(item.category.includes(searchText))) : item));
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
      {/* <Searchbar searchText={searchText} setSearchText={setSearchText} /> */}
      <h1 className="product-listing-page-header centered">
        All Products ({totalNumberOfProducts(productsList)})
      </h1>
      <div className="product-listing-page-wrapper">
        <SortAndFilter />
        <div className="display-grid-2-2">
          {filteredData.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};
