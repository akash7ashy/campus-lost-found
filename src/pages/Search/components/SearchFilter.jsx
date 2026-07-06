import {
  Grid2X2,
  SearchX,
  SearchCheck,
  Laptop,
  Wallet,
  IdCard,
} from "lucide-react";

function SearchFilter({ filter, setFilter }) {

  const filters = [
    { name: "All", icon: <Grid2X2 size={18} /> },
    { name: "Lost", icon: <SearchX size={18} /> },
    { name: "Found", icon: <SearchCheck size={18} /> },
    { name: "Electronics", icon: <Laptop size={18} /> },
    { name: "Accessories", icon: <Wallet size={18} /> },
    { name: "ID Cards", icon: <IdCard size={18} /> },
  ];

  return (
    <div className="filter-wrapper">

      {filters.map((item) => (

        <button
          key={item.name}
          className={
            filter === item.name
              ? "filter-chip active-chip"
              : "filter-chip"
          }
          onClick={() => setFilter(item.name)}
        >
          {item.icon}
          {item.name}
        </button>

      ))}

    </div>
  );
}

export default SearchFilter;