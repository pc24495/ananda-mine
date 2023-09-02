import { useState, useContext } from "react";
import classes from "./LeftSidebar.module.scss";
import { BiLogOut } from "react-icons/bi";
import { AuthContext } from "../../App.jsx";

const LeftSidebar = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [isMatchNotMessage, setIsMatchNotMessage] = useState(false);

  const messages = new Array(20).fill(null);

  const logout = () => {
    setIsAuthenticated(false);
  };

  const changeToMatches = (event) => {
    setIsMatchNotMessage(true);
    event.stopPropagation();
    event.preventDefault();
  };

  const changeToMessages = (event) => {
    setIsMatchNotMessage(false);
    event.stopPropagation();
    event.preventDefault();
  };

  console.log(isMatchNotMessage);

  return (
    <div className={classes.LeftSidebar}>
      <nav className={classes.ProfileNav}>
        <div className={classes.PicAndName}>
          <div className={classes.UserPicContainer}>
            <img
              className={classes.UserPic}
              src="/TomCruiseProfilePic.webp"
            ></img>
          </div>
          <h2 className={classes.UserName}>Tom</h2>
        </div>
        <div className={classes.SpaceDiv}></div>
        <div className={classes.LogoutIconContainer} onClick={logout}>
          <BiLogOut className={classes.LogoutIcon}></BiLogOut>
        </div>
      </nav>
      <div className={classes.MatchAndMessagesNav}>
        <div
          className={classes.MatchesHeaderContainer}
          onClick={changeToMatches}
        >
          <p className={classes.MatchesHeader}>Matches</p>
          <div
            className={classes.MatchesUnderline}
            style={{ backgroundColor: isMatchNotMessage ? "red" : "" }}
          ></div>
        </div>
        <div
          className={classes.MessagesHeaderContainer}
          onClick={changeToMessages}
        >
          <p className={classes.MessagesHeader}>Messages</p>
          <div
            className={classes.MessagesUnderline}
            style={{ backgroundColor: !isMatchNotMessage ? "red" : "" }}
          ></div>
        </div>
      </div>
      <div
        className={classes.Matches}
        style={{ display: isMatchNotMessage ? "flex" : "none" }}
      ></div>
      <div
        className={classes.Messages}
        style={{ display: isMatchNotMessage ? "none" : "flex" }}
      >
        <div className={classes.Message}>
          <div className={classes.MessagePicContainerOuter}>
            <div className={classes.MessagePicContainer}>
              <img
                className={classes.MessagePic}
                src="/TomCruiseProfilePic.webp"
              ></img>
            </div>
          </div>
          <div className={classes.MessageContent}>
            <h3 className={classes.Name}>Tom</h3>
            <p className={classes.LastMessage}>
              Sounds awesome! Looking forward to it
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
