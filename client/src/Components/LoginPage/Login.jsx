// import React from 'react'
import classes from "./Login.module.scss";
// import MainLoginBox from "./MainLoginBox/MainLoginBox.jsx";

const Login = () => {
  return (
    <div className={classes.Login}>
      <div className={classes.LoginHeader}>
        <div className={classes.LoginHeaderLogo}>Anandamine</div>
        <button className={classes.LoginButton}>Log In</button>
      </div>
      <div className={classes.Body}>
        <div className={classes.InfoBox}>
          <h1 className={classes.FindYourHeartbeat}>Find Your Heartbeat</h1>
          <div className={classes.CreateAccountBox}>
            <button className={classes.CreateAccountButton}>
              <div className={classes.CreateAccountStyling}>
                <p>Create Account</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// <MainLoginBox></MainLoginBox>

export default Login;
