// import React from 'react'
import classes from "./Login.module.scss";
import MainLoginBox from "./MainLoginBox/MainLoginBox.jsx";

const Login = () => {
  return (
    <div className={classes.Login}>
      <MainLoginBox></MainLoginBox>
    </div>
  );
};

export default Login;
