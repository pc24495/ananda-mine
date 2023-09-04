// import PropTypes from 'prop-types'
import classes from "./Chat.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

const Chat = () => {
  // const navigate = useNavigate();
  return (
    <div className={classes.Chat}>
      <div className={classes.ChatBox}>
        <div className={classes.ChatHeader}>
          <div className={classes.ProfilePicContainer}>
            <img
              src="/TomCruiseProfilePic.webp"
              alt="Profile Pic"
              className={classes.ProfilePic}
            />
          </div>
          <p className={classes.MatchInfo}>
            You matched with Tom on 4:18PM 8/31/23
          </p>
          <AiOutlineCloseCircle
            className={classes.CloseButton}
          ></AiOutlineCloseCircle>
        </div>
        <div className={classes.ChatMain}>
          <div className={classes.UserMessageContainer}>
            <div className={classes.UserMessage}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            </div>
          </div>
          <div className={classes.UserMessageContainer}>
            <div className={classes.UserMessage}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            </div>
          </div>
          <div className={classes.MatchMessageContainer}>
            <div className={classes.MatchMessage}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            </div>
          </div>
        </div>
        <form className={classes.ChatForm}>
          <textarea
            className={classes.ChatInput}
            placeholder="Type a message"
          ></textarea>
          <button className={classes.SubmitButton}>Send</button>
        </form>
      </div>
      <div className={classes.Profile}></div>
    </div>
  );
};

// <div className={classes.ChatBody}></div>
//         <form className={classes.ChatForm}></form>

// Chat.propTypes = {}

export default Chat;
