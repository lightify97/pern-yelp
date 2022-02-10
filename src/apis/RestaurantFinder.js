import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:4001/api/restaurants",
  baseURL: "https://yelp-97.herokuapp.com/api/restaurants",
});
