import ItemCard from "../components/ItemCard";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

function Home({ items }) {
  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* HERO SECTION */}
        <div className="hero-section">
          <h1>Campus Lost & Found</h1>

          <p>
            Helping students recover lost belongings quickly and securely
            across campus.
          </p>
        </div>

        {/* STATS SECTION */}
        <div className="stats-section">
          <div className="stat-card">
            <h2>145</h2>
            <p>Lost Items</p>
          </div>

          <div className="stat-card">
            <h2>98</h2>
            <p>Found Items</p>
          </div>

          <div className="stat-card">
            <h2>76</h2>
            <p>Resolved Cases</p>
          </div>

          <div className="stat-card">
            <h2>520</h2>
            <p>Users</p>
          </div>
        </div>

        {/* RECENT ITEMS */}
        <div className="items-section">
          <h2 className="section-title">Recent Items</h2>

          <div className="item-grid">
            {items.map((item) => (
              <ItemCard
                key={item._id}
                title={item.title}
                category={item.category}
                location={item.location}
                status={item.status}
                image={item.image}
                email={item.email}
                mobile={item.mobile}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;