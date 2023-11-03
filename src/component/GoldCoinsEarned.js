import React from "react";
import "../css/style.css";
import coin from "../img/coin.png";

const GoldCoinsEarned = () => {
  return (
    <div>
      <div id="animatedText">
        <span>
          100
          <img style={{ height: "35px", width: "35px" }} src={coin} alt="" />
          earned!
        </span>
      </div>
    </div>
  );
};

export default GoldCoinsEarned;
