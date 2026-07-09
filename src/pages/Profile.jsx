import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Profile.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
function Profile() {
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    totalPosts: 0,
    lostPosts: 0,
    foundPosts: 0,
    resolvedPosts: 0,
  });

const chartData = [
  {
    name: "Lost",
    count: stats.lostPosts,
    fill: "#DF9C8B",
  },
  {
    name: "Found",
    count: stats.foundPosts,
    fill: "#558E81",
  },
  {
    name: "Resolved",
    count: stats.resolvedPosts,
    fill: "#15803D",
  },
];

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const loggedUser = JSON.parse(
        localStorage.getItem("user")
      );

      setUser(loggedUser);

      const response = await fetch(
        "http://localhost:5000/items"
      );

      const items = await response.json();

      const myItems = items.filter(
        (item) =>
          item.userId === loggedUser.id
      );

      setStats({
        totalPosts: myItems.length,

        lostPosts: myItems.filter(
          (item) => item.status === "Lost"
        ).length,

        foundPosts: myItems.filter(
          (item) => item.status === "Found"
        ).length,

        resolvedPosts: myItems.filter(
          (item) =>
            item.status === "Resolved"
        ).length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">

          <h2>My Profile</h2>

          {user && (
            <>
              <div className="user-info">
                <p>
                  <strong>Name:</strong>{" "}
                  {user.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {user.email}
                </p>

                <p>
                  <strong>Role:</strong>{" "}
                  {user.role}
                </p>
              </div>

              <hr />

              <h3>Activity Summary</h3>

              <div className="stats-grid">

                <div className="stat-card">
                  <h4>Total Posts</h4>
                  <p>{stats.totalPosts}</p>
                </div>

                <div className="stat-card">
                  <h4>Lost Posts</h4>
                  <p>{stats.lostPosts}</p>
                </div>

                <div className="stat-card">
                  <h4>Found Posts</h4>
                  <p>{stats.foundPosts}</p>
                </div>

                <div className="stat-card">
                  <h4>Resolved Posts</h4>
                  <p>{stats.resolvedPosts}</p>
                </div>

              </div>


              <h3>Posts Overview</h3>

                <div className="chart-container">
                <ResponsiveContainer
                    width="100%"
                    height={300}
                >
                    <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.fill}
                        />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
                </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;