import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { Restaurants } from "../context/Restaurants";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const { updateRestaurant } = useContext(Restaurants);
  const [restaurant, setRestaurant] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        const res = response.data.data.restaurant;
        setRestaurant(res);
        setName(res.name);
        setLocation(res.location);
        setPriceRange(res.price_range);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRestaurant();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      updateRestaurant(id, name, location, priceRange);
    } catch (error) {
      console.log(error);
    }
  };

  if (restaurant) {
    return (
      <div>
        <h1 className="mt-12 text-gray font-black text-center antialiased text-3xl md:text-5xl">
          {restaurant.name}
        </h1>
        <form
          action=""
          className="flex flex-col items-center mx-3 md:mx-0 mt-12"
        >
          <input
            className="focus:ring-1 focus:ring-gray-800 ml-2 bg-gray-100 shadow-sm shadow-gray-500/50 rounded-lg  border-none md:w-2/4 w-full mt-3"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="focus:ring-1 focus:ring-gray-800 ml-2 bg-gray-100 shadow-sm shadow-gray-500/50 rounded-lg  border-none md:w-2/4 w-full mt-3"
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            className="focus:ring-1 focus:ring-gray-800 ml-2 bg-gray-100 shadow-sm shadow-gray-500/50 rounded-lg  border-none md:w-2/4 w-full   mt-3"
            min={1}
            max={5}
            type="number"
            name="priceRange"
            id="priceRange"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            type="submit"
            className="mt-4 ml-6 p-2 bg-gray-800 shadow-lg shadow-gray-800/80 text-gray-100 rounded"
          >
            <Link to={"/"}>Update</Link>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="text-center text-red-500 text-xl">
      No Restaurant Found with ID: {id}
    </div>
  );
};

export default UpdateRestaurant;
