import { BrowserRouter, Routes, Route } from "react-router-dom";

import Search from "./pages/Search/Search";
import ItemDetails from "./pages/ItemDetails/ItemDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Search />}
        />

        <Route
          path="/item/:id"
          element={<ItemDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;