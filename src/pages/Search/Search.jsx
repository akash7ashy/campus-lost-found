import { useState } from "react";
import "./Search.css";
import itemsData from "./data";

import SearchHero from "./components/SearchHero";
import SearchBar from "./components/SearchBar";
import SearchFilter from "./components/SearchFilter";
import SortDropdown from "./components/SortDropdown";
import SearchResults from "./components/SearchResults";
import FooterQuote from "./components/FooterQuote";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Latest");

  let filteredItems = itemsData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      item.status === filter ||
      item.category === filter;

    return matchesSearch && matchesFilter;
  });

  if (sort === "Oldest") {
    filteredItems = [...filteredItems].reverse();
  }

  return (
    <div className="search-page">
      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>

      <SearchHero />

      <section className="search-section">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="filter-sort-container">

          <SearchFilter
            filter={filter}
            setFilter={setFilter}
          />

          <SortDropdown
            sort={sort}
            setSort={setSort}
          />

        </div>

      </section>

      <section className="results-section">

        <SearchResults
          items={filteredItems}
        />

      </section>

      <FooterQuote />

    </div>
  );
}

export default Search;