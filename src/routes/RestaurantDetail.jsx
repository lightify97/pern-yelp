import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { Header } from "../components";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { Restaurants } from "../context/Restaurants";

const RestaurantDetail = (props) => {
  const { selectedRestaurant, setSelectedRestaurant } = useContext(Restaurants);
  const { reviews, setReviews } = useContext(Restaurants);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setReviews(response.data.data.reviews);
        setSelectedRestaurant(response.data.data.restaurant);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Header message={selectedRestaurant.name || "Details"} />
      <Reviews restaurantReviews={reviews} />
      <AddReview id={id} />
    </>
  );
};

export default RestaurantDetail;
