import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { Restaurants } from "../context/Restaurants";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants, averageReviews, setAverageReviews } =
    useContext(Restaurants);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
        setAverageReviews(response.data.data.ratings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const getRating = (id) => {
    if (averageReviews.length > 0) {
      for (let i = 0; i < averageReviews.length; i++) {
        if (averageReviews[i].restaurant_id === id) {
          return {
            rating: averageReviews[i].rating,
            reviews: averageReviews[i].reviews,
          };
        }
      }
    }
    return 0;
  };
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((el) => el.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const gotoRestaurant = (e, id) => {
    e.stopPropagation();
    navigate(`/api/restaurants/${id}`);
  };

  return (
    <div class="flex flex-col mt-3">
      <div class="overflow-x-auto shadow-md sm:rounded-lg mx-auto ">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden ">
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
              <thead className=" bg-gray-800 text-white">
                <tr className="text-xs md:text-lg text-left">
                  <th className="px-2 py-2 md:px-6 md:py-2">Restaurant</th>
                  <th className="px-2 py-2 md:px-6 md:py-2">Location</th>
                  <th className="px-2 py-2 md:px-6 md:py-1">Price Range</th>
                  <th className="px-2 py-2 md:px-6 md:py-1">Ratings</th>
                  <th className="px-2 py-2 md:px-6 md:py-1">Edit</th>
                  <th className="px-2 py-2 md:px-6 md:py-1">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {restaurants &&
                  restaurants.map((restaurant) => {
                    return (
                      <tr
                        className="hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-200 text-xs md:text-lg text-left"
                        key={restaurant.id}
                        onClick={(e) => gotoRestaurant(e, restaurant.id)}
                      >
                        <td className="px-2 py-2 md:px-6 md:py-2">
                          {restaurant.name}
                        </td>

                        <td className="px-2 py-2 md:px-6 md:py-2">
                          {restaurant.location}
                        </td>
                        <td className="px-2 py-2 md:px-6 md:py-2">
                          {"$".repeat(restaurant.price_range)}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 md:px-6 md:py-2">
                          <StarRating
                            rating={getRating(restaurant.id).rating}
                            reviews={getRating(restaurant.id).reviews}
                            showReviews={true}
                          />
                        </td>
                        <td className="px-2 py-2 md:px-6 md:py-2">
                          <Link
                            to={`/api/restaurants/${restaurant.id}/update`}
                            className="px-4 py-1 text-white bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="px-2 py-2 md:px-6 md:py-2">
                          <a
                            onClick={(e) => handleDelete(e, restaurant.id)}
                            className="px-4 py-1 text-white bg-red-500 shadow-lg shadow-red-500/50 rounded"
                            href="#"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
