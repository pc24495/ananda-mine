import { useContext } from "react";
import classes from "./LeftSidebar.module.scss";
import { BiLogOut } from "react-icons/bi";
import { AuthContext } from "../../App.jsx";

const LeftSidebar = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    setIsAuthenticated(false);
  };

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
    </div>
  );
};

export default LeftSidebar;
