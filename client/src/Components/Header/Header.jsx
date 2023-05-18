import React from "react";
import classes from "./Header.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ForumIcon from "@mui/icons-material/Forum";

const Header = () => {
  return (
    <div className={classes.Header}>
      <PersonIcon fontSize="large" backgroundColor="white" />
    </div>
  );
};

export default Header;
