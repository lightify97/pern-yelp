import React from "react";
import { AddRestaurant, Header, RestaurantList } from "../components";

const Home = () => {
  return (
    <div>
      <Header message="Restaurant Finder" />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
