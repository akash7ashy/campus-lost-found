import {
  MapPin,
  CalendarDays,
  Heart,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function ItemCard({ item }) {

  const navigate = useNavigate();

  return (
    <div className="item-card">

      <div className="item-image">

        <img
          src={item.image}
          alt={item.title}
        />

        <button className="favorite-btn">
          <Heart size={18} />
        </button>

        <span
          className={`status-badge ${
            item.status === "Lost"
              ? "lost"
              : "found"
          }`}
        >
          {item.status}
        </span>

      </div>

      <div className="item-content">

        <span className="item-category">
          {item.category}
        </span>

        <h3>{item.title}</h3>

        <p className="item-description">
          {item.description}
        </p>

        <div className="item-info">

          <span>
            <MapPin size={16} />
            {item.location}
          </span>

          <span>
            <CalendarDays size={16} />
            {item.date}
          </span>

        </div>

        <button
          className="details-btn"
          onClick={() => navigate(`/item/${item.id}`)}
        >
          View Details

          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
}

export default ItemCard;