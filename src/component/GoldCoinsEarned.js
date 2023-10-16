import React from "react";
import "../css/style.css";
import coin from "../img/coin.png";

const GoldCoinsEarned = (props) => {
  return (
    <div>
      <div id="animatedText">
        <span>
          {props.coins}
          <img style={{ height: "35px", width: "35px" }} src={coin} alt="" />
          earned!
        </span>
      </div>
    </div>
  );
};

export default GoldCoinsEarned;
