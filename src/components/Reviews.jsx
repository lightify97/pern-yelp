import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { Restaurants, RestaurantsProvider } from "../context/Restaurants";
import StarRating from "./StarRating";

const Reviews = ({ restaurantReviews }) => {
  const { reviews, setReviews } = useContext(Restaurants);

  setReviews(restaurantReviews);

  return (
    <div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4 ">
          {reviews.map((review) => {
            return (
              <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <article className="overflow-hidden rounded-lg shadow-xl ">
                  <header className="bg-sky-500 shadow-xl shadow-sky-700/70 text-white flex items-center leading-tight p-2 md:p-4">
                    <i className=" text-4xl fas fa-feather-alt"></i>
                    <p className="text-xl text-left ml-3">
                      {review.review}
                      <span className="block text-gray-900 text-sm mt-2">
                        {review.review_date.slice(0, 10)}
                      </span>
                    </p>
                  </header>

                  <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <span className="flex items-center no-underline hover:underline text-black">
                      <img
                        alt="Placeholder"
                        className="block rounded-full"
                        src="https://picsum.photos/32/32/?random"
                      />
                      <p className="font-medium ml-2 text-sm">{review.name}</p>
                    </span>
                    <span className="no-underline text-grey-darker hover:text-red-dark">
                      <StarRating rating={review.rating} />
                    </span>
                  </footer>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
