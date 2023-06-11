import classes from "./CardsSection.module.scss";
// import Image from "next/image";
// import { useRouter } from "next/router";
import PropTypes from "prop-types";

const CardsSection = ({ userName }) => {
  // const router = useRouter();
  // const vitePublicPath = router.basePath || "";
  // const fullSrc = `${vitePublicPath}/FaceModel.png`;

  return (
    <div className={classes.CardsSection}>
      <img src="FaceModel.png" className={classes.Image}></img>
      <div className={classes.Overlay}>
        <div className={classes.Info}>
          <p className={classes.Name}>{userName}</p>
        </div>
      </div>
    </div>
  );
};

CardsSection.propTypes = {
  userName: PropTypes.string,
};

export default CardsSection;
