import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="search-wrapper">
      <div className="search-box">

        <div className="search-input">
          <Search size={20} className="search-icon" />

          <input
            type="text"
            placeholder="Search wallet, ID card, calculator..."
          />
        </div>

        <button className="search-btn">
          Search
        </button>

      </div>
    </div>
  );
};

export default SearchBar;