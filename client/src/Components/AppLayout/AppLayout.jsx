import PropTypes from "prop-types";
import classes from "./AppLayout.module.scss";
import { AiFillHeart } from "react-icons/ai";
import { IoSparkles } from "react-icons/io5";
import { BsFillChatFill, BsFillPersonFill } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAppLoading, setAppNotLoading } from "../../../redux/slice";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  function isActive(basePath) {
    return location.pathname.startsWith(basePath);
  }

  const appLoading = useSelector((state) => state.user.appLoading);
  console.log(appLoading);

  useEffect(() => {
    dispatch(setAppLoading());
    setTimeout(() => {
      dispatch(setAppNotLoading());
    }, 2000);
  }, []);

  return (
    <div className={classes.AppLayout}>
      <div
        className={classes.LoadingScreen}
        style={{ display: appLoading ? "block" : "none" }}
      ></div>
      <div className={classes.MainLayout}>
        <div className={classes.LeftSidebar}>Left Sidebar</div>
        <div className={classes.MainContent}>{children}</div>
      </div>
      <div className={classes.MobileFooter}>
        <NavLink to="/app/recs">
          <AiFillHeart
            className={
              isActive("/app/recs")
                ? `${classes.Icon_1} ${classes.activeNavLink}`
                : classes.Icon_1
            }
          ></AiFillHeart>
        </NavLink>
        <NavLink to="/app/likes">
          <IoSparkles
            className={
              isActive("/app/likes")
                ? `${classes.Icon_1} ${classes.activeNavLink}`
                : classes.Icon_1
            }
          ></IoSparkles>
        </NavLink>
        <NavLink to="/app/chat">
          <BsFillChatFill
            className={
              isActive("/app/chat")
                ? `${classes.Icon_1} ${classes.activeNavLink}`
                : classes.Icon_1
            }
          ></BsFillChatFill>
        </NavLink>
        <NavLink to="/app/profile">
          <BsFillPersonFill
            className={
              isActive("/app/profile")
                ? `${classes.Icon_2} ${classes.activeNavLink}`
                : classes.Icon_2
            }
          ></BsFillPersonFill>
        </NavLink>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.element,
};

export default AppLayout;
