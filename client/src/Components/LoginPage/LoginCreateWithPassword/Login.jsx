/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import {useForm} from 'react-hook-form';
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import classes from "./LoginCreateAccount.module.scss";
import axios from "../../../config/axiosConfig.js";
import { AuthContext } from "../../../App.jsx";
import { initialUserSetup } from "../../../../redux/slice";

const Login = (props) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    axios
      .post("/user/login-username-password", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        // console.log(response.data.username + " successfully logged in");
        console.log(response.data);
        const user = {
          name: response.data.name,
          id: response.data.id,
          username: response.data.username,
          token: response.data.token,
          pic1Url: response.data.pic1Url,
          birthday: response.data.birthday,
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(initialUserSetup({ ...user }));
        setIsAuthenticated(true);
      })
      .catch((error) => {
        const fieldErrors = error.response.data?.fieldErrors;
        if (fieldErrors.username) {
          setError("username", {
            type: "manual",
            message: fieldErrors.username,
          });
        } else if (fieldErrors.password) {
          setError("password", {
            type: "manual",
            message: fieldErrors.password,
          });
        } else {
          setError("password", {
            type: "manual",
            message: "Unknown error",
          });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.LoginCreate}>
      <div className={classes.InputContainer}>
        <label htmlFor="loginUsername">Username</label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="loginAccountUsername"
              autoComplete="Enter a username"
            />
          )}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div className={classes.InputContainer}>
        <label htmlFor="loginPassword">Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              type="password"
              {...field}
              id="loginPassword"
              autoComplete="Add a password"
            />
          )}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Log In</button>
      <p onClick={props.setCreateAccount}>
        Don&apos;t have an account? Click here to sign up
      </p>
    </form>
  );
};

export default Login;
