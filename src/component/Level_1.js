import { OlabsPage } from "english-olabsnxtg-library";
import React from "react";
import QuizPopupContent from "./QuizPopupContent";
import Level1MidContent from "./Level1MidContent";
import useWebSocket, { ReadyState } from "react-use-websocket";
import logconfig from "../config/dbconfig";
import { SendLogData } from "../config/wslog.js";   

const Level_1 = () => {
  const { sendJsonMessage } = useWebSocket(logconfig.logurl, { share: true });
  return (
    <>
      <OlabsPage
        H_title="Prefix-Suffix"
        HQ_yes="YES"
        HQ_cancel="CANCEL"
        HQ_quittext="Are you sure you want to quit?"
        M_midheight="90%"
        RSM_theory_tt="Theory"
        RSM_vivavoce_tt="Viva voce"
        RSM_ok="OK"
        M_midcontent_comp={<Level1MidContent />}
        RSM_Intruc_popup_title_string="Instructions for quiz"
        RSM_QuizPopupContent_comp={<QuizPopupContent />}
        WS_sendJsonMessage={sendJsonMessage}
        WS_SendLogData={SendLogData}
        labNo="12"
        labShortName="Prefix-Suffix"
      />
    </>
  );
};

export default Level_1;
