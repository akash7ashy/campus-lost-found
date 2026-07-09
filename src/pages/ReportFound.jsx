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
    email: "",
    mobile: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = new FormData();

    form.append("title", formData.title);
    form.append("category", formData.category);
    form.append("location", formData.location);
    form.append("email", formData.email);
    form.append("mobile", formData.mobile);
    form.append("status", "Found");

    if (image) {
      form.append("image", image);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/items",
        {
          method: "POST",
          headers: {
        Authorization: `Bearer ${token}`,
      },
          body: form,
        }
      );

      const data = await response.json();

      console.log("Server Response:", data);

      if (response.ok) {
        setItems((prevItems) => [...prevItems, data.item]);
        navigate("/home");
      }
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
            <h1>Report Found Item</h1>
            <p>
              Help students identify and claim found belongings.
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
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
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

            {preview && (
              <div className="image-preview">
                <img
                  src={preview}
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

export default ReportFound;







/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/ReportLost.css";

function ReportFound({ setItems }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    email:"",
    mobile:"",
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
    email: formData.email,
    mobile: formData.mobile,
    status: "Found",
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
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>


              <div className="form-group">
                <label>Mobile Number</label>

                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
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

export default ReportFound;*/