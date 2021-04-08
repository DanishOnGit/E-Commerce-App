import { useCart } from "../Contexts";

export function SortAndFilter() {
  const {
    state: { showFullInventory, showFastDeliveryOnly, sortBy,priceRangeControl },
    dispatch
  } = useCart();

  return (
    <div className="sort-filter-wrapper">
      <fieldset>
        <legend>Sort BY:</legend>
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
              dispatch({ type: "PRICE_RANGE_SORT", payload: e.target.value });
            }}
            value={priceRangeControl}
            type="range"
            min="50"
            max="1000"
            step="10"
          />
        </label>
          </li>
        </ul>
        
        
        <br />

        
      </fieldset>

      <fieldset>
        <legend>Filters:</legend>
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
        
      </fieldset>
      <br/>
      <button className="btn btn-link" onClick={() => dispatch({ type: "CLEAR_FILTERS" })}>
        Clear all filters
      </button>
    </div>
  );
}
