import React from "react";
import classes from "./Footer.module.scss";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";

export const Footer = () => {
  return (
    <div className={classes.Footer}>
      <div className={classes.IconContainer}>
        <ReplayIcon fontSize="large" sx={{ color: "#FFA500" }} />
      </div>
      <div className={classes.IconContainer}>
        <CloseIcon fontSize="large" sx={{ color: "#FFCCCB" }} />
      </div>
      <div className={classes.IconContainer}>
        <StarIcon fontSize="large" sx={{ color: "#35BAF6" }} />
      </div>
      <div className={classes.IconContainer}>
        <FavoriteIcon fontSize="large" sx={{ color: "#90EE90" }} />
      </div>
      <div className={classes.IconContainer}>
        <FlagIcon fontSize="large" sx={{ color: "#CC8899" }} />
      </div>
    </div>
  );
};
