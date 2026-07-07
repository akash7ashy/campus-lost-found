import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
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

    setItems((prevItems) => [...prevItems, newItem]);

    navigate("/home");
  };

  return (
    <div className="report-container">
      <h1>Report Lost Item</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Name</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {image && (
          <div>
            <img
              src={image}
              alt="Preview"
              width="200"
            />
          </div>
        )}

        <button type="submit">
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default ReportLost;