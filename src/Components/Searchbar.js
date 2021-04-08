export const Searchbar = ({searchText,setSearchText}) => {
  return (
    <div className="search-wrapper">
      <input className="search-wrapper_input" value={searchText} onChange={(e)=>setSearchText(e.target.value)} type="text" placeholder="Search items..." />
      <span>
        {/* <i className="fas fa-search"></i> */}
      </span>
    </div>
  );
};
