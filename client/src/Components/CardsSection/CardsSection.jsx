import classes from "./CardsSection.module.scss";
// import Image from "next/image";
// import { useRouter } from "next/router";

const CardsSection = () => {
  // const router = useRouter();
  // const vitePublicPath = router.basePath || "";
  // const fullSrc = `${vitePublicPath}/FaceModel.png`;

  return (
    <div className={classes.CardsSection}>
      <img src="FaceModel.png" className={classes.Image}></img>
    </div>
  );
};

export default CardsSection;
