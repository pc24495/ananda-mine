import { useState, useContext } from "react";
import classes from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App.jsx";

// import MainLoginBox from "./MainLoginBox/MainLoginBox.jsx";

const Login = () => {
  const [loginCreateBoxOpen, setLoginCreateBoxOpen] = useState({
    loginBox: false,
    createBox: false,
  });

  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const closeLoginCreateBox = () => {
    setLoginCreateBoxOpen({ loginBox: false, createBox: false });
  };

  const openLoginBox = (event) => {
    event.preventDefault();
    setLoginCreateBoxOpen({ loginBox: true, createBox: false });
  };

  const openCreateBox = (event) => {
    event.preventDefault();
    setLoginCreateBoxOpen({ loginBox: false, createBox: true });
  };

  const moveToRecs = (event) => {
    event.preventDefault();
    setIsAuthenticated(true);
    navigate("/app/recs");
  };

  return (
    <div className={classes.Login}>
      <div
        className={classes.LoginBoxOverlay}
        style={{
          display:
            loginCreateBoxOpen.loginBox || loginCreateBoxOpen.createBox
              ? "flex"
              : "none",
        }}
      >
        <div className={classes.LoginBox}>
          <p className={classes.CloseButton} onClick={closeLoginCreateBox}>
            X
          </p>
          <img src="/pinkheart.svg" alt="Logo" />
          <h3 className={classes.CreateAccountHeader}>Create Account</h3>
          <p className={classes.Terms}>
            By clicking login, you agree to our <span>terms.</span>
          </p>
          <button className={classes.LoginButtonInBox} onClick={moveToRecs}>
            Log in with Google (unavailable)
          </button>
          <button
            className={classes.LoginButtonInBox}
            onClick={moveToRecs}
            style={{
              backgroundColor: "silver",
              border: "0.125rem solid black",
              color: "black",
            }}
          >
            Log in with Facebook (unavailable)
          </button>
          <button
            className={classes.LoginButtonInBox}
            onClick={moveToRecs}
            style={{
              backgroundColor: "silver",
              border: "0.125rem solid black",
              color: "black",
            }}
          >
            Log in with Phone Number (unavailable)
          </button>
          <p className={classes.LoginInfo}>
            Click here to learn more about this project. Or watch a video
            explaining it.
          </p>
        </div>
      </div>
      <div className={classes.LoginHeader}>
        <div className={classes.LoginHeaderLogo}>Anandamine</div>
        <button className={classes.LoginButton} onClick={openLoginBox}>
          Log In
        </button>
      </div>
      <div className={classes.Body}>
        <div className={classes.InfoBox}>
          <h1 className={classes.FindYourHeartbeat}>Find Your Heartbeat</h1>
          <div className={classes.CreateAccountBox}>
            <button
              className={classes.CreateAccountButton}
              onClick={openCreateBox}
            >
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
