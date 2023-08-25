// import PropTypes from 'prop-types'
import classes from "./Recs.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useEffect } from "react";
import { setAppLoading, setAppNotLoading } from "../../../redux/slice";

const Recs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setAndUnsetAppLoading = (event) => {
    event.preventDefault();
    dispatch(setAppLoading());
    setTimeout(() => {
      dispatch(setAppNotLoading());
    }, 900);
  };
  return (
    <div className={classes.Recs}>
      Recs
      <button
        onClick={(event) => {
          event.preventDefault();
          navigate("/app/chat");
        }}
      >
        Go to /app/chat
      </button>
      <button onClick={setAndUnsetAppLoading}>Test app loading</button>
    </div>
  );
};

// Recs.propTypes = {}

export default Recs;
