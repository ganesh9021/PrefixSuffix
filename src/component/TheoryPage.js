import React from "react";
import QuizPopupContent from "./QuizPopupContent";
import TheorymidContent from "./TheorymidContent";
import { OlabsPage } from "english-olabsnxtg-library";
import useWebSocket, { ReadyState } from "react-use-websocket";
import logconfig from "../config/dbconfig";
import { SendLogData } from "../config/wslog.js";

const TheoryPage = () => {
  const { sendJsonMessage } = useWebSocket(logconfig.logurl, { share: true });
  return (
    <OlabsPage
      H_title="Biosketch"
      HQ_yes="YES"
      HQ_cancel="CANCEL"
      HQ_quittext="Are you sure you want to quit?"
      M_midheight="90%"
      RSM_help_tt="Help"
      RSM_theory_tt="Theory"
      RSM_vivavoce_tt="Viva voce"
      RSM_ok="OK"
      M_midcontent_comp={<TheorymidContent />}
      RSM_Intruc_popup_title_string="Instructions for quiz"
      RSM_QuizPopupContent_comp={<QuizPopupContent />}
      WS_sendJsonMessage={sendJsonMessage}
      WS_SendLogData={SendLogData}
      labNo="12"
      labShortName="Prefix-Suffix"
    />
  );
};

export default TheoryPage;
