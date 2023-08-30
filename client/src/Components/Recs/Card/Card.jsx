import classes from "./Card.module.scss";
import { AiFillInfoCircle } from "react-icons/ai";

const Card = () => {
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
        <div className={classes.SlideTicks}></div>
        <div className={classes.ArrowBox}></div>
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
