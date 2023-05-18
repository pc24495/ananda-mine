import React from "react";
import classes from "./Layout.module.scss";
import SwipeSection from "../SwipeSection/SwipeSection";

const Layout = () => {
  return (
    <div className={classes.Layout}>
      <SwipeSection />
    </div>
  );
};

export default Layout;
