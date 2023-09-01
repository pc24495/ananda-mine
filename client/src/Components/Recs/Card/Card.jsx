import classes from "./Card.module.scss";
import {
  AiFillInfoCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";

const Card = () => {
  const [pics] = useState([
    "https://picsum.photos/200/300",
    "/pexels-rizky-sabriansyah-18165273.jpg",
    "/DoctorOnPhone.jpeg",
  ]);
  const [currentPicIndex, setCurrentPicIndex] = useState(0);

  const decrementPicIndex = () => {
    if (currentPicIndex > 0) {
      setCurrentPicIndex(currentPicIndex - 1);
    }
  };

  const incrementPicIndex = () => {
    if (currentPicIndex < pics.length - 1) {
      setCurrentPicIndex(currentPicIndex + 1);
    }
  };

  return (
    <div className={classes.Card}>
      <div className={classes.CardMain}>
        {pics.map((pic, index) => {
          return (
            <img
              key={"pic_" + index}
              src={pic}
              alt=""
              className={
                index == currentPicIndex
                  ? `${classes.Image} ${classes.ImageActive}`
                  : classes.Image
              }
            />
          );
        })}
      </div>
      <div className={classes.CardOverlay}>
        <div className={classes.SlideTicks}>
          {pics.map((pic, index) => {
            return (
              <div
                key={"tick_" + index}
                className={classes.Tick}
                style={{
                  backgroundColor: index == currentPicIndex ? "white" : "gray",
                }}
              ></div>
            );
          })}
        </div>
        <div className={classes.ArrowBox}>
          <div className={classes.LeftArrowBox} onClick={decrementPicIndex}>
            <AiOutlineArrowLeft className={classes.Arrow}></AiOutlineArrowLeft>
          </div>
          <div className={classes.RightArrowBox} onClick={incrementPicIndex}>
            <AiOutlineArrowRight
              className={classes.Arrow}
            ></AiOutlineArrowRight>
          </div>
        </div>
        <div className={classes.InfoBox}>
          <div className={classes.MainInfoBox}>
            <div className={classes.NameAndAge}>
              <div className={classes.Name}>John Doe</div>
              <div className={classes.Age}>23</div>
            </div>
            {currentPicIndex > 1 && (
              <p className={classes.Bio}>
                Looking for friends or people to go to concerts with!
              </p>
            )}
          </div>
          <div className={classes.InfoButtonContainer}>
            <AiFillInfoCircle className={classes.InfoButton}></AiFillInfoCircle>
          </div>
        </div>
        <div className={classes.OverlayBlur}></div>
      </div>
    </div>
  );
};

export default Card;
