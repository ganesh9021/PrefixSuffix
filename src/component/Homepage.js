import React, { useEffect } from "react";
import ActStartPopupContent from "./ActStartPopupContent";
import { Launchpage } from "english-olabsnxtg-library";
import useWebSocket, { ReadyState } from "react-use-websocket";
import logconfig from "../config/dbconfig";
import { SendLogData } from "../config/wslog.js";
import Swal from "sweetalert2";

const Homepage = () => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const { sendJsonMessage } = useWebSocket(logconfig.logurl, { share: true });
  var arr = ["Students will be able to use the prefix and suffix with a word."];
  useEffect(() => {
    if (isMobile) {
      // alert("Please play a game in landscape mode for better user experience.");
      Swal.fire({
        text: "Please play a game in landscape mode for better user experience.",
      });
    }
  }, []);
  return (
    <div>
      <Launchpage
        L_title="Prefix-Suffix"
        L_objective="Objective:"
        L_act_objective="To use the prefix and suffix with a word"
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
