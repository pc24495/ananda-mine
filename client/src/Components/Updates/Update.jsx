import classes from "./Updates.module.scss";
import { Route, Routes } from "react-router-dom";
import UpdateName from "./UpdateName";
import UpdatePics from "./UpdatePics";
import UpdateBirthday from "./UpdateBirthday";

const Update = () => {
  return (
    <div className={classes.Update}>
      <Routes>
        <Route path="/name" element={<UpdateName />}></Route>
        <Route path="/pics" element={<UpdatePics />}></Route>
        <Route path="/birthday" element={<UpdateBirthday />}></Route>
      </Routes>
    </div>
  );
};

export default Update;
