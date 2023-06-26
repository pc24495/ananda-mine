import axios from "axios";

// console.log(
//   "import.meta.env.VITE_REACT_APP_PROD",
//   import.meta.env.VITE_REACT_APP_PROD
// );

// const instance = axios.create({
//   baseURL:
//     import.meta.env.VITE_REACT_APP_PROD === "true"
//       ? "http://www.anandamine.com/api"
//       : "http://localhost:5173/api", // Replace with your desired base URL
// });

const instance = axios.create({
  baseURL: "http://www.anandamine.com/api",
});

// const instance = axios.create({ baseURL: "http://localhost:5173/api" });
export default instance;
