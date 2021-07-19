export const Searchbar = ({ searchText, setSearchText }) => {
  return (
    <div className="search-wrapper mobile-search">
      <input
        className="search-wrapper_input"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Search items..."
      />
    </div>
  );
};
