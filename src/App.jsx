//import { useState } from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import Search from "./pages/Search";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
//import lostItems from "./data/lostItems";

function App() {
  //const [items, setItems] = useState(lostItems);
  const [items, setItems] = useState([]);
  useEffect(() => {
  fetch("http://localhost:5000/items")
    .then((res) => res.json())
    .then((data) => setItems(data))
    .catch((error) =>
      console.error("Error fetching items:", error)
    );
}, []);

  return (
   <BrowserRouter>
  <Routes>

    {/* Public Routes */}
    <Route path="/" element={<Login />} />

    <Route path="/register" element={<Register />} />

    {/* Protected Routes */}
    <Route
      path="/home"
      element={
        <ProtectedRoute>
          <Home items={items} />
        </ProtectedRoute>
      }
    />

    <Route
      path="/report-lost"
      element={
        <ProtectedRoute>
          <ReportLost setItems={setItems} />
        </ProtectedRoute>
      }
    />

    <Route
      path="/report-found"
      element={
        <ProtectedRoute>
          <ReportFound setItems={setItems} />
        </ProtectedRoute>
      }
    />

    <Route
      path="/search"
      element={
        <ProtectedRoute>
          <Search items={items} />
        </ProtectedRoute>
      }
    />

    <Route
  path="/myposts"
  element={
    <ProtectedRoute>
      <MyPosts />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-post/:id"
  element={
    <ProtectedRoute>
      <EditPost />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={<Profile />}
/>


<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
  </Routes>
</BrowserRouter>
  );
}

export default App;