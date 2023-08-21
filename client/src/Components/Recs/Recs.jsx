// import PropTypes from 'prop-types'
import classes from "./Recs.module.scss";
import { useNavigate } from "react-router-dom";

const Recs = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.Recs}>
      Recs
      <button
        onClick={(event) => {
          event.preventDefault();
          navigate("/app/chat");
        }}
      ></button>
    </div>
  );
};

// Recs.propTypes = {}

export default Recs;
