import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://blog-backend-ewga.onrender.com/api"
      : "http://localhost:5000/api",
  withCredentials: true,
});

export default API;
