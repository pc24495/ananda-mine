import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5173/api", // Replace with your desired base URL
});

export default instance;
