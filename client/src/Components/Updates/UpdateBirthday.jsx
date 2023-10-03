import classes from "./Updates.module.scss";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig.js";
import { setBirthday } from "../../../redux/slice.js";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

const UpdateBirthday = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { birthday: null } });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);
  const onSubmit = (data) => {
    console.log(data);
    const formattedBirthday = format(data.birthday, "MM/dd/yyyy");
    console.log(formattedBirthday);
    axios
      .patch("/user/birthday-token", {
        token: token,
        birthday: formattedBirthday,
      })
      .then(async (response) => {
        const user = JSON.parse(localStorage.getItem("user"));
        // console.log(response.data);
        dispatch(setBirthday({ birthday: response.data.birthday }));
        user.birthday = response.data.birthday;
        localStorage.setItem("user", JSON.stringify(user));
        // console.log("Name successfully updated");
        navigate("/app/recs");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className={classes.UpdateInner}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="birthday"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Birthday"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={onChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={errors?.birthday?.message}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
        <button type="submit" style={{ marginTop: "15px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBirthday;
