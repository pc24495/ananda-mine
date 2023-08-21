// import PropTypes from 'prop-types'
import classes from "./Chat.module.scss";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.Chat}>
      Chat
      <button
        onClick={(event) => {
          event.preventDefault();
          navigate("/app/recs");
        }}
      ></button>
    </div>
  );
};

// Chat.propTypes = {}

export default Chat;
