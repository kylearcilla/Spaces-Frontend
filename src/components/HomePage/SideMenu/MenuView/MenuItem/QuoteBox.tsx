import { FC, useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { Data } from "../../../../../elements";
import "../MenuView.css";

const QuoteBox: FC<{ isHidden: boolean }> = ({ isHidden }) => {
  const {randomQuoteIndex} = useContext(GlobalContext)

  return (
    <div className={`quote-box-container ${isHidden}`}>
      <div className="quote-box-heading">
        <span className="title">Daily Quote</span>
      </div>
      <p>{`"${Data.quotes[randomQuoteIndex ?? 0]}"`}</p>
    </div>
  );
};

export default QuoteBox;
