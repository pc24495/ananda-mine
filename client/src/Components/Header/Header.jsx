import classes from "./Header.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ForumIcon from "@mui/icons-material/Forum";

const Header = () => {
  return (
    <div className={classes.Header}>
      Bla14
      <PersonIcon fontSize="large" sx={{ color: "#FF00FF" }} />
      <LocalFireDepartmentIcon fontSize="large" sx={{ color: "#424242" }} />
      <ForumIcon fontSize="medium" sx={{ color: "#424242" }} />
    </div>
  );
};

export default Header;
