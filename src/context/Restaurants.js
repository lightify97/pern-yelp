import React, { useState, createContext } from "react";

export const Restaurants = createContext();

export const RestaurantsProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [averageReviews, setAverageReviews] = useState([]);

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  const addAverageReviews = (id, rating) => {
    for (let i = 0; i < averageReviews.length; i++) {
      if (id === averageReviews[i].restaurant_id) {
        averageReviews[i].reviews++;
        averageReviews[i].rating +=
          (rating - averageReviews[i].rating) / averageReviews[i].reviews;
      }
    }
    setAverageReviews(averageReviews);
  };

  const updateRestaurant = (id, name, location, priceRange) => {
    const idx = restaurants.findIndex((rest) => rest.id === id);
    restaurants[idx].name = name;
    restaurants[idx].location = location;
    restaurants[idx].price_range = priceRange;
    setRestaurants(restaurants);
  };

  return (
    <Restaurants.Provider
      value={{
        reviews,
        restaurants,
        selectedRestaurant,
        setRestaurants,
        addRestaurant,
        addReview,
        updateRestaurant,
        setSelectedRestaurant,
        setReviews,
        averageReviews,
        addAverageReviews,
        setAverageReviews,
      }}
    >
      {props.children}
    </Restaurants.Provider>
  );
};
