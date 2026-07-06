import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/ReportLost.css";

function ReportFound({ setItems }) {
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
      status: "Found",
      image: image || "https://via.placeholder.com/300x200?text=No+Image",
    };

    setItems((prev) => [...prev, newItem]);

    navigate("/home");
  };

  return (
    <>
      <Navbar />

      <div className="report-container">
        <div className="report-card">
          <div className="report-header">
            <h1>Report Found Item</h1>
            <p>Help students identify and claim found belongings.</p>
          </div>

          <form className="report-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
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
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            {image && (
              <div className="image-preview">
                <img src={image} alt="preview" />
              </div>
            )}

            <button type="submit" className="submit-btn">
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ReportFound;