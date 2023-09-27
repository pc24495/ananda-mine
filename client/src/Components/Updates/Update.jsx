import classes from "./Updates.module.scss";
import { Route, Routes } from "react-router-dom";
import UpdateName from "./UpdateName";
import UpdatePics from "./UpdatePics";

const Update = () => {
  return (
    <div className={classes.Update}>
      <Routes>
        <Route path="/name" element={<UpdateName />}></Route>
        <Route path="/pics" element={<UpdatePics />}></Route>
      </Routes>
    </div>
  );
};

export default Update;
