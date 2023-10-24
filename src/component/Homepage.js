import React from "react";
import ActStartPopupContent from "./ActStartPopupContent";
import { Launchpage } from "english-olabsnxtg-library";
import useWebSocket, { ReadyState } from "react-use-websocket";
import logconfig from "../config/dbconfig";
import { SendLogData } from "../config/wslog.js";

const Homepage = () => {
  const { sendJsonMessage } = useWebSocket(logconfig.logurl, { share: true });
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
        WS_sendJsonMessage={sendJsonMessage}
        WS_SendLogData={SendLogData}
        labNo="12"
        labShortName="Prefix-Suffix"
      />
    </div>
  );
};

export default Homepage;
