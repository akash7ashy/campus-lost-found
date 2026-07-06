import { ArrowDownWideNarrow } from "lucide-react";

function SortDropdown({ sort, setSort }) {
  return (
    <div className="sort-wrapper">

      <div className="sort-box">

        <ArrowDownWideNarrow size={18} />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >

          <option>Latest</option>

          <option>Oldest</option>

        </select>

      </div>

    </div>
  );
}

export default SortDropdown;