import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";

import lostItems from "./data/lostItems";

function App() {
  const [items, setItems] = useState(lostItems);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home items={items} />} />

        <Route
          path="/report-lost"
          element={<ReportLost setItems={setItems} />}
        />

        <Route
          path="/report-found"
          element={<ReportFound setItems={setItems} />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;