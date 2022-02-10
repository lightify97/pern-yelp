import { subnetMatch } from "ipaddr.js";
import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { Restaurants } from "../context/Restaurants";

const AddRestaurant = () => {
  const { addRestaurant } = useContext(Restaurants);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sumbitResponse = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      addRestaurant(sumbitResponse.data.data.restaurant);
      setName("");
      setLocation("");
      setPriceRange("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <form
        action=""
        className="flex md:flex-row mx-5 md:mx-3 flex-col space-between items-center"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Restaurant Name"
          type="text"
          name="restaurant-name"
          id="r-name"
          className="focus:ring-1 focus:ring-gray-800 ml-2 bg-gray-100 shadow-sm shadow-gray-500/50 w-full rounded-lg  border-none mt-3"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Restaurant Location"
          type="text"
          name="restaurant-name"
          id="r-location"
          className="focus:ring-1 focus:ring-gray-800 ml-2 bg-gray-100 shadow-sm shadow-gray-500/50 w-full rounded-lg  border-none mt-3"
        />
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          placeholder="Price range"
          name="price-range"
          id="range"
          className="focus:ring-1 focus:ring-gray-800 ml-2 bg-gray-100 shadow-sm shadow-gray-500/50 rounded-lg  border-none md:w-60 w-full mt-3"
        >
          <option selected>Price Range</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
          <option value="5">$$$$$</option>
        </select>
        <button
          onClick={handleSubmit}
          type="submit"
          className="
         ml-2 px-5 py-2 bg-gray-800 shadow-lg shadow-gray-800/80 text-gray-100 rounded mt-3"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
