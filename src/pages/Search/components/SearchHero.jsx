import { SearchCheck } from "lucide-react";

const SearchHero = () => {
  return (
    <section className="hero">

      <div className="hero-icon">
        <SearchCheck size={45}/>
      </div>

      <span className="hero-badge">
        Campus Lost & Found
      </span>

      <h1>
        Find What You Lost.
        <br/>
        Return What You Found.
      </h1>

      <p>
        Search thousands of reported items across the campus.
      </p>

    </section>
  );
};

export default SearchHero;