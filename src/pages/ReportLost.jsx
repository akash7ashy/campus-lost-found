import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import "../styles/ReportLost.css";

function ReportLost({ setItems }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
  });

  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newItem = {
    id: Date.now(),
    title: formData.title,
    category: formData.category,
    location: formData.location,
    status: "Lost",
    image:
      image ||
      "https://via.placeholder.com/300x200?text=No+Image",
  };

  try {
    const response = await fetch(
      "http://localhost:5000/items",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    );

    const data = await response.json();

    console.log("Server Response:", data);

    // Keep updating React state for now
    setItems((prevItems) => [...prevItems, newItem]);

    navigate("/home");
  } catch (error) {
    console.error("Error sending item:", error);
  }
};

  return (
    <>
      <Navbar />

      <div className="report-container">
        <div className="report-card">
          <div className="report-header">
            <h1>Report Lost Item</h1>
            <p>
              Help us locate and recover your lost belongings across campus.
            </p>
          </div>

          <form
            className="report-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter item name"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Electronics, Documents, Accessories..."
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Where did you lose it?"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {image && (
              <div className="image-preview">
                <img
                  src={image}
                  alt="Preview"
                />
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ReportLost;