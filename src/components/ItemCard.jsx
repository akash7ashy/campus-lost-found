import "../styles/ItemCard.css";

function ItemCard({
  title,
  category,
  location,
  email,
  mobile,
  status,
  image,
  
}) {
  return (
    <div className="item-card">

      {/* IMAGE SECTION */}
      <img
        src={image}
        alt={title}
        className="item-image"
      />


      {/* CONTENT */}
      <div className="item-content">

        <h3>{title}</h3>

        <p>
          <strong>Category:</strong> {category}
        </p>

        <p>
          <strong>Location:</strong> {location}
        </p>

        <p>
          <strong>Email:</strong> {email}
        </p>

        <p>
          <strong>Mobile:</strong> {mobile}
        </p>


        <span
          className={`status ${
            status === "Lost"
              ? "lost"
              : status === "Found"
              ? "found"
              : "resolved"
          }`}
        >
          {status}
        </span>

      </div>

    </div>
  );
}

export default ItemCard;


/*import "../styles/ItemCard.css";

function ItemCard({
  title,
  category,
  location,
  status,
  image,
}) {
  return (
    <div className="item-card">

      
    /*  <img
        src={image}
        alt={title}
        className="item-image"
      />

      
   /*      <div className="item-content">
        <h3>{title}</h3>

        <p>
          <strong>Category:</strong> {category}
        </p>

        <p>
          <strong>Location:</strong> {location}
        </p>

        <span
          className={
            status === "Lost"
              ? "status lost"
              : "status found"
          }
        >
          {status}
        </span>
        
      </div>
    </div>
  );
}

export default ItemCard;*/