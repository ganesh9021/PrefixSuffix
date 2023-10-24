import React from "react";
import Quizcomp from "./Quizcomp";
import { Quiz } from "english-olabsnxtg-library";
import useWebSocket, { ReadyState } from "react-use-websocket";
import logconfig from "../config/dbconfig";
import { SendLogData } from "../config/wslog.js";

const MathsQuiz = () => {
  const { sendJsonMessage } = useWebSocket(logconfig.logurl, { share: true });
  return (
    <div>
      <Quiz
        H_title="Prefix-Suffix"
        H_sidebarvisible="hidden"
        HQ_quittext="Are you sure you want to quit?"
        HQ_yes="yes"
        HQ_cancel="cancel"
        quiz_component={<Quizcomp />}
        WS_sendJsonMessage={sendJsonMessage}
        WS_SendLogData={SendLogData}
        labNo="12"
        labShortName="Prefix-Suffix"
      />
    </div>
  );
};

export default MathsQuiz;
