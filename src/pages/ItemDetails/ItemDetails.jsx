import "./ItemDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  User,
  Phone,
  Mail,
  Tag,
} from "lucide-react";

import items from "../Search/data";

function ItemDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = items.find((item) => item.id === Number(id));

  if (!item) {
    return (
      <div className="not-found">
        <h1>Item Not Found</h1>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">

      {/* Back Button */}

      <div className="top-bar">

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back to Search
        </button>

      </div>

      {/* Main Card */}

      <div className="details-container">

        {/* Left Side */}

        <div className="details-image">

          <img
            src={item.image}
            alt={item.title}
          />

        </div>

        {/* Right Side */}

        <div className="details-content">

          <span
            className={`status ${
              item.status === "Lost"
                ? "lost"
                : "found"
            }`}
          >
            {item.status}
          </span>

          <h1>{item.title}</h1>

          <p className="description">
            {item.description}
          </p>

          <div className="info-grid">

            <div className="info-card">

              <MapPin />

              <div>

                <h4>Location</h4>

                <p>{item.location}</p>

              </div>

            </div>

            <div className="info-card">

              <CalendarDays />

              <div>

                <h4>Date</h4>

                <p>{item.date}</p>

              </div>

            </div>

            <div className="info-card">

              <Tag />

              <div>

                <h4>Category</h4>

                <p>{item.category}</p>

              </div>

            </div>

            <div className="info-card">

              <User />

              <div>

                <h4>Owner</h4>

                <p>{item.owner}</p>

              </div>

            </div>

            <div className="info-card">

              <Phone />

              <div>

                <h4>Phone</h4>

                <p>{item.phone || "9876543210"}</p>

              </div>

            </div>

            <div className="info-card">

              <Mail />

              <div>

                <h4>Email</h4>

                <p>{item.email || "owner@gmail.com"}</p>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="buttons">

            <button className="contact-btn">
              Contact Owner
            </button>

            <button
              className="return-btn"
              onClick={() => navigate("/")}
            >
              Back to Search
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ItemDetails;