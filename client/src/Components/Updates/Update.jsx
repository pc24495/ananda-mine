import classes from "./Updates.module.scss";
import { Route, Routes } from "react-router-dom";
import UpdateName from "./UpdateName";

const Update = () => {
  return (
    <div className={classes.Update}>
      <Routes>
        <Route path="/name" element={<UpdateName />}></Route>
      </Routes>
    </div>
  );
};

export default Update;
