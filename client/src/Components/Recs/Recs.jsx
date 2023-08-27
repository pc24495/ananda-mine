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
      <div className={classes.CardsSection}>
        <div className={classes.Card}>
          <div className={classes.CardMain}>
            <img
              src="https://picsum.photos/200/300"
              alt=""
              className={classes.Image}
            />
          </div>
          <div className={classes.CardOverlay}>
            <div className={classes.SlideTicks}></div>
            <div className={classes.ArrowBox}></div>
            <div className={classes.InfoBox}></div>
            <div className={classes.OverlayBlur}></div>
          </div>
        </div>
        <div className={classes.CardFooter}></div>
      </div>
    </div>
  );
};

// Recs.propTypes = {}

export default Recs;
