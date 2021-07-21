import { useCart } from "../Contexts";

export const SortAndFilterMobile = () => {
  const {
    state: {
      showFullInventory,
      showFastDeliveryOnly,
      sortBy,
      priceRangeControl,
      filterBy,
    },
    dispatch,
  } = useCart();
  const categories = ["Racket", "Shoes", "Bags"];
  return (
    <div className="show-in-mobile">

      <div className="child-1">
        <label for="check-sort" class="checkbtn-sort">
          <div className="mobile-sort-wrapper">Sort</div>
        </label>
        <input type="checkbox" id="check-sort" />

        <fieldset className="sort-fieldset">
          
          <ul className="list-non-bullet">
            <li>
              <label>
                <input
                  onChange={() => dispatch({ type: "PRICE_LOW_TO_HIGH" })}
                  type="radio"
                  name="sort"
                  checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
                />
                low to high
              </label>
            </li>
            <li>
              <label>
                <input
                  onChange={() => dispatch({ type: "PRICE_HIGH_TO_LOW" })}
                  type="radio"
                  name="sort"
                  checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
                />
                high to low
              </label>
            </li>
            <li>
              <label>
                price range
                <input
                  onChange={(e) => {
                    console.log(e.target.value);
                    dispatch({
                      type: "PRICE_RANGE_SORT",
                      payload: e.target.value,
                    });
                  }}
                  value={priceRangeControl}
                  type="range"
                  min="50"
                  max="5000"
                  step="10"
                />
              </label>
            </li>
          </ul>

          <br />
          <button
          className="btn btn-link"
          onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
        >
          Clear all filters
        </button>
        </fieldset>
        
      </div>

      <div className="child-2">
        <label for="check-filter" class="checkbtn-filter">
          <div className="mobile-filters-wrapper">Filters</div>
        </label>
        <input type="checkbox" id="check-filter" />

        <fieldset className="filters-fieldset">
         
          <h4 className="filter-heading">Availability</h4>
          <ul className="list-non-bullet">
            <li>
              <label>
                <input
                  onChange={() => dispatch({ type: "IN_STOCK_ONLY" })}
                  type="checkbox"
                  checked={showFullInventory}
                />
                Include out of stock
              </label>
            </li>
            <li>
              <label>
                <input
                  onChange={() => dispatch({ type: "FAST_DELIVERY_ONLY" })}
                  type="checkbox"
                  checked={showFastDeliveryOnly}
                />
                Fast-delivery only
              </label>
            </li>
          </ul>
          <h4 className="filter-heading">Category</h4>
          <ul className="list-non-bullet">
            {categories.map((category) => (
              <li>
                <label>
                  <input
                    onChange={() =>
                      dispatch({
                        type: "FILTER_BY_CATEGORY",
                        payload: category.toLowerCase(),
                      })
                    }
                    type="checkbox"
                    checked={filterBy.categories.includes(
                      category.toLowerCase()
                    )}
                  />
                  {category}
                </label>
              </li>
            ))}
          </ul>
          <br/>
          <button
          className="btn btn-link"
          onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
        >
          Clear all filters
        </button>
        </fieldset>
       
      </div>
   
    </div>
  );
};
