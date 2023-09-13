import classes from "./Updates.module.scss";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig.js";
import { setName } from "../../../redux/slice.js";

const UpdateName = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { name: "" } });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);
  const user_name = useSelector((state) => state.user.name);
  console.log(user_name);
  const onSubmit = (data) => {
    // console.log(token);
    // console.log(data);
    axios
      .patch("/user/name-token", { token: token, name: data.name })
      .then(async (response) => {
        dispatch(setName({ name: response.data.name }));
        localStorage.setItem("name", response.data.name);
        // console.log("Name successfully upda/
        navigate("/app/recs");
      })
      .catch((error) => {
        console.log("Errorr");
        console.log(error.response.data);
        if (error.response.data?.fieldErrors?.token) {
          setError("name", {
            type: "manual",
            message: error.response.data.fieldErrors.token,
          });
        }
      });
  };

  return (
    <div className={classes.UpdateInner}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="changeName">Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input {...field} id="changeName" autoComplete="Enter a name" />
          )}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateName;
