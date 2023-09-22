import React from "react";
import ActStartPopupContent from "./ActStartPopupContent";
import { Launchpage } from "english-olabsnxtg-library";

const Homepage = () => {
  var arr = [
    "Students will be able to analyse the word meaning after applying the Prefixes and suffixes.",
  ];
  return (
    <div>
      <Launchpage
        L_title="Prefix-Suffix"
        L_objective="Objective:"
        L_act_objective="To understand the Prefixes and Suffixes."
        L_learning_outcome="Learning Outcome:"
        L_array={arr}
        L_startbutton="START"
        WAWGTL_title_string="What are we going to learn?"
        WAWGTL_comp={<ActStartPopupContent />}
        ok="OK"
        cancel="CANCEL"
      />
    </div>
  );
};

export default Homepage;
