import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/AdminDashboard.css";
import API_URL from "../config";
function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    lostPosts: 0,
    foundPosts: 0,
    resolvedPosts: 0,
  });
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
            const token =
              localStorage.getItem("token");

            const usersResponse = await fetch(
               `${API_URL}/users`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

      const users =
        await usersResponse.json();
      setUsers(users);

      const itemsResponse = await fetch(
        `${API_URL}/items`
      );

      const items =
        await itemsResponse.json();

      setPosts(items);

      setStats({
        totalUsers: users.length,

        totalPosts: items.length,

        lostPosts: items.filter(
          (item) =>
            item.status === "Lost"
        ).length,

        foundPosts: items.filter(
          (item) =>
            item.status === "Found"
        ).length,

        resolvedPosts: items.filter(
          (item) =>
            item.status === "Resolved"
        ).length,
      });
    } catch (error) {
      console.error(error);
    }
  };

// this function is use to make the user to admin
  const handleMakeAdmin =
  async (userId) => {
    try {
          const token =
            localStorage.getItem("token");

          await fetch(
            `${API_URL}/users/${userId}/make-admin`,
            {
              method: "PUT",
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

      fetchDashboardData();

    } catch (error) {
      console.error(error);
    }
  };


// it is used to delete the user via the admin
const handleDeleteUser =
  async (userId) => {
    try {

      const token =
        localStorage.getItem("token");

      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete)
        return;

      await fetch(
        `${API_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchDashboardData();

    } catch (error) {
      console.error(error);
    }
  };

// it is used to delete the post by  admin 
  const handleDeletePost = async (postId) => {
  try {
    const token =
      localStorage.getItem("token");

    const confirmDelete =
      window.confirm(
        "Delete this post?"
      );

    if (!confirmDelete) return;

    await fetch(
      `${API_URL}/items/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchDashboardData();

  } catch (error) {
    console.error(error);
  }
};

// it allow admin to mark the post as resolved 
const handleResolvePost =
  async (postId) => {
    try {
      const token =
        localStorage.getItem("token");

      await fetch(
        `${API_URL}/items/${postId}/resolve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchDashboardData();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h2>Admin Dashboard</h2>

        <div className="stats-grid">

          <div className="stat-card users">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="stat-card total">
            <h3>Total Posts</h3>
            <p>{stats.totalPosts}</p>
          </div>

          <div className="stat-card lost">
            <h3>Lost Posts</h3>
            <p>{stats.lostPosts}</p>
          </div>

          <div className="stat-card found">
            <h3>Found Posts</h3>
            <p>{stats.foundPosts}</p>
          </div>

          <div className="stat-card resolved">
            <h3>Resolved Posts</h3>
            <p>{stats.resolvedPosts}</p>
          </div>

        </div>
        <h3 className="users-heading">
  Manage Users
</h3>

<table className="users-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>

        <td>{user.email}</td>

        <td>{user.role}</td>

        <td>
        <div className="action-buttons">

            {user.role !== "admin" && (
                <button
                  className="admin-btn"
                  onClick={() =>
                    handleMakeAdmin(
                      user._id
                    )
                  }
                >
                  Make Admin
                </button>
            )}

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteUser(
                            user._id
                          )
                        }
                      >
                        Delete
                      </button>

        </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>



<h3 className="posts-heading">
  Manage Posts
</h3>

<table className="posts-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Category</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {posts.map((post) => (
      <tr key={post._id}>
        <td>{post.title}</td>

        <td>{post.category}</td>

        <td>{post.status}</td>

        <td>
          <div className="action-buttons">

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDeletePost(post._id)
                  }
                >
                  Delete
                </button>
                  {post.status !== "Resolved" && (
                    <button
                      className="resolve-btn"
                      onClick={() =>
                        handleResolvePost(
                          post._id
                        )
                      }
                    >
                      Resolve
                    </button>
                  )}

          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      </div>

    </>
  );
}

export default AdminDashboard;