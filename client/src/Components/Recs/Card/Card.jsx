import classes from "./Card.module.scss";
import {
  AiFillInfoCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { useState } from "react";

const Card = () => {
  const [pics] = useState(["1", "2", "3"]);
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
        <img
          src="https://picsum.photos/200/300"
          alt=""
          className={classes.Image}
        />
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
