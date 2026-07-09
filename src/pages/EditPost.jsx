import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/ReportLost.css";
import API_URL from "../config";
function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      category: "",
      location: "",
      email: "",
      mobile: "",
    });

  const [image, setImage] =
    useState(null);

  const [previewImage, setPreviewImage] =
    useState("");

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await fetch(
        `${API_URL}/items`
      );

      const data =
        await response.json();

      const item = data.find(
        (item) => item._id === id
      );

      if (item) {
        setFormData({
          title: item.title,
          category: item.category,
          location: item.location,
          email: item.email,
          mobile: item.mobile,
        });

        setPreviewImage(item.image);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file =
      e.target.files[0];

    if (file) {
      setImage(file);

      setPreviewImage(
        URL.createObjectURL(file)
      );
    }
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const form =
        new FormData();

      form.append(
        "title",
        formData.title
      );

      form.append(
        "category",
        formData.category
      );

      form.append(
        "location",
        formData.location
      );

      form.append(
        "email",
        formData.email
      );

      form.append(
        "mobile",
        formData.mobile
      );

      if (image) {
        form.append(
          "image",
          image
        );
      }

      const response =
        await fetch(
          `${API_URL}/items/${id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: form,
          }
        );

      const data =
        await response.json();

      console.log(data);

      navigate("/myposts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="report-container">
        <div className="report-card">
          <div className="report-header">
            <h1>Edit Post</h1>

            <p>
              Update your item
              details.
            </p>
          </div>

          <form
            className="report-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label>
                Item Name
              </label>

              <input
                type="text"
                name="title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="form-group">
              <label>
                Category
              </label>

              <input
                type="text"
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="form-group">
              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                value={
                  formData.location
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="form-group">
              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="form-group">
              <label>
                Mobile Number
              </label>

              <input
                type="text"
                name="mobile"
                value={
                  formData.mobile
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="form-group">
              <label>
                Update Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
              />
            </div>

            {previewImage && (
              <div className="image-preview">
                <img
                  src={
                    previewImage
                  }
                  alt="Preview"
                />
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
            >
              Update Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPost;