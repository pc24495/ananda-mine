import { useForm, Controller } from "react-hook-form";
import classes from "./LoginCreateAccount.module.scss";
import axios from "../../../config/axiosConfig.js";

const CreateAccount = () => {
  const {
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    axios
      .post("/user/create-account-username-password", {
        username: data.username,
        password: data.password,
        name: data.name,
      })
      .then((response) => {
        console.log(response.data.name + " successfully created");
      })
      .catch((error) => {
        console.log(error.response.data);
        const fieldErrors = error.response.data?.fieldErrors;
        console.log(fieldErrors);
        if (fieldErrors.username) {
          setError("username", {
            type: "manual",
            message: fieldErrors.username,
          });
        } else {
          setError("confirmPassword", {
            type: "manual",
            message: "Unknown error",
          });
        }
      });
    // console.log(data);
    // const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    // const testString = "i2T#r$jbrp6cWR5";

    // console.log(pattern.test(testString));
  };

  const validatePassword = () => {
    const password = watch("password", "");
    const confirmPassword = watch("confirmPassword", "");

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.LoginCreate}>
      <div className={classes.InputContainer}>
        <label htmlFor="createAccountUsername">Username</label>
        <Controller
          name="username"
          control={control}
          rules={{
            required: "Username is required",
            maxLength: {
              value: 20,
              message: "Username must be 20 characters or less",
            },
            pattern: {
              value: /^[A-Za-z0-9]+$/i,
              message: "Username can only contain letters and numbers",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="createAccountUsername"
              autoComplete="Add a username"
            />
          )}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div className={classes.InputContainer}>
        <label htmlFor="createAccountName">Name</label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Name is required",
            maxLength: {
              value: 20,
              message: "Name must be 20 characters or less",
            },
            pattern: {
              value: /^[A-Za-z0-9]+$/i,
              message: "Name can only contain letters and numbers",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="createAccountName"
              autoComplete="Add a name"
            />
          )}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className={classes.InputContainer}>
        <label htmlFor="createAccountPassword">Password</label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            validate: (value) => {
              let errors = [];
              if (!/[a-z]/.test(value))
                errors.push("at least one lowercase letter");
              if (!/[A-Z]/.test(value))
                errors.push("at least one uppercase letter");
              if (!/[0-9]/.test(value)) errors.push("at least one number");
              if (value.length < 8)
                errors.push("minimum length is 8 characters");

              return (
                errors.length === 0 ||
                "Password must contain " + errors.join(", ")
              );
            },
          }}
          render={({ field }) => (
            <input
              type="password"
              {...field}
              id="createAccountPassword"
              autoComplete="Add a password"
            />
          )}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div className={classes.InputContainer}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: "Confirm password is required" }}
          render={({ field }) => (
            <input
              type="password"
              {...field}
              id="confirmPassword"
              onBlur={validatePassword}
              autoComplete="Confirm password"
            />
          )}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">Create Account</button>
    </form>
  );
};

export default CreateAccount;
