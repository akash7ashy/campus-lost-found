import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportLost from "./pages/ReportLost";
import AdminDashboard from "./pages/admin/AdminDashboard";

import lostItems from "./data/lostItems";

function App() {
  const [items, setItems] = useState(lostItems);

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
        path="/admin"
        element={<AdminDashboard />}
      />
    </Routes>
  );
}

export default App;