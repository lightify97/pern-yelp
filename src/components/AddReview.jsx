import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { Restaurants } from "../context/Restaurants";

const AddReview = ({ id }) => {
  const { addReview, averageReviews, setAverageReviews, addAverageReview } =
    useContext(Restaurants);
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await RestaurantFinder.post(`/${id}`, {
        restaurant_id: id,
        userName: userName,
        rating: rating,
        review: review,
      });
      addReview(res.data.review);
      addAverageReview(id, res.data.rating);
      setUserName("");
      setRating("");
      setReview("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <form
        action=""
        className="flex flex-col space-between items-center mx-3 md:mx-0"
      >
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          name="userName"
          id="userName"
          value={userName}
          className=" focus:ring-1 focus:ring-gray-800 ml-2 bg-gray-100 shadow-sm shadow-gray-500/50 rounded-lg border-none md:w-2/4 w-full mt-3"
          placeholder="User Name"
        />
        <input
          onChange={(e) => setRating(e.target.value)}
          type="number"
          name="rating"
          id="rating"
          value={rating}
          min={0.0}
          step={0.1}
          max={5.0}
          className="focus:ring-1 focus:ring-gray-800 ml-2 bg-gray-100 shadow-sm shadow-gray-500/50 rounded-lg  border-none md:w-2/4 w-full mt-3"
          placeholder="Rating"
        />
        <textarea
          onChange={(e) => setReview(e.target.value)}
          name="review"
          id="review"
          value={review}
          className="focus:ring-1 focus:ring-gray-800 ml-2 bg-gray-100 shadow-sm shadow-gray-500/50 rounded-lg  border-none md:w-2/4 w-full mt-3"
          placeholder="Review"
        ></textarea>
        <button
          onClick={handleSubmit}
          type="submit"
          className="
         ml-2 px-5 py-2 bg-gray-800 shadow-lg shadow-gray-800/80 text-gray-100 rounded mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
