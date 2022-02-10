import "./index.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Update, RestaurantDetail } from "./routes";
import { RestaurantsProvider } from "./context/Restaurants";

const App = () => {
  return (
    <RestaurantsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          name="Detail"
          path="/api/restaurants/:id"
          element={<RestaurantDetail />}
        />
        <Route path="/api/restaurants/:id/update" element={<Update />} />
      </Routes>
    </RestaurantsProvider>
  );
};

export default App;
