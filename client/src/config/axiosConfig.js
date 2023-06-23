import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_PROD
    ? "http://18.233.100.220:8080/api"
    : "http://localhost:5173/api", // Replace with your desired base URL
});

export default instance;
