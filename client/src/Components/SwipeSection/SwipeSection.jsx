import classes from "./SwipeSection.module.scss";
import Header from "../Header/Header";
import CardsSection from "../CardsSection/CardsSection";
import { Footer } from "../Footer/Footer";
import PropTypes from "prop-types";

const SwipeSection = ({ userName }) => {
  return (
    <div className={classes.SwipeSection}>
      <Header />
      <CardsSection userName={userName} />
      <Footer />
    </div>
  );
};

SwipeSection.propTypes = {
  userName: PropTypes.string,
};

export default SwipeSection;
