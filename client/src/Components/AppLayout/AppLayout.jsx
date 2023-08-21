import PropTypes from "prop-types";
import classes from "./AppLayout.module.scss";

const AppLayout = ({ children }) => {
  return (
    <div className={classes.AppLayout}>
      <div className={classes.LeftSidebar}>Left Sidebar</div>
      <div className={classes.MainContent}>{children}</div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.element,
};

export default AppLayout;
