// import PropTypes from 'prop-types'
import classes from "./Chat.module.scss";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.Chat}>
      <div className={classes.ChatBox}></div>
      <div className={classes.Profile}></div>
    </div>
  );
};

// Chat.propTypes = {}

export default Chat;
