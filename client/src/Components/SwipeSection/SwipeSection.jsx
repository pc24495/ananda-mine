import classes from "./SwipeSection.module.scss";
import Header from "../Header/Header";
import CardsSection from "../CardsSection/CardsSection";
import { Footer } from "../Footer/Footer";

const SwipeSection = () => {
  return (
    <div className={classes.SwipeSection}>
      <Header />
      <CardsSection />
      <Footer />
    </div>
  );
};

export default SwipeSection;
