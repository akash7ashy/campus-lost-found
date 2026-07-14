import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import Search from "./pages/Search";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
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
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={<Home items={items} />}
      />

      <Route
        path="/report-lost"
        element={<ReportLost setItems={setItems} />}
      />

      <Route
        path="/report-found"
        element={<ReportFound setItems={setItems} />}
      />

      <Route
        path="/search"
        element={<Search items={items} />}
      />

      <Route
        path="/admin"
        element={<AdminDashboard />}
      />
    </Routes>
  );
}

export default App;