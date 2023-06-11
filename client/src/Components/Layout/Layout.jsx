import classes from "./Layout.module.scss";
import SwipeSection from "../SwipeSection/SwipeSection";
import { useForm } from "react-hook-form";
import axios from "../../config/axiosConfig.js";
import { useState, useEffect } from "react";

const Layout = () => {
  // const schema = Yup.object().shape({
  //   inputField: Yup.string()
  //     .max(30, "Input cannot exceed 30 characters")
  //     .required("Input is required"),
  // });
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("/appuser/getLastUser").then((res) => {
      setName(res.data.name);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5173/api/appuser/add", {
        name: data.inputField,
      });
      console.log("Data sent to the backend:", data);
      setName(data.inputField);
      // Reset the form if needed
    } catch (error) {
      console.log("Error sending data to the backend:", error);
    }
  };

  return (
    <div className={classes.Layout}>
      <div className={classes.FormBox}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className={errors.inputField ? classes.error : ""}
            {...register("inputField", {
              required: "First name is required",
              maxLength: {
                value: 15,
                message: "Max length exceeded",
              },
            })}
          />
          {errors.inputField && (
            <p className={classes.errorMessage}>{errors.inputField?.message}</p>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
      <SwipeSection userName={name} />
      <div className={classes.FormBox2}></div>
    </div>
  );
};

export default Layout;

// {errors.inputField && (
//   <p className={classes.errorMessage}>{errors.inputField.message}</p>
// )}
