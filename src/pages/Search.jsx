import { useState } from "react";
import ItemCard from "../components/ItemCard";
import "../styles/Search.css";

function Search({ items }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredItems = items.filter((item) => {
    const matchName = item.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchStatus =
      statusFilter === "All" || item.status === statusFilter;

    const matchCategory =
      categoryFilter === "All" || item.category === categoryFilter;

    return matchName && matchStatus && matchCategory;
  });

  return (
    <div className="search-container">
      <h1>Search Items</h1>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search by item name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {/* STATUS FILTER */}
      <div className="filter-section">
        <h4>Status</h4>
        <div className="filter-buttons">
          <button onClick={() => setStatusFilter("All")}>All</button>
          <button onClick={() => setStatusFilter("Lost")}>Lost</button>
          <button onClick={() => setStatusFilter("Found")}>Found</button>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="filter-section">
        <h4>Category</h4>
        <div className="filter-buttons">
          <button onClick={() => setCategoryFilter("All")}>All</button>
          <button onClick={() => setCategoryFilter("Electronics")}>Electronics</button>
          <button onClick={() => setCategoryFilter("Documents")}>Documents</button>
          <button onClick={() => setCategoryFilter("Accessories")}>Accessories</button>
        </div>
      </div>

      {/* RESULTS */}
      <div className="item-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}

export default Search;