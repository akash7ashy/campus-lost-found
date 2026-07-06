import ItemCard from "./ItemCard";

function SearchResults({ items }) {

  return (

    <div className="results-container">

      <div className="results-header">

        <h2>Recently Reported Items</h2>

        <span className="result-count">

          {items.length} Items Found

        </span>

      </div>

      <div className="results-grid">

        {items.map((item) => (

          <ItemCard
            key={item.id}
            item={item}
          />

        ))}

      </div>

    </div>

  );
}

export default SearchResults;