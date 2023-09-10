/* eslint-disable react/prop-types */
// import { useState } from "react";
import CreateAccount from "./CreateAccount";
import classes from "./LoginCreateWithPassword.module.scss";
import { BsArrowLeft } from "react-icons/bs";
const LoginCreateWithPassword = (props) => {
  //   const [loginNotCreate, setLoginNotCreate] = useState(false);
  return (
    // eslint-disable-next-line react/prop-types
    <div className={classes.LoginCreateWithPassword} style={props.style}>
      <CreateAccount></CreateAccount>
      <BsArrowLeft
        className={classes.BackArrow}
        onClick={props.backFunction}
      ></BsArrowLeft>
    </div>
  );
};

export default LoginCreateWithPassword;
