import "./App.css";
import Layout from "./Components/Layout/Layout";
// import dotenv from "dotenv";

function App() {
  // dotenv.config();
  console.log(import.meta.env.VITE_REACT_APP_PROD);
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
