import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import API_URL from "../config";
function MyPosts() {
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        `${API_URL}/items`
      );

      const data = await response.json();

      const filteredItems = data.filter(
        (item) => item.userId === user.id
      );

      setMyItems(filteredItems);

    } catch (error) {
      console.error(error);
    }
  };
// used to delete the post 
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/items/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      setMyItems((prevItems) =>
        prevItems.filter(
          (item) => item._id !== id
        )
      );

    } catch (error) {
      console.error(error);
    }
  };


 /* // used to mark the post as a Resolved post
  const handleResolve = async (id) => {
  try {
    const token = localStorage.getItem(
      "token"
    );

    const response = await fetch(
      `http://localhost:5000/items/${id}/resolve`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);

    setMyItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              status: "Resolved",
            }
          : item
      )
    );

  } catch (error) {
    console.error(error);
  }
};*/

const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="home-container">
        <h2>My Posts</h2>

        <div className="item-grid">
          {myItems.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            myItems.map((item) => (
              <div key={item._id}>
                <ItemCard
                  title={item.title}
                  category={item.category}
                  location={item.location}
                  email={item.email}
                  mobile={item.mobile}
                  status={item.status}
                  image={item.image}
                />
                <button
                className="edit-btn"
                onClick={() =>
                  navigate(`/edit-post/${item._id}`)
                }
              >
                Edit
              </button>

                <button
                  className="deletee-btn"
                  onClick={() =>
                    handleDelete(item._id)
                  }
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MyPosts;